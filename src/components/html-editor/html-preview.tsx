"use client"

import * as React from "react"
import katex from "katex"
import "katex/contrib/mhchem"
import { cn } from "@/lib/utils"

const KATEX_CDN = `https://cdn.jsdelivr.net/npm/katex@${katex.version}/dist/`

type MathOutput = "htmlAndMathml" | "mathml"

/*
 * Hybrid math styling. The sandboxed iframe can't run scripts to detect whether
 * a stylesheet loaded, so the parent fetches KaTeX's CSS instead:
 *  - online  → the CSS is inlined into the iframe (font URLs made absolute) and
 *              math renders with full KaTeX typography;
 *  - offline → math renders as native MathML, which browsers draw without any
 *              CSS or fonts. The fetch is retried when the browser comes back online.
 */
let katexCssCache: string | null = null
let katexCssRequest: Promise<string | null> | null = null

function loadKatexCss(): Promise<string | null> {
  if (katexCssCache) return Promise.resolve(katexCssCache)
  if (!katexCssRequest) {
    katexCssRequest = fetch(`${KATEX_CDN}katex.min.css`)
      .then((res) => (res.ok ? res.text() : null))
      .then((css) => {
        if (!css) return null
        katexCssCache = css.replace(/url\((["']?)(fonts\/[^)"']+)\1\)/g, `url($1${KATEX_CDN}$2$1)`)
        return katexCssCache
      })
      .catch(() => null)
      .finally(() => {
        katexCssRequest = null
      })
  }
  return katexCssRequest
}

function useKatexCss(enabled: boolean): string | null {
  const [css, setCss] = React.useState<string | null>(katexCssCache)

  React.useEffect(() => {
    if (!enabled || css) return
    let active = true
    const load = () => {
      loadKatexCss().then((result) => {
        if (active && result) setCss(result)
      })
    }
    load()
    window.addEventListener("online", load)
    return () => {
      active = false
      window.removeEventListener("online", load)
    }
  }, [enabled, css])

  return css
}

// Blocks whose contents must never be treated as math.
const SKIP_BLOCKS = /(<(pre|code|script|style|textarea)\b[\s\S]*?<\/\2>)/gi

// $$…$$  |  \[…\]  |  \(…\)  |  $…$ (inline: no surrounding spaces, not "$5 and $10")
const MATH = /\$\$([\s\S]+?)\$\$|\\\[([\s\S]+?)\\\]|\\\(([\s\S]+?)\\\)|(?<![\\$])\$(?![\s$])([^$\n]+?)(?<!\s)\$(?!\d)/g

const ENTITIES: Record<string, string> = { "&lt;": "<", "&gt;": ">", "&amp;": "&", "&quot;": '"', "&#39;": "'", "&nbsp;": " " }

function decodeTex(tex: string): string {
  return tex
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/&(lt|gt|amp|quot|#39|nbsp);/g, (m) => ENTITIES[m] ?? m)
    .trim()
}

function renderTex(tex: string, displayMode: boolean, output: MathOutput): string {
  return katex.renderToString(decodeTex(tex), { displayMode, throwOnError: false, output })
}

/**
 * Replaces LaTeX delimiters ($$…$$, \[…\], \(…\), $…$) with KaTeX markup.
 * Content inside <pre>, <code>, <script>, <style> and <textarea> is left alone.
 * `output: "mathml"` needs no stylesheet; "htmlAndMathml" needs KaTeX's CSS.
 */
export function renderMathInHtml(html: string, output: MathOutput = "htmlAndMathml"): string {
  return html
    .split(SKIP_BLOCKS)
    .map((part, i) => {
      // split() with 2 capture groups yields [text, block, tagName, text, ...]
      if (i % 3 !== 0) return i % 3 === 1 ? part : ""
      return part.replace(MATH, (_m, display, bracket, paren, inline) => {
        if (display !== undefined) return renderTex(display, true, output)
        if (bracket !== undefined) return renderTex(bracket, true, output)
        if (paren !== undefined) return renderTex(paren, false, output)
        return renderTex(inline, false, output)
      })
    })
    .join("")
}

const BASE_STYLES = `
  :root { color-scheme: light; }
  * { box-sizing: border-box; }
  body { margin: 0; padding: 16px; font-family: ui-sans-serif, system-ui, -apple-system, sans-serif; color: #0a0a0a; line-height: 1.6; }
  img, video { max-width: 100%; height: auto; }
  a { color: #2563eb; }
  table { border-collapse: collapse; width: 100%; }
  td, th { border: 1px solid #e5e5e5; padding: 6px 10px; text-align: left; }
  pre { background: #f5f5f5; padding: 12px; border-radius: 8px; overflow-x: auto; }
  code { background: #f5f5f5; padding: 2px 5px; border-radius: 4px; font-size: 0.9em; font-family: ui-monospace, monospace; }
  pre code { background: none; padding: 0; }
  blockquote { margin: 0; padding-left: 12px; border-left: 3px solid #d4d4d4; color: #525252; }
  hr { border: none; border-top: 1px solid #e5e5e5; }
  .katex-display { overflow-x: auto; overflow-y: hidden; padding: 4px 0; }
  math { font-family: "STIX Two Math", "Cambria Math", "Latin Modern Math", math, serif; font-size: 1.1em; }
  .katex-display math { display: block; text-align: center; }
`

function buildDocument(body: string, extraCss = ""): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${extraCss}${BASE_STYLES}</style>
  </head>
  <body>${body}</body>
</html>`
}

export interface HtmlPreviewProps {
  /** Raw HTML markup to render. */
  html: string
  /** Render LaTeX math ($$…$$, \[…\], \(…\), $…$) with KaTeX. Default: true. */
  math?: boolean
  /** Minimum height (px) of the preview frame. */
  minHeight?: number
  /** Extra class names for the iframe. */
  className?: string
}

/**
 * HtmlPreview — renders arbitrary HTML inside a sandboxed `<iframe>` with a
 * minimal base stylesheet. The empty `sandbox` attribute disables script
 * execution, form submission, and top-level navigation, so pasted or typed
 * markup can never run code or reach the host page. LaTeX math is rendered to
 * static KaTeX markup before it reaches the iframe, so no scripts are needed:
 * with full KaTeX styling when its CSS can be fetched, native MathML otherwise.
 */
export function HtmlPreview({ html, math = true, minHeight = 240, className }: HtmlPreviewProps) {
  const katexCss = useKatexCss(math)
  const doc = React.useMemo(() => {
    if (!math) return buildDocument(html)
    return katexCss
      ? buildDocument(renderMathInHtml(html, "htmlAndMathml"), katexCss)
      : buildDocument(renderMathInHtml(html, "mathml"))
  }, [html, math, katexCss])
  return (
    <iframe
      title="HTML preview"
      srcDoc={doc}
      sandbox=""
      style={{ minHeight }}
      className={cn("h-full w-full border-0 bg-white", className)}
    />
  )
}

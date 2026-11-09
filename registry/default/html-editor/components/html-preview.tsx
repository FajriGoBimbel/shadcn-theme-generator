"use client"

import { cn } from "@/lib/utils"

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
`

function buildDocument(body: string): string {
  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>${BASE_STYLES}</style>
  </head>
  <body>${body}</body>
</html>`
}

export interface HtmlPreviewProps {
  /** Raw HTML markup to render. */
  html: string
  /** Minimum height (px) of the preview frame. */
  minHeight?: number
  /** Extra class names for the iframe. */
  className?: string
}

/**
 * HtmlPreview — renders arbitrary HTML inside a sandboxed `<iframe>` with a
 * minimal base stylesheet. The empty `sandbox` attribute disables script
 * execution, form submission, and top-level navigation, so pasted or typed
 * markup can never run code or reach the host page.
 */
export function HtmlPreview({ html, minHeight = 240, className }: HtmlPreviewProps) {
  return (
    <iframe
      title="HTML preview"
      srcDoc={buildDocument(html)}
      sandbox=""
      style={{ minHeight }}
      className={cn("h-full w-full border-0 bg-white", className)}
    />
  )
}

"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

// ─── AST types ──────────────────────────────────────────────────────────────

type InlineNode =
  | { type: "text"; value: string }
  | { type: "strong"; children: InlineNode[] }
  | { type: "em"; children: InlineNode[] }
  | { type: "del"; children: InlineNode[] }
  | { type: "code"; value: string }
  | { type: "link"; href: string; title?: string; children: InlineNode[] }
  | { type: "image"; src: string; alt: string; title?: string }
  | { type: "break" }

type ListItem = { blocks: BlockNode[]; checked: boolean | null }

type Align = "left" | "center" | "right" | null

type BlockNode =
  | { type: "heading"; level: number; children: InlineNode[] }
  | { type: "paragraph"; children: InlineNode[] }
  | { type: "blockquote"; children: BlockNode[] }
  | { type: "code"; value: string; lang?: string }
  | { type: "list"; ordered: boolean; start?: number; items: ListItem[] }
  | { type: "hr" }
  | { type: "table"; header: InlineNode[][]; align: Align[]; rows: InlineNode[][][] }

// ─── Block-level parsing ────────────────────────────────────────────────────

function isNewBlockStart(line: string): boolean {
  return (
    /^\s{0,3}#{1,6}\s/.test(line) ||
    /^\s{0,3}(`{3,}|~{3,})/.test(line) ||
    /^\s{0,3}>/.test(line) ||
    /^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})\s*$/.test(line) ||
    /^\s*([-*+]|\d+[.)])\s+/.test(line)
  )
}

function isTableSeparator(line: string): boolean {
  return /^\s*\|?\s*:?-{1,}:?\s*(\|\s*:?-{1,}:?\s*)*\|?\s*$/.test(line) && line.includes("-")
}

function splitTableRow(line: string): string[] {
  let t = line.trim()
  if (t.startsWith("|")) t = t.slice(1)
  if (t.endsWith("|") && !t.endsWith("\\|")) t = t.slice(0, -1)
  const cells: string[] = []
  let current = ""
  for (let idx = 0; idx < t.length; idx++) {
    const ch = t[idx]
    if (ch === "\\" && t[idx + 1] === "|") {
      current += "|"
      idx++
      continue
    }
    if (ch === "|") {
      cells.push(current.trim())
      current = ""
      continue
    }
    current += ch
  }
  cells.push(current.trim())
  return cells
}

function parseLines(lines: string[]): BlockNode[] {
  const blocks: BlockNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i] ?? ""

    if (line.trim() === "") {
      i++
      continue
    }

    // Fenced code block.
    const fenceMatch = line.match(/^\s{0,3}(`{3,}|~{3,})\s*([^\s`]*)/)
    if (fenceMatch) {
      const fence = fenceMatch[1] ?? "```"
      const lang = fenceMatch[2] || undefined
      const fenceChar = fence[0] ?? "`"
      const fenceLen = fence.length
      const closeRe = new RegExp(`^\\s{0,3}\\${fenceChar}{${fenceLen},}\\s*$`)
      let j = i + 1
      const codeLines: string[] = []
      while (j < lines.length) {
        const current = lines[j] ?? ""
        if (closeRe.test(current)) {
          j++
          break
        }
        codeLines.push(current)
        j++
      }
      blocks.push({ type: "code", value: codeLines.join("\n"), lang })
      i = j
      continue
    }

    // ATX heading.
    const headingMatch = line.match(/^\s{0,3}(#{1,6})\s+(.*?)\s*#*\s*$/)
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: (headingMatch[1] ?? "#").length,
        children: parseInline(headingMatch[2] ?? ""),
      })
      i++
      continue
    }

    // Horizontal rule.
    if (/^\s{0,3}((-\s*){3,}|(\*\s*){3,}|(_\s*){3,})$/.test(line)) {
      blocks.push({ type: "hr" })
      i++
      continue
    }

    // Blockquote.
    if (/^\s{0,3}>/.test(line)) {
      const quoteLines: string[] = []
      let j = i
      while (j < lines.length) {
        const current = lines[j] ?? ""
        if (/^\s{0,3}>/.test(current)) {
          quoteLines.push(current.replace(/^\s{0,3}>\s?/, ""))
          j++
        } else if (current.trim() !== "" && !isNewBlockStart(current)) {
          quoteLines.push(current)
          j++
        } else {
          break
        }
      }
      blocks.push({ type: "blockquote", children: parseLines(quoteLines) })
      i = j
      continue
    }

    // GFM table.
    const nextLine = lines[i + 1]
    if (line.includes("|") && nextLine !== undefined && isTableSeparator(nextLine)) {
      const headerCells = splitTableRow(line)
      const align: Align[] = splitTableRow(nextLine).map((c) => {
        const t = c.trim()
        if (/^:-+:$/.test(t)) return "center"
        if (/^-+:$/.test(t)) return "right"
        if (/^:-+$/.test(t)) return "left"
        return null
      })
      let j = i + 2
      const rows: string[][] = []
      while (j < lines.length) {
        const current = lines[j]
        if (current === undefined || current.trim() === "" || !current.includes("|")) break
        rows.push(splitTableRow(current))
        j++
      }
      blocks.push({
        type: "table",
        header: headerCells.map((c) => parseInline(c)),
        align,
        rows: rows.map((r) => r.map((c) => parseInline(c))),
      })
      i = j
      continue
    }

    // List (ordered / unordered / task).
    const listMatch = line.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/)
    if (listMatch) {
      const baseIndent = (listMatch[1] ?? "").length
      const ordered = /\d/.test(listMatch[2] ?? "")
      const startNum = ordered ? parseInt(listMatch[2] ?? "1", 10) : undefined
      const items: ListItem[] = []
      let j = i

      while (j < lines.length) {
        const current = lines[j] ?? ""
        const m = current.match(/^(\s*)([-*+]|\d+[.)])\s+(.*)$/)
        const indentLen = m ? (m[1] ?? "").length : -1
        if (!m || indentLen !== baseIndent || /\d/.test(m[2] ?? "") !== ordered) break

        const markerText = m[0] ?? ""
        const firstContent = m[3] ?? ""
        const contentIndent = markerText.length - firstContent.length
        const itemLines: string[] = [firstContent]
        let k = j + 1

        while (k < lines.length) {
          const lk = lines[k] ?? ""
          if (lk.trim() === "") {
            itemLines.push("")
            k++
            continue
          }
          const indentMatch = lk.match(/^(\s*)/)
          const indent = (indentMatch?.[1] ?? "").length
          const isSibling = /^(\s*)([-*+]|\d+[.)])\s+/.test(lk) && indent === baseIndent
          if (isSibling) break
          if (indent >= contentIndent) {
            itemLines.push(lk.slice(contentIndent))
            k++
          } else {
            break
          }
        }

        while (itemLines.length > 0 && itemLines[itemLines.length - 1] === "") itemLines.pop()

        let checked: boolean | null = null
        const firstLine = itemLines[0] ?? ""
        const taskMatch = firstLine.match(/^\[( |x|X)\]\s+(.*)$/)
        if (taskMatch) {
          checked = (taskMatch[1] ?? "").toLowerCase() === "x"
          itemLines[0] = taskMatch[2] ?? ""
        }

        items.push({ blocks: parseLines(itemLines), checked })
        j = k
      }

      blocks.push({ type: "list", ordered, start: startNum, items })
      i = j
      continue
    }

    // Paragraph — gather consecutive lines until a blank line or new block.
    const paraLines: string[] = [line]
    let j = i + 1
    while (j < lines.length) {
      const current = lines[j]
      if (current === undefined || current.trim() === "" || isNewBlockStart(current)) break
      const after = lines[j + 1]
      if (current.includes("|") && after !== undefined && isTableSeparator(after)) break
      paraLines.push(current)
      j++
    }
    blocks.push({ type: "paragraph", children: parseInline(paraLines.join("\n")) })
    i = j
  }

  return blocks
}

function parseBlocks(markdown: string): BlockNode[] {
  return parseLines(markdown.replace(/\r\n?/g, "\n").split("\n"))
}

// ─── Inline parsing ─────────────────────────────────────────────────────────

function matchLinkLike(
  text: string,
  bracketStart: number
): { label: string; href: string; title?: string; end: number } | null {
  if (text[bracketStart] !== "[") return null
  let i = bracketStart + 1
  let depth = 0
  const labelStart = i
  while (i < text.length) {
    const c = text[i]
    if (c === "\\") {
      i += 2
      continue
    }
    if (c === "[") depth++
    else if (c === "]") {
      if (depth === 0) break
      depth--
    }
    i++
  }
  if (text[i] !== "]") return null
  const label = text.slice(labelStart, i)
  i++
  if (text[i] !== "(") return null
  i++
  const parenStart = i
  let parenDepth = 0
  while (i < text.length) {
    const c = text[i]
    if (c === "\\") {
      i += 2
      continue
    }
    if (c === "(") parenDepth++
    else if (c === ")") {
      if (parenDepth === 0) break
      parenDepth--
    }
    i++
  }
  if (text[i] !== ")") return null
  const inside = text.slice(parenStart, i)
  i++
  const titleMatch = inside.match(/^(\S+)\s+"([^"]*)"\s*$/) ?? inside.match(/^(\S+)\s+'([^']*)'\s*$/)
  const href = titleMatch ? (titleMatch[1] ?? "") : inside.trim()
  const title = titleMatch ? titleMatch[2] : undefined
  return { label, href, title, end: i }
}

function matchDelimited(text: string, i: number, marker: string): { content: string; end: number } | null {
  if (!text.startsWith(marker, i)) return null
  const contentStart = i + marker.length
  let searchFrom = contentStart
  while (true) {
    const idx = text.indexOf(marker, searchFrom)
    if (idx === -1) return null
    if (idx === contentStart) {
      searchFrom = idx + marker.length
      continue
    }
    return { content: text.slice(contentStart, idx), end: idx + marker.length }
  }
}

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = []
  let buffer = ""
  let i = 0

  const flush = () => {
    if (buffer) {
      nodes.push({ type: "text", value: buffer })
      buffer = ""
    }
  }

  while (i < text.length) {
    const ch = text[i] ?? ""

    // Hard break: two-or-more trailing spaces, or a backslash, before a newline.
    if (ch === " " && text[i + 1] === " " && text.slice(i).match(/^ {2,}\n/)) {
      flush()
      nodes.push({ type: "break" })
      const spaces = text.slice(i).match(/^ +/)?.[0]?.length ?? 2
      i += spaces + 1
      continue
    }
    if (ch === "\\" && text[i + 1] === "\n") {
      flush()
      nodes.push({ type: "break" })
      i += 2
      continue
    }
    if (ch === "\n") {
      flush()
      nodes.push({ type: "break" })
      i++
      continue
    }

    // Escaped character.
    if (ch === "\\" && /[\\`*_{}[\]()#+.!~>-]/.test(text[i + 1] ?? "")) {
      buffer += text[i + 1]
      i += 2
      continue
    }

    // Inline code span.
    if (ch === "`") {
      let fenceLen = 0
      while (text[i + fenceLen] === "`") fenceLen++
      const fence = "`".repeat(fenceLen)
      const closeIdx = text.indexOf(fence, i + fenceLen)
      if (closeIdx !== -1) {
        flush()
        nodes.push({ type: "code", value: text.slice(i + fenceLen, closeIdx).trim() })
        i = closeIdx + fenceLen
        continue
      }
    }

    // Image.
    if (ch === "!" && text[i + 1] === "[") {
      const m = matchLinkLike(text, i + 1)
      if (m) {
        flush()
        nodes.push({ type: "image", alt: m.label, src: m.href, title: m.title })
        i = m.end
        continue
      }
    }

    // Link.
    if (ch === "[") {
      const m = matchLinkLike(text, i)
      if (m) {
        flush()
        nodes.push({ type: "link", href: m.href, title: m.title, children: parseInline(m.label) })
        i = m.end
        continue
      }
    }

    // Autolink.
    if (ch === "<") {
      const m = text.slice(i).match(/^<(https?:\/\/[^\s>]+)>/)
      if (m) {
        flush()
        const href = m[1] ?? ""
        nodes.push({ type: "link", href, children: [{ type: "text", value: href }] })
        i += m[0].length
        continue
      }
    }

    // Strikethrough.
    if (text.startsWith("~~", i)) {
      const m = matchDelimited(text, i, "~~")
      if (m) {
        flush()
        nodes.push({ type: "del", children: parseInline(m.content) })
        i = m.end
        continue
      }
    }

    // Bold + italic.
    if (text.startsWith("***", i) || text.startsWith("___", i)) {
      const marker = text.slice(i, i + 3)
      const m = matchDelimited(text, i, marker)
      if (m) {
        flush()
        nodes.push({ type: "strong", children: [{ type: "em", children: parseInline(m.content) }] })
        i = m.end
        continue
      }
    }

    // Bold.
    if (text.startsWith("**", i) || text.startsWith("__", i)) {
      const marker = text.slice(i, i + 2)
      const m = matchDelimited(text, i, marker)
      if (m) {
        flush()
        nodes.push({ type: "strong", children: parseInline(m.content) })
        i = m.end
        continue
      }
    }

    // Italic.
    if (ch === "*" || ch === "_") {
      const prevChar = text[i - 1] ?? ""
      const isMidWordUnderscore = ch === "_" && /\w/.test(prevChar)
      if (!isMidWordUnderscore) {
        const m = matchDelimited(text, i, ch)
        if (m && !/^\s|\s$/.test(m.content)) {
          flush()
          nodes.push({ type: "em", children: parseInline(m.content) })
          i = m.end
          continue
        }
      }
    }

    buffer += ch
    i++
  }

  flush()
  return nodes
}

// ─── React rendering ────────────────────────────────────────────────────────

function renderInline(nodes: InlineNode[], keyPrefix: string): React.ReactNode[] {
  return nodes.map((node, idx) => {
    const key = `${keyPrefix}-${idx}`
    switch (node.type) {
      case "text":
        return node.value === "" ? null : <React.Fragment key={key}>{node.value}</React.Fragment>
      case "break":
        return <br key={key} />
      case "strong":
        return (
          <strong key={key} className="font-semibold text-foreground">
            {renderInline(node.children, key)}
          </strong>
        )
      case "em":
        return (
          <em key={key} className="italic">
            {renderInline(node.children, key)}
          </em>
        )
      case "del":
        return (
          <del key={key} className="text-muted-foreground line-through">
            {renderInline(node.children, key)}
          </del>
        )
      case "code":
        return (
          <code key={key} className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
            {node.value}
          </code>
        )
      case "link":
        return (
          <a
            key={key}
            href={node.href}
            title={node.title}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-primary underline underline-offset-2 hover:opacity-80"
          >
            {renderInline(node.children, key)}
          </a>
        )
      case "image":
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={key}
            src={node.src}
            alt={node.alt}
            title={node.title}
            className="my-2 inline-block max-w-full rounded-md border"
          />
        )
      default:
        return null
    }
  })
}

const HEADING_STYLES: Record<number, string> = {
  1: "text-2xl font-bold mt-6 mb-3 pb-2 border-b",
  2: "text-xl font-bold mt-6 mb-3 pb-2 border-b",
  3: "text-lg font-semibold mt-5 mb-2",
  4: "text-base font-semibold mt-4 mb-2",
  5: "text-sm font-semibold mt-3 mb-1",
  6: "text-sm font-semibold text-muted-foreground mt-3 mb-1",
}

function alignClass(align: Align): string {
  if (align === "center") return "text-center"
  if (align === "right") return "text-right"
  return "text-left"
}

function renderBlocks(blocks: BlockNode[], keyPrefix: string): React.ReactNode[] {
  return blocks.map((block, idx) => {
    const key = `${keyPrefix}-b${idx}`
    switch (block.type) {
      case "heading": {
        const Tag = `h${block.level}` as React.ElementType
        return (
          <Tag key={key} className={cn("scroll-m-20 first:mt-0", HEADING_STYLES[block.level])}>
            {renderInline(block.children, key)}
          </Tag>
        )
      }
      case "paragraph":
        return (
          <p key={key} className="leading-relaxed [&:not(:first-child)]:mt-3">
            {renderInline(block.children, key)}
          </p>
        )
      case "blockquote":
        return (
          <blockquote key={key} className="my-3 border-l-4 border-primary/30 pl-4 text-muted-foreground italic">
            {renderBlocks(block.children, key)}
          </blockquote>
        )
      case "code":
        return (
          <div key={key} className="my-3 overflow-hidden rounded-lg border bg-muted/50">
            {block.lang && (
              <div className="border-b bg-muted/60 px-3 py-1 font-mono text-[11px] text-muted-foreground">
                {block.lang}
              </div>
            )}
            <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
              <code className="font-mono">{block.value}</code>
            </pre>
          </div>
        )
      case "hr":
        return <hr key={key} className="my-5 border-border" />
      case "list": {
        const Tag = (block.ordered ? "ol" : "ul") as React.ElementType
        return (
          <Tag
            key={key}
            start={block.ordered ? block.start : undefined}
            className={cn("my-3 ml-5 space-y-1.5", block.ordered ? "list-decimal" : "list-disc")}
          >
            {block.items.map((item, i) => (
              <li
                key={`${key}-i${i}`}
                className={cn(item.checked !== null && "flex items-start gap-2 -ml-5 list-none")}
              >
                {item.checked !== null && (
                  <input
                    type="checkbox"
                    checked={item.checked}
                    readOnly
                    disabled
                    className="mt-1.5 h-3.5 w-3.5 shrink-0 rounded border-muted-foreground/40 accent-primary"
                  />
                )}
                <div className="flex-1 [&>p]:m-0 [&>p]:inline">{renderBlocks(item.blocks, `${key}-i${i}`)}</div>
              </li>
            ))}
          </Tag>
        )
      }
      case "table":
        return (
          <div key={key} className="my-3 overflow-x-auto rounded-lg border">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/40">
                  {block.header.map((cell, ci) => (
                    <th key={ci} className={cn("px-3 py-2 font-semibold", alignClass(block.align[ci] ?? null))}>
                      {renderInline(cell, `${key}-h${ci}`)}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, ri) => (
                  <tr key={ri} className="border-b last:border-0 hover:bg-muted/20">
                    {row.map((cell, ci) => (
                      <td key={ci} className={cn("px-3 py-2", alignClass(block.align[ci] ?? null))}>
                        {renderInline(cell, `${key}-r${ri}c${ci}`)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      default:
        return null
    }
  })
}

// ─── Public component ───────────────────────────────────────────────────────

export interface MarkdownRendererProps {
  /** Raw markdown source to render. */
  content: string
  /** Extra class names for the wrapping element. */
  className?: string
}

/**
 * MarkdownRenderer — renders a GitHub-flavored markdown subset (headings,
 * emphasis, strikethrough, inline/fenced code, links, images, autolinks,
 * block quotes, ordered/unordered/task lists, tables, and rules) straight
 * to React elements. No `dangerouslySetInnerHTML` — safe by construction.
 */
export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  const blocks = React.useMemo(() => parseBlocks(content), [content])
  return <div className={cn("text-sm text-foreground", className)}>{renderBlocks(blocks, "root")}</div>
}

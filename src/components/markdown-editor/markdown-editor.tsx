"use client"

import * as React from "react"
import {
  Bold,
  Italic,
  Strikethrough,
  Heading2,
  Quote,
  Code,
  Link2,
  Image as ImageIcon,
  List,
  ListOrdered,
  ListTodo,
  Table as TableIcon,
  Minus,
  Eye,
  Pencil,
  Maximize2,
  Minimize2,
  HelpCircle,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { MarkdownRenderer } from "@/components/markdown-editor/markdown-renderer"

export interface MarkdownEditorProps {
  /** Controlled markdown value. */
  value?: string
  /** Initial value when uncontrolled. */
  defaultValue?: string
  /** Called whenever the markdown source changes. */
  onChange?: (value: string) => void
  /**
   * Called when an image is pasted or dropped. Resolve with the final URL
   * to use in `![alt](url)`. If omitted, images are embedded inline as
   * base64 data URLs so paste-to-upload works with zero backend.
   */
  onImageUpload?: (file: File) => Promise<string>
  /** Placeholder shown in the write tab. */
  placeholder?: string
  /** Minimum height (px) of the editing/preview area. */
  minHeight?: number
  /** Disable editing (preview-only interactions still work). */
  disabled?: boolean
  /** Show the formatting toolbar. Default: true. */
  toolbar?: boolean
  /** Autofocus the textarea on mount. */
  autoFocus?: boolean
  /** Extra class names for the outer container. */
  className?: string
}

function readFileAsDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function getDroppedImageFiles(dataTransfer: DataTransfer): File[] {
  return Array.from(dataTransfer.files).filter((f) => f.type.startsWith("image/"))
}

function getPastedImageFiles(clipboardData: DataTransfer): File[] {
  return Array.from(clipboardData.items)
    .filter((item) => item.kind === "file" && item.type.startsWith("image/"))
    .map((item) => item.getAsFile())
    .filter((f): f is File => f !== null)
}

const CHEATSHEET: { syntax: string; result: string }[] = [
  { syntax: "**bold**", result: "bold" },
  { syntax: "*italic*", result: "italic" },
  { syntax: "~~strike~~", result: "strikethrough" },
  { syntax: "`code`", result: "inline code" },
  { syntax: "# Heading", result: "heading" },
  { syntax: "> quote", result: "block quote" },
  { syntax: "- item", result: "bullet list" },
  { syntax: "1. item", result: "numbered list" },
  { syntax: "- [ ] todo", result: "task list" },
  { syntax: "[text](url)", result: "link" },
  { syntax: "![alt](url)", result: "image" },
  { syntax: "```lang", result: "code block" },
]

function ToolbarButton({
  icon: Icon,
  label,
  shortcut,
  onClick,
  disabled,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  shortcut?: string
  onClick: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      title={shortcut ? `${label} (${shortcut})` : label}
      aria-label={label}
      disabled={disabled}
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:pointer-events-none disabled:opacity-40"
    >
      <Icon className="h-3.5 w-3.5" />
    </button>
  )
}

function ToolbarDivider() {
  return <div className="mx-0.5 h-4 w-px bg-border" />
}

/**
 * MarkdownEditor — a GitHub-style markdown editor with Write / Preview tabs,
 * a formatting toolbar, keyboard shortcuts, and a fullscreen mode. Self
 * contained: only depends on lucide-react, the `cn` helper, and the
 * companion `MarkdownRenderer`. No extra runtime dependencies.
 */
export function MarkdownEditor({
  value: controlledValue,
  defaultValue = "",
  onChange,
  onImageUpload,
  placeholder = "Write something...",
  minHeight = 240,
  disabled = false,
  toolbar = true,
  autoFocus = false,
  className,
}: MarkdownEditorProps) {
  const isControlled = controlledValue !== undefined
  const [internalValue, setInternalValue] = React.useState(defaultValue)
  const value = isControlled ? controlledValue! : internalValue

  const [tab, setTab] = React.useState<"write" | "preview">("write")
  const [fullscreen, setFullscreen] = React.useState(false)
  const [helpOpen, setHelpOpen] = React.useState(false)
  const [isDragActive, setIsDragActive] = React.useState(false)

  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const helpRef = React.useRef<HTMLDivElement>(null)
  const valueRef = React.useRef(value)

  React.useEffect(() => {
    valueRef.current = value
  }, [value])

  const setValue = React.useCallback(
    (next: string) => {
      valueRef.current = next
      if (!isControlled) setInternalValue(next)
      onChange?.(next)
    },
    [isControlled, onChange]
  )

  React.useEffect(() => {
    if (!fullscreen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFullscreen(false)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener("keydown", onKeyDown)
    }
  }, [fullscreen])

  React.useEffect(() => {
    if (!helpOpen) return
    const onPointerDown = (e: MouseEvent) => {
      if (helpRef.current && !helpRef.current.contains(e.target as Node)) setHelpOpen(false)
    }
    document.addEventListener("mousedown", onPointerDown)
    return () => document.removeEventListener("mousedown", onPointerDown)
  }, [helpOpen])

  const focusTextarea = React.useCallback((start: number, end: number) => {
    requestAnimationFrame(() => {
      const el = textareaRef.current
      if (!el) return
      el.focus()
      el.setSelectionRange(start, end)
    })
  }, [])

  const wrapSelection = React.useCallback(
    (before: string, after: string = before, placeholder2 = "") => {
      const el = textareaRef.current
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const selected = value.slice(start, end) || placeholder2
      const next = value.slice(0, start) + before + selected + after + value.slice(end)
      setValue(next)
      focusTextarea(start + before.length, start + before.length + selected.length)
    },
    [value, setValue, focusTextarea]
  )

  const prefixLines = React.useCallback(
    (prefix: string, ordered = false) => {
      const el = textareaRef.current
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const lineStart = value.lastIndexOf("\n", start - 1) + 1
      const nextBreak = value.indexOf("\n", end)
      const lineEnd = nextBreak === -1 ? value.length : nextBreak
      const block = value.slice(lineStart, lineEnd)
      const lines = block.split("\n")
      const nonEmpty = lines.filter((l) => l.trim() !== "")
      const alreadyPrefixed = nonEmpty.length > 0 && nonEmpty.every((l) => l.startsWith(prefix))

      const newLines = lines.map((l, idx) => {
        if (l.trim() === "") return l
        if (alreadyPrefixed) return l.slice(prefix.length)
        return ordered ? `${idx + 1}. ${l}` : `${prefix}${l}`
      })
      const newBlock = newLines.join("\n")
      const next = value.slice(0, lineStart) + newBlock + value.slice(lineEnd)
      setValue(next)
      focusTextarea(lineStart, lineStart + newBlock.length)
    },
    [value, setValue, focusTextarea]
  )

  const insertAtCursor = React.useCallback(
    (text: string, selectFrom?: number, selectTo?: number) => {
      const el = textareaRef.current
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const next = value.slice(0, start) + text + value.slice(end)
      setValue(next)
      const from = selectFrom !== undefined ? start + selectFrom : start + text.length
      const to = selectTo !== undefined ? start + selectTo : from
      focusTextarea(from, to)
    },
    [value, setValue, focusTextarea]
  )

  const insertLinkLike = React.useCallback(
    (isImage: boolean) => {
      const el = textareaRef.current
      if (!el) return
      const start = el.selectionStart
      const end = el.selectionEnd
      const selected = value.slice(start, end)
      const bang = isImage ? "!" : ""
      const label = selected || (isImage ? "alt text" : "link text")
      const text = `${bang}[${label}](https://)`
      const urlStart = text.length - "https://)".length
      const urlEnd = text.length - 1
      insertAtCursor(text, urlStart, urlEnd)
    },
    [value, insertAtCursor]
  )

  const insertImageFile = React.useCallback(
    (file: File) => {
      const el = textareaRef.current
      if (!el) return Promise.resolve()
      const start = el.selectionStart
      const end = el.selectionEnd
      const name = file.name || "image.png"
      const placeholder = `![Uploading ${name}…]()`
      const current = valueRef.current
      const next = current.slice(0, start) + placeholder + current.slice(end)
      setValue(next)
      const cursor = start + placeholder.length
      focusTextarea(cursor, cursor)

      const upload = onImageUpload ? onImageUpload(file) : readFileAsDataUrl(file)

      return upload
        .then((url) => {
          const latest = valueRef.current
          const idx = latest.indexOf(placeholder)
          if (idx === -1) return
          setValue(latest.slice(0, idx) + `![${name}](${url})` + latest.slice(idx + placeholder.length))
        })
        .catch(() => {
          const latest = valueRef.current
          const idx = latest.indexOf(placeholder)
          if (idx === -1) return
          setValue(latest.slice(0, idx) + `![Failed to upload ${name}]()` + latest.slice(idx + placeholder.length))
        })
    },
    [setValue, focusTextarea, onImageUpload]
  )

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const files = getPastedImageFiles(e.clipboardData)
    if (files.length === 0) return
    e.preventDefault()
    for (const file of files) {
      await insertImageFile(file)
    }
  }

  const handleDragOver = (e: React.DragEvent<HTMLTextAreaElement>) => {
    if (Array.from(e.dataTransfer.items).some((item) => item.kind === "file")) {
      e.preventDefault()
      setIsDragActive(true)
    }
  }

  const handleDrop = async (e: React.DragEvent<HTMLTextAreaElement>) => {
    const files = getDroppedImageFiles(e.dataTransfer)
    setIsDragActive(false)
    if (files.length === 0) return
    e.preventDefault()
    for (const file of files) {
      await insertImageFile(file)
    }
  }

  const insertCodeBlock = React.useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const end = el.selectionEnd
    const selected = value.slice(start, end)
    const needsLeadingBreak = start > 0 && value[start - 1] !== "\n"
    const block = `${needsLeadingBreak ? "\n" : ""}\`\`\`\n${selected || "code"}\n\`\`\`\n`
    const codeStart = start + (needsLeadingBreak ? 1 : 0) + 4
    const codeEnd = codeStart + (selected || "code").length
    insertAtCursor(block, codeStart, codeEnd)
  }, [value, insertAtCursor])

  const insertTable = React.useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const needsLeadingBreak = start > 0 && value[start - 1] !== "\n"
    const table =
      `${needsLeadingBreak ? "\n\n" : "\n"}` +
      "| Column 1 | Column 2 | Column 3 |\n" +
      "| --- | --- | --- |\n" +
      "| Row 1 | Row 1 | Row 1 |\n" +
      "| Row 2 | Row 2 | Row 2 |\n"
    insertAtCursor(table)
  }, [value, insertAtCursor])

  const insertHr = React.useCallback(() => {
    const el = textareaRef.current
    if (!el) return
    const start = el.selectionStart
    const needsLeadingBreak = start > 0 && value[start - 1] !== "\n"
    insertAtCursor(`${needsLeadingBreak ? "\n\n" : ""}---\n`)
  }, [value, insertAtCursor])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const meta = e.metaKey || e.ctrlKey
    if (meta && e.key.toLowerCase() === "b") {
      e.preventDefault()
      wrapSelection("**", "**", "bold text")
      return
    }
    if (meta && e.key.toLowerCase() === "i") {
      e.preventDefault()
      wrapSelection("*", "*", "italic text")
      return
    }
    if (meta && e.key.toLowerCase() === "k") {
      e.preventDefault()
      insertLinkLike(false)
      return
    }
    if (e.key === "Tab") {
      e.preventDefault()
      const el = e.currentTarget
      const start = el.selectionStart
      const end = el.selectionEnd
      if (e.shiftKey) {
        const lineStart = value.lastIndexOf("\n", start - 1) + 1
        const removed = value.slice(lineStart, lineStart + 2) === "  " ? 2 : 0
        const next = value.slice(0, lineStart) + value.slice(lineStart + removed)
        setValue(next)
        focusTextarea(Math.max(lineStart, start - removed), Math.max(lineStart, end - removed))
      } else {
        const next = value.slice(0, start) + "  " + value.slice(end)
        setValue(next)
        focusTextarea(start + 2, end + 2)
      }
    }
  }

  const toolbarGroups: { icon: React.ComponentType<{ className?: string }>; label: string; shortcut?: string; onClick: () => void }[][] = [
    [
      { icon: Heading2, label: "Heading", onClick: () => prefixLines("## ") },
      { icon: Bold, label: "Bold", shortcut: "Ctrl+B", onClick: () => wrapSelection("**", "**", "bold text") },
      { icon: Italic, label: "Italic", shortcut: "Ctrl+I", onClick: () => wrapSelection("*", "*", "italic text") },
      { icon: Strikethrough, label: "Strikethrough", onClick: () => wrapSelection("~~", "~~", "strikethrough") },
    ],
    [
      { icon: Quote, label: "Quote", onClick: () => prefixLines("> ") },
      { icon: Code, label: "Inline code", onClick: () => wrapSelection("`", "`", "code") },
      { icon: Link2, label: "Link", shortcut: "Ctrl+K", onClick: () => insertLinkLike(false) },
      { icon: ImageIcon, label: "Image", onClick: () => insertLinkLike(true) },
    ],
    [
      { icon: List, label: "Bullet list", onClick: () => prefixLines("- ") },
      { icon: ListOrdered, label: "Numbered list", onClick: () => prefixLines("", true) },
      { icon: ListTodo, label: "Task list", onClick: () => prefixLines("- [ ] ") },
    ],
    [
      { icon: Code, label: "Code block", onClick: insertCodeBlock },
      { icon: TableIcon, label: "Table", onClick: insertTable },
      { icon: Minus, label: "Horizontal rule", onClick: insertHr },
    ],
  ]

  const charCount = value.length
  const wordCount = value.trim() === "" ? 0 : value.trim().split(/\s+/).length

  return (
    <>
      {fullscreen && (
        <div className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm" onClick={() => setFullscreen(false)} />
      )}
      <div
        className={cn(
          "flex flex-col overflow-hidden rounded-xl border bg-card shadow-sm",
          fullscreen && "fixed inset-4 z-50 shadow-2xl sm:inset-8",
          className
        )}
      >
        {/* Header: tabs + toolbar */}
        <div className="flex items-center justify-between gap-2 border-b bg-muted/30 px-2 py-1.5">
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setTab("write")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                tab === "write" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Pencil className="h-3.5 w-3.5" />
              Write
            </button>
            <button
              type="button"
              onClick={() => setTab("preview")}
              className={cn(
                "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
                tab === "preview" ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="h-3.5 w-3.5" />
              Preview
            </button>
          </div>

          <div className="flex items-center gap-0.5">
            {tab === "write" &&
              toolbar &&
              toolbarGroups.map((group, gi) => (
                <React.Fragment key={gi}>
                  {gi > 0 && <ToolbarDivider />}
                  {group.map((action) => (
                    <ToolbarButton
                      key={action.label}
                      icon={action.icon}
                      label={action.label}
                      shortcut={action.shortcut}
                      onClick={action.onClick}
                      disabled={disabled}
                    />
                  ))}
                </React.Fragment>
              ))}

            <ToolbarDivider />
            <div className="relative" ref={helpRef}>
              <ToolbarButton icon={HelpCircle} label="Markdown cheatsheet" onClick={() => setHelpOpen((o) => !o)} />
              {helpOpen && (
                <div className="absolute right-0 z-10 mt-1.5 w-64 rounded-lg border bg-popover p-3 text-popover-foreground shadow-lg">
                  <p className="mb-2 text-xs font-semibold">Markdown cheatsheet</p>
                  <div className="space-y-1">
                    {CHEATSHEET.map((item) => (
                      <div key={item.syntax} className="flex items-center justify-between gap-2 text-xs">
                        <code className="rounded bg-muted px-1 py-0.5 font-mono text-[11px]">{item.syntax}</code>
                        <span className="text-muted-foreground">{item.result}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <ToolbarButton
              icon={fullscreen ? Minimize2 : Maximize2}
              label={fullscreen ? "Exit fullscreen" : "Fullscreen"}
              onClick={() => setFullscreen((f) => !f)}
            />
          </div>
        </div>

        {/* Body */}
        {tab === "write" ? (
          <div className="relative flex-1">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              onKeyDown={handleKeyDown}
              onPaste={handlePaste}
              onDragOver={handleDragOver}
              onDragLeave={() => setIsDragActive(false)}
              onDrop={handleDrop}
              placeholder={placeholder}
              disabled={disabled}
              autoFocus={autoFocus}
              style={{ minHeight, height: fullscreen ? "100%" : minHeight }}
              className="w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-60"
            />
            {isDragActive && (
              <div className="pointer-events-none absolute inset-2 flex items-center justify-center rounded-lg border-2 border-dashed border-primary bg-primary/5 text-sm font-medium text-primary">
                Drop image to upload
              </div>
            )}
          </div>
        ) : (
          <div
            style={{ minHeight, height: fullscreen ? "100%" : undefined }}
            className="flex-1 overflow-y-auto p-4"
          >
            {value.trim() ? (
              <MarkdownRenderer content={value} />
            ) : (
              <p className="text-sm text-muted-foreground">Nothing to preview.</p>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 border-t bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground">
          <span>Markdown is supported · paste or drop images to attach</span>
          <span className="font-mono">
            {charCount} chars · {wordCount} words
          </span>
        </div>
      </div>
    </>
  )
}

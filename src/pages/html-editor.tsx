import { useState } from "react"
import {
  Copy,
  Check,
  Code2 as HtmlIcon,
  Github,
  ArrowLeft,
  Package,
  Terminal,
  FileCode2,
  Zap,
  PencilLine,
  Eye,
  Keyboard,
  Maximize2,
  ShieldCheck,
  Table2,
  SlidersHorizontal,
  ImagePlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HtmlEditor } from "@/components/html-editor/html-editor"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

// ─── Copy Button Component ──────────────────────────────────────────────────────

function CopyButton({ text, className }: { text: string; className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className={cn("h-8 w-8 shrink-0", className)}
      onClick={handleCopy}
    >
      {copied ? (
        <Check className="h-4 w-4 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 text-muted-foreground" />
      )}
    </Button>
  )
}

// ─── Package Manager Tabs ───────────────────────────────────────────────────────

const packageManagers = [
  { id: "npm", label: "npm", icon: "N", runner: "npx" },
  { id: "yarn", label: "yarn", icon: "Y", runner: "npx" },
  { id: "pnpm", label: "pnpm", icon: "P", runner: "pnpm dlx" },
  { id: "bun", label: "bun", icon: "B", runner: "bunx --bun" },
] as const

function PackageManagerTabs({ registryUrl }: { registryUrl: string }) {
  const [active, setActive] = useState<string>("bun")
  const activeManager = packageManagers.find((pm) => pm.id === active)!
  const command = `${activeManager.runner} shadcn@latest add ${registryUrl}/r/html-editor.json`

  return (
    <div>
      {/* Tab headers */}
      <div className="flex border-b bg-muted/30">
        {packageManagers.map((pm) => (
          <button
            key={pm.id}
            onClick={() => setActive(pm.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-4 py-2.5 text-xs font-medium transition-colors",
              active === pm.id
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground/70"
            )}
          >
            <span className={cn(
              "flex h-4 w-4 items-center justify-center rounded text-[9px] font-bold",
              active === pm.id
                ? "bg-primary text-primary-foreground"
                : "bg-muted-foreground/20 text-muted-foreground"
            )}>
              {pm.icon}
            </span>
            {pm.label}
            {active === pm.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-t" />
            )}
          </button>
        ))}
      </div>

      {/* Command display */}
      <div className="flex items-center gap-2 px-4 py-3.5 font-mono text-sm">
        <Terminal className="h-4 w-4 text-muted-foreground shrink-0" />
        <span className="text-muted-foreground">$</span>
        <code className="flex-1 text-foreground truncate">{command}</code>
        <CopyButton text={command} />
      </div>
    </div>
  )
}

// ─── Code Block Component ───────────────────────────────────────────────────────

function CodeBlock({ code, filename, language = "tsx" }: { code: string; filename?: string; language?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="rounded-xl border bg-card overflow-hidden">
      {filename && (
        <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
          <div className="flex items-center gap-2">
            <FileCode2 className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-xs font-medium text-muted-foreground">{filename}</span>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] px-1.5 py-0">
              {language}
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              className="h-6 px-2 text-xs gap-1"
              onClick={handleCopy}
            >
              {copied ? (
                <Check className="h-3 w-3 text-green-500" />
              ) : (
                <Copy className="h-3 w-3" />
              )}
              {copied ? "Copied" : "Copy"}
            </Button>
          </div>
        </div>
      )}
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-xs leading-relaxed text-muted-foreground">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

// ─── Main Page ──────────────────────────────────────────────────────────────────

const DEMO_HTML = `<h2>Welcome to the HTML Editor</h2>
<p>A GitHub-style editor with <strong>live preview</strong>, a tag toolbar, and keyboard shortcuts.</p>

<h3>Features</h3>
<ul>
  <li>Write / Preview tabs, just like GitHub</li>
  <li>Toolbar with <code>Ctrl/Cmd + B</code>, <code>I</code>, <code>K</code> shortcuts</li>
  <li><label><input type="checkbox" checked /> Sandboxed preview — no scripts</label></li>
</ul>

<blockquote>Try switching to the <strong>Preview</strong> tab, hit the fullscreen icon, or paste a screenshot right into this box.</blockquote>

<table>
  <thead>
    <tr><th>Feature</th><th>Supported</th></tr>
  </thead>
  <tbody>
    <tr><td>Tables</td><td>✅</td></tr>
    <tr><td>Checkboxes</td><td>✅</td></tr>
    <tr><td>Fenced-style code</td><td>✅</td></tr>
  </tbody>
</table>

<pre><code>&lt;p&gt;Hello, world!&lt;/p&gt;</code></pre>
`

export function HtmlEditorPage() {
  const [content, setContent] = useState(DEMO_HTML)

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <HtmlIcon className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight">HtmlEditor</span>
            </div>
            <Badge variant="secondary" className="text-[10px]">v1.0.0</Badge>
          </div>
          <nav className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="gap-1.5" asChild>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
                GitHub
              </a>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative container mx-auto px-6 pt-20 pb-16 text-center">
        {/* Background gradient */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-[40%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </div>

        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-6">
            <Package className="h-3.5 w-3.5 text-primary" />
            Open Source HTML Editor
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4 leading-[1.1]">
            An{" "}
            <span className="text-primary">HTML Editor</span>
            <br />
            with a safe preview
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
            Write and Preview tabs, a familiar tag toolbar, keyboard shortcuts, and a sandboxed
            iframe preview that never executes scripts. Drop it into any template or snippet editor.
          </p>

          {/* Install Commands */}
          <div className="mx-auto max-w-lg mb-8">
            <div className="rounded-xl border bg-card overflow-hidden">
              <PackageManagerTabs registryUrl={import.meta.env.VITE_REGISTRY_URL} />
            </div>
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <Zap className="h-4 w-4 text-primary" />
              <span>Zero dependencies</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <span>Sandboxed preview</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Maximize2 className="h-4 w-4 text-primary" />
              <span>Fullscreen mode</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ImagePlus className="h-4 w-4 text-primary" />
              <span>Paste or drop images</span>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-3">Live Demo</Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Try it out
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Edit the HTML below, use the toolbar or shortcuts, then flip to Preview.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <HtmlEditor value={content} onChange={setContent} minHeight={340} />
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-3">Features</Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Everything you need
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Built to feel exactly like the editor you already know, with safety baked in.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: PencilLine, title: "Write / Preview Tabs", desc: "Switch instantly between raw markup and a rendered preview, just like GitHub." },
            { icon: SlidersHorizontal, title: "Tag Toolbar", desc: "Bold, italic, strikethrough, headings, quotes, lists, links, images, tables, and code." },
            { icon: Keyboard, title: "Keyboard Shortcuts", desc: "Ctrl/Cmd+B, I, K for bold, italic, and links. Tab/Shift+Tab to indent lines." },
            { icon: ShieldCheck, title: "Sandboxed Preview", desc: "Preview renders in an iframe with an empty sandbox attribute — scripts never execute." },
            { icon: Table2, title: "Full Markup Support", desc: "Tables, checkboxes, blockquotes, and <pre><code> blocks render exactly as written." },
            { icon: Maximize2, title: "Fullscreen Mode", desc: "Expand the editor to a focused overlay, dismissible with Escape or a click outside." },
            { icon: ImagePlus, title: "Paste & Drop Images", desc: "Paste a screenshot or drag a file in — it's inserted as an <img> automatically, just like GitHub." },
          ].map((feature) => (
            <Card key={feature.title} className="group hover:shadow-md transition-all duration-300 hover:-translate-y-0.5">
              <CardHeader className="pb-2">
                <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                  <feature.icon className="h-4 w-4" />
                </div>
                <CardTitle className="text-sm">{feature.title}</CardTitle>
                <CardDescription className="text-xs">{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Usage / Code Examples */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center mb-10">
          <Badge variant="secondary" className="mb-3">Usage</Badge>
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl mb-2">
            Quick Start
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Drop it in, wire up state, done. The preview can also be used standalone.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="preview">Preview Only</TabsTrigger>
              <TabsTrigger value="form">In a Form</TabsTrigger>
              <TabsTrigger value="api">Props API</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <CodeBlock
                filename="page.tsx"
                code={`import { useState } from "react"
import { HtmlEditor } from "@/components/html-editor/html-editor"

export default function TemplatePage() {
  const [html, setHtml] = useState("<h1>Hello</h1>\\n<p>Start writing...</p>")

  return (
    <HtmlEditor
      value={html}
      onChange={setHtml}
      placeholder="Write your template..."
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="preview">
              <CodeBlock
                filename="email-preview.tsx"
                code={`import { HtmlPreview } from "@/components/html-editor/html-preview"

export function EmailPreview({ body }: { body: string }) {
  return (
    <div className="rounded-lg border overflow-hidden">
      <HtmlPreview html={body} minHeight={320} />
    </div>
  )
}`}
              />
            </TabsContent>

            <TabsContent value="form">
              <CodeBlock
                filename="template-form.tsx"
                code={`import { useState } from "react"
import { HtmlEditor } from "@/components/html-editor/html-editor"
import { Button } from "@/components/ui/button"

export function TemplateForm() {
  const [html, setHtml] = useState("")

  return (
    <form onSubmit={(e) => { e.preventDefault(); saveTemplate(html) }}>
      <HtmlEditor
        value={html}
        onChange={setHtml}
        placeholder="Write the email template..."
        minHeight={240}
      />
      <Button type="submit" className="mt-3">
        Save template
      </Button>
    </form>
  )
}`}
              />
            </TabsContent>

            <TabsContent value="api">
              <div className="rounded-xl border overflow-hidden">
                <div className="border-b bg-muted/40 px-4 py-2.5">
                  <span className="text-xs font-medium text-muted-foreground">HtmlEditor Props</span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-muted/20">
                        <th className="px-4 py-2.5 text-left font-medium">Prop</th>
                        <th className="px-4 py-2.5 text-left font-medium">Type</th>
                        <th className="px-4 py-2.5 text-left font-medium">Default</th>
                        <th className="px-4 py-2.5 text-left font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody className="font-mono text-xs">
                      {[
                        { prop: "value", type: "string", def: "undefined", desc: "Controlled HTML source" },
                        { prop: "defaultValue", type: "string", def: "<h2>Hello world</h2>...", desc: "Initial value when uncontrolled" },
                        { prop: "onChange", type: "(value: string) => void", def: "undefined", desc: "Called whenever the source changes" },
                        { prop: "onImageUpload", type: "(file: File) => Promise<string>", def: "undefined", desc: "Handle pasted/dropped images; defaults to inline base64" },
                        { prop: "placeholder", type: "string", def: '"<p>Write some HTML...</p>"', desc: "Placeholder in the Write tab" },
                        { prop: "minHeight", type: "number", def: "240", desc: "Minimum height (px) of the editor body" },
                        { prop: "toolbar", type: "boolean", def: "true", desc: "Show the formatting toolbar" },
                        { prop: "disabled", type: "boolean", def: "false", desc: "Disable editing" },
                        { prop: "autoFocus", type: "boolean", def: "false", desc: "Autofocus the textarea on mount" },
                      ].map((row) => (
                        <tr key={row.prop} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                          <td className="px-4 py-2.5 text-primary font-semibold">{row.prop}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{row.type}</td>
                          <td className="px-4 py-2.5 text-muted-foreground">{row.def}</td>
                          <td className="px-4 py-2.5 text-foreground font-sans text-xs">{row.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Dependencies Section */}
      <section className="container mx-auto px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Package className="h-4 w-4 text-primary" />
                Peer Dependencies
              </CardTitle>
              <CardDescription>
                These packages are required in your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-2 sm:grid-cols-2">
                {[
                  { name: "react", version: "^18 || ^19" },
                  { name: "lucide-react", version: "^0.4x" },
                  { name: "clsx + tailwind-merge", version: "latest" },
                ].map((dep) => (
                  <div
                    key={dep.name}
                    className="flex items-center justify-between rounded-lg border px-3 py-2"
                  >
                    <code className="text-xs font-medium">{dep.name}</code>
                    <Badge variant="outline" className="text-[10px]">{dep.version}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA / Quick Install */}
      <section className="container mx-auto px-6 py-16">
        <Card className="relative overflow-hidden mx-auto max-w-3xl">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <CardContent className="relative flex flex-col items-center text-center py-12 px-8">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary mb-5">
              <Eye className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl mb-2">
              Ready to use?
            </h2>
            <p className="text-muted-foreground max-w-md mb-6 text-sm">
              Install the component and start writing HTML with a safe live preview in minutes.
            </p>
            <div className="w-full max-w-md">
              <div className="rounded-xl border bg-card overflow-hidden">
                <PackageManagerTabs registryUrl={import.meta.env.VITE_REGISTRY_URL} />
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <HtmlIcon className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">@wahan/html-editor</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with React, Tailwind CSS, and shadcn/ui conventions.
          </p>
        </div>
      </footer>
    </div>
  )
}

import { useState } from "react"
import {
  Copy,
  Check,
  ListChecks,
  Search,
  Keyboard,
  Tags,
  Layers,
  SlidersHorizontal,
  MousePointerClick,
  Github,
  ArrowLeft,
  Package,
  Terminal,
  FileCode2,
  Zap,
  Boxes,
  Palette,
  Code2,
  Rocket,
  Wrench,
  Sparkles,
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
import { MultiSelect, type MultiSelectOption } from "@/components/multiselect/multi-select"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

// ─── Sample Options ─────────────────────────────────────────────────────────────

const options: MultiSelectOption[] = [
  { value: "react", label: "React", group: "Frameworks", icon: Boxes },
  { value: "vue", label: "Vue", group: "Frameworks", icon: Boxes },
  { value: "svelte", label: "Svelte", group: "Frameworks", icon: Boxes },
  { value: "solid", label: "SolidJS", group: "Frameworks", icon: Boxes },
  { value: "angular", label: "Angular", group: "Frameworks", icon: Boxes },
  { value: "tailwind", label: "Tailwind CSS", group: "Styling", icon: Palette },
  { value: "shadcn", label: "shadcn/ui", group: "Styling", icon: Sparkles },
  { value: "sass", label: "Sass", group: "Styling", icon: Palette },
  { value: "vite", label: "Vite", group: "Tooling", icon: Zap },
  { value: "webpack", label: "Webpack", group: "Tooling", icon: Wrench },
  { value: "turbopack", label: "Turbopack (soon)", group: "Tooling", icon: Rocket, disabled: true },
  { value: "typescript", label: "TypeScript", group: "Languages", icon: Code2 },
  { value: "rust", label: "Rust", group: "Languages", icon: Code2 },
]

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
  const command = `${activeManager.runner} shadcn@latest add ${registryUrl}/r/multiselect.json`

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

export function MultiSelectPage() {
  const [stack, setStack] = useState<string[]>(["react", "tailwind", "shadcn"])
  const [limited, setLimited] = useState<string[]>([])

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
                <ListChecks className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight">MultiSelect</span>
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
            Open Source MultiSelect Component
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4 leading-[1.1]">
            Accessible{" "}
            <span className="text-primary">MultiSelect</span>
            <br />
            for React
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
            A modern, accessible multi-select combobox built with Tailwind CSS and shadcn/ui.
            Search, keyboard navigation, badge chips, grouping, and selection limits — zero extra dependencies.
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
              <span>Zero deps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-primary" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Keyboard className="h-4 w-4 text-primary" />
              <span>Keyboard-ready</span>
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
            Interactive demo with search, grouping, and keyboard navigation. Type to filter, use arrow keys, Enter to toggle.
          </p>
        </div>

        {/* Demo */}
        <div className="mx-auto max-w-xl space-y-8">
          {/* Grouped + searchable */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Grouped &amp; searchable</span>
              <Badge variant="outline" className="ml-auto font-normal text-[10px]">
                icons · groups
              </Badge>
            </div>
            <MultiSelect
              options={options}
              value={stack}
              onChange={setStack}
              placeholder="Choose frameworks, tools, languages..."
              searchPlaceholder="Search technologies..."
            />
            <div className="min-h-5 text-xs text-muted-foreground">
              {stack.length > 0 ? (
                <span>
                  Value:{" "}
                  <code className="font-mono text-foreground">
                    [{stack.map((s) => `"${s}"`).join(", ")}]
                  </code>
                </span>
              ) : (
                <span>Nothing selected yet.</span>
              )}
            </div>
          </div>

          {/* Max selection */}
          <div className="space-y-2.5">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Max selection (limit 2)</span>
              <Badge variant="outline" className="ml-auto font-normal text-[10px]">
                maxSelected
              </Badge>
            </div>
            <MultiSelect
              options={options.filter((o) => o.group === "Frameworks")}
              value={limited}
              onChange={setLimited}
              maxSelected={2}
              showToolbar={false}
              placeholder="Pick up to 2 frameworks..."
            />
            <div className="min-h-5 text-xs text-muted-foreground">
              {limited.length >= 2
                ? "Limit reached — remaining options are disabled until you remove one."
                : `${2 - limited.length} more allowed.`}
            </div>
          </div>
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
            Built for real-world forms with all the interactions users expect from a professional combobox.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: Search, title: "Search & Filter", desc: "Built-in search box filters options instantly as you type." },
            { icon: Keyboard, title: "Keyboard Navigation", desc: "Arrow keys to move, Enter to toggle, Escape to close, Backspace to remove." },
            { icon: Tags, title: "Badge Chips", desc: "Selected items render as removable chips with a +N more overflow." },
            { icon: Layers, title: "Option Grouping", desc: "Group options under headings with optional per-option icons." },
            { icon: SlidersHorizontal, title: "Selection Limits", desc: "Cap selections with maxSelected. Extra options auto-disable." },
            { icon: MousePointerClick, title: "Controlled or Not", desc: "Use as controlled (value/onChange) or uncontrolled (defaultValue)." },
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
            Get up and running in minutes. Define your options, wire up state, done.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="groups">Groups &amp; Icons</TabsTrigger>
              <TabsTrigger value="limit">Selection Limit</TabsTrigger>
              <TabsTrigger value="api">Props API</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <CodeBlock
                filename="form.tsx"
                code={`import { useState } from "react"
import { MultiSelect } from "@/components/multiselect/multi-select"

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue" },
  { value: "svelte", label: "Svelte" },
]

export default function Form() {
  const [value, setValue] = useState<string[]>([])

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={setValue}
      placeholder="Pick frameworks..."
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="groups">
              <CodeBlock
                filename="form.tsx"
                code={`import { MultiSelect } from "@/components/multiselect/multi-select"
import { Boxes, Palette, Zap } from "lucide-react"

const options = [
  { value: "react", label: "React", group: "Frameworks", icon: Boxes },
  { value: "vue", label: "Vue", group: "Frameworks", icon: Boxes },
  { value: "tailwind", label: "Tailwind", group: "Styling", icon: Palette },
  { value: "vite", label: "Vite", group: "Tooling", icon: Zap },
]

export default function Form() {
  return (
    <MultiSelect
      options={options}
      defaultValue={["react"]}
      searchPlaceholder="Search stack..."
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="limit">
              <CodeBlock
                filename="form.tsx"
                code={`import { useState } from "react"
import { MultiSelect } from "@/components/multiselect/multi-select"

export default function Form() {
  const [value, setValue] = useState<string[]>([])

  return (
    <MultiSelect
      options={options}
      value={value}
      onChange={setValue}
      maxSelected={3}
      maxDisplay={2}
      showToolbar={false}
      placeholder="Pick up to 3..."
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="api">
              <div className="space-y-6">
                <div className="rounded-xl border overflow-hidden">
                  <div className="border-b bg-muted/40 px-4 py-2.5">
                    <span className="text-xs font-medium text-muted-foreground">MultiSelect Props</span>
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
                          { prop: "options", type: "MultiSelectOption[]", def: "required", desc: "Available options to choose from" },
                          { prop: "value", type: "string[]", def: "undefined", desc: "Controlled selected values" },
                          { prop: "defaultValue", type: "string[]", def: "[]", desc: "Initial values (uncontrolled)" },
                          { prop: "onChange", type: "(value: string[]) => void", def: "undefined", desc: "Called when selection changes" },
                          { prop: "placeholder", type: "string", def: '"Select options..."', desc: "Trigger placeholder text" },
                          { prop: "searchPlaceholder", type: "string", def: '"Search..."', desc: "Search input placeholder" },
                          { prop: "emptyText", type: "string", def: '"No results found."', desc: "Shown when search has no match" },
                          { prop: "maxDisplay", type: "number", def: "3", desc: "Chips shown before +N more" },
                          { prop: "maxSelected", type: "number", def: "undefined", desc: "Hard limit on selections" },
                          { prop: "disabled", type: "boolean", def: "false", desc: "Disable the whole control" },
                          { prop: "searchable", type: "boolean", def: "true", desc: "Show the search input" },
                          { prop: "showToolbar", type: "boolean", def: "true", desc: "Show select-all / clear toolbar" },
                          { prop: "className", type: "string", def: "undefined", desc: "Extra class for the trigger" },
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

                <div className="rounded-xl border overflow-hidden">
                  <div className="border-b bg-muted/40 px-4 py-2.5">
                    <span className="text-xs font-medium text-muted-foreground">MultiSelectOption</span>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b bg-muted/20">
                          <th className="px-4 py-2.5 text-left font-medium">Field</th>
                          <th className="px-4 py-2.5 text-left font-medium">Type</th>
                          <th className="px-4 py-2.5 text-left font-medium">Description</th>
                        </tr>
                      </thead>
                      <tbody className="font-mono text-xs">
                        {[
                          { field: "value", type: "string", desc: "Unique value stored in selection" },
                          { field: "label", type: "string", desc: "Text shown to the user" },
                          { field: "group", type: "string?", desc: "Optional group heading" },
                          { field: "icon", type: "ComponentType?", desc: "Optional leading icon" },
                          { field: "disabled", type: "boolean?", desc: "Disable this individual option" },
                        ].map((row) => (
                          <tr key={row.field} className="border-b last:border-0 hover:bg-muted/30 transition-colors">
                            <td className="px-4 py-2.5 text-primary font-semibold">{row.field}</td>
                            <td className="px-4 py-2.5 text-muted-foreground">{row.type}</td>
                            <td className="px-4 py-2.5 text-foreground font-sans text-xs">{row.desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
                  { name: "tailwindcss", version: "^4.x" },
                  { name: "lucide-react", version: "^0.4x" },
                  { name: "class-variance-authority", version: "^0.7" },
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
              <p className="mt-3 text-xs text-muted-foreground">
                Also pulls in the <code className="font-mono">badge</code> shadcn/ui primitive
                automatically via the registry.
              </p>
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
              <ListChecks className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl mb-2">
              Ready to use?
            </h2>
            <p className="text-muted-foreground max-w-md mb-6 text-sm">
              Install the component and start building beautiful multi-selects in minutes.
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
              <ListChecks className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">@wahan/multiselect</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with Tailwind CSS and shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  )
}

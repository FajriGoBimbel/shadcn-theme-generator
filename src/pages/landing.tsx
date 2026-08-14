import { useState } from "react";
import {
  Palette,
  Eye,
  Code2,
  Copy,
  Moon,
  Sun,
  Sparkles,
  Layers,
  Zap,
  Github,
  Dices,
  Settings2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTheme } from "@/lib/theme-context";
import { ThemeSidebar } from "@/components/generator/theme-sidebar";
import { cn } from "@/lib/utils";

function HeroGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl" />
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="rounded-xl border bg-card shadow-lg overflow-hidden">
      {/* Mock window bar */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400" />
          <div className="h-3 w-3 rounded-full bg-yellow-400" />
          <div className="h-3 w-3 rounded-full bg-green-400" />
        </div>
        <div className="flex-1 text-center">
          <div className="mx-auto w-48 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground">
            localhost:5173
          </div>
        </div>
      </div>

      {/* Dashboard content */}
      <div className="p-6 space-y-5">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-card-foreground">Dashboard</h3>
            <p className="text-xs text-muted-foreground">Welcome back, Developer</p>
          </div>
          <Button size="sm">New Project</Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-background p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold text-card-foreground">$45,231</p>
            <p className="text-xs text-green-600">+20.1%</p>
          </div>
          <div className="rounded-lg border bg-background p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Users</p>
            <p className="text-lg font-bold text-card-foreground">2,350</p>
            <p className="text-xs text-green-600">+15.3%</p>
          </div>
          <div className="rounded-lg border bg-background p-3 space-y-1">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-lg font-bold text-card-foreground">573</p>
            <p className="text-xs text-muted-foreground">online now</p>
          </div>
        </div>

        {/* Buttons row */}
        <div className="flex flex-wrap gap-2">
          <Button size="sm">Primary</Button>
          <Button size="sm" variant="secondary">Secondary</Button>
          <Button size="sm" variant="outline">Outline</Button>
          <Button size="sm" variant="destructive">Destructive</Button>
          <Button size="sm" variant="ghost">Ghost</Button>
        </div>

        {/* Form preview */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label className="text-xs">Email</Label>
            <Input placeholder="name@example.com" className="h-8 text-xs" />
          </div>
          <div className="space-y-1.5">
            <Label className="text-xs">Password</Label>
            <Input type="password" placeholder="********" className="h-8 text-xs" />
          </div>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <Badge>Active</Badge>
          <Badge variant="secondary">Pending</Badge>
          <Badge variant="destructive">Error</Badge>
          <Badge variant="outline">Draft</Badge>
        </div>

        {/* Mini table */}
        <div className="rounded-lg border overflow-hidden">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Name</th>
                <th className="px-3 py-2 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-3 py-2 text-right font-medium text-muted-foreground">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="px-3 py-2 font-medium">Project Alpha</td>
                <td className="px-3 py-2"><Badge variant="default" className="text-[10px] px-1.5 py-0">Active</Badge></td>
                <td className="px-3 py-2 text-right">$2,500</td>
              </tr>
              <tr className="border-b">
                <td className="px-3 py-2 font-medium">Project Beta</td>
                <td className="px-3 py-2"><Badge variant="secondary" className="text-[10px] px-1.5 py-0">Pending</Badge></td>
                <td className="px-3 py-2 text-right">$1,200</td>
              </tr>
              <tr>
                <td className="px-3 py-2 font-medium">Project Gamma</td>
                <td className="px-3 py-2"><Badge variant="outline" className="text-[10px] px-1.5 py-0">Draft</Badge></td>
                <td className="px-3 py-2 text-right">$800</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-lg">
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">global.css</span>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
          <Copy className="h-3 w-3" />
          Copy
        </Button>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed text-muted-foreground overflow-hidden max-h-[280px]">
        <div><span className="text-primary">@import</span> "tailwindcss";</div>
        <div className="mt-2"><span className="text-primary">@custom-variant</span> dark (&:is(.dark *));</div>
        <div className="mt-3"><span className="text-muted-foreground/60">:root</span> {"{"}</div>
        <div className="pl-4">--background: <span className="text-primary">oklch(1 0 0)</span>;</div>
        <div className="pl-4">--foreground: <span className="text-primary">oklch(0.145 0 0)</span>;</div>
        <div className="pl-4">--primary: <span className="text-primary">oklch(0.205 0 0)</span>;</div>
        <div className="pl-4">--primary-foreground: <span className="text-primary">oklch(0.985 0 0)</span>;</div>
        <div className="pl-4 text-muted-foreground/40">...</div>
        <div>{"}"}</div>
        <div className="mt-3"><span className="text-muted-foreground/60">@theme inline</span> {"{"}</div>
        <div className="pl-4">--color-primary: <span className="text-primary">var(--primary)</span>;</div>
        <div className="pl-4 text-muted-foreground/40">...</div>
        <div>{"}"}</div>
      </div>
    </div>
  );
}

export function LandingPage() {
  const { previewMode, setPreviewMode, randomizeTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Sidebar Panel (slide-out) */}
      <div
        className={cn(
          "fixed inset-y-0 right-0 z-[60] w-[400px] max-w-[90vw] bg-background border-l shadow-2xl transform transition-transform duration-300 ease-in-out",
          sidebarOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <ThemeSidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-[55] bg-black/20 backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Palette className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-semibold tracking-tight">
              Theme Generator
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={randomizeTheme}
              title="Random Theme"
            >
              <Dices className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setPreviewMode(previewMode === "light" ? "dark" : "light")}
              title={`Switch to ${previewMode === "light" ? "dark" : "light"} mode`}
            >
              {previewMode === "light" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8" asChild>
              <a href="https://github.com/FajriGoBimbel/shadcn-theme-generator" target="_blank" rel="noopener noreferrer">
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button size="sm" className="ml-2 gap-1.5" onClick={() => setSidebarOpen(true)}>
              <Settings2 className="h-3.5 w-3.5" />
              Customize
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative container mx-auto px-6 pt-24 pb-20 text-center">
        <HeroGradient />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-1.5 text-sm text-muted-foreground mb-8">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Visual Theme Builder for shadcn/ui
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]">
            Build your shadcn/ui
            <br />
            theme{" "}
            <span className="relative">
              <span className="text-primary">visually</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary/20" />
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-10 leading-relaxed">
            Customize colors, radius, typography, shadows, and light/dark mode.
            See every change instantly. Generate and copy your{" "}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm font-mono">
              global.css
            </code>{" "}
            in one click.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="text-base px-8 h-12 shadow-md" onClick={() => setSidebarOpen(true)}>
              <Settings2 className="mr-2 h-4 w-4" />
              Start Creating
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-base px-8 h-12 gap-2"
              onClick={randomizeTheme}
            >
              <Dices className="h-4 w-4" />
              Random Theme
            </Button>
          </div>
        </div>
      </section>

      {/* Tech stack pills */}
      <section className="container mx-auto px-6 pb-16">
        <div className="flex flex-wrap items-center justify-center gap-3">
          {["Vite", "React", "TypeScript", "Tailwind CSS v4", "shadcn/ui", "OKLCH"].map(
            (tech) => (
              <div
                key={tech}
                className="rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground shadow-sm"
              >
                {tech}
              </div>
            )
          )}
        </div>
      </section>

      {/* Live Preview Section */}
      <section id="preview" className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Live Preview
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Your theme, applied everywhere
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            Every component on this page uses the current theme. Open the
            sidebar or hit Random to see instant changes.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <DashboardPreview />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <CodePreview />
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm">Tabs Component</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="overview">
                  <TabsList className="w-full">
                    <TabsTrigger value="overview" className="flex-1 text-xs">Overview</TabsTrigger>
                    <TabsTrigger value="analytics" className="flex-1 text-xs">Analytics</TabsTrigger>
                    <TabsTrigger value="reports" className="flex-1 text-xs">Reports</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview" className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      Tabs inherit your theme colors, radius, and font settings automatically.
                    </p>
                  </TabsContent>
                  <TabsContent value="analytics" className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      Analytics data visualization area.
                    </p>
                  </TabsContent>
                  <TabsContent value="reports" className="mt-3">
                    <p className="text-xs text-muted-foreground">
                      Generated reports section.
                    </p>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">
            Features
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Everything you need
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A complete visual workflow from customization to production-ready CSS.
          </p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Palette className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Color System</CardTitle>
              <CardDescription>
                Full OKLCH color configuration for 30+ variables. Light and dark modes independently.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Eye className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Live Preview</CardTitle>
              <CardDescription>
                Real-time preview on actual shadcn/ui components. No refresh needed.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Layers className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Theme Presets</CardTitle>
              <CardDescription>
                7 built-in presets to jumpstart your theme. Customize further from any preset.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Dices className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Random Generate</CardTitle>
              <CardDescription>
                Generate harmonious random themes with one click. Explore unexpected color combinations.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Code2 className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Generate CSS</CardTitle>
              <CardDescription>
                Production-ready global.css compatible with Tailwind CSS v4 and shadcn/ui.
              </CardDescription>
            </CardHeader>
          </Card>
          <Card className="group hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                <Zap className="h-5 w-5" />
              </div>
              <CardTitle className="text-base">Instant Output</CardTitle>
              <CardDescription>
                One-click copy or download. Drop into any Vite + Tailwind + shadcn/ui project.
              </CardDescription>
            </CardHeader>
          </Card>
        </div>
      </section>

      {/* How it works */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">
            Workflow
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Four simple steps
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            From customization to production in under a minute.
          </p>
        </div>
        <div className="mx-auto max-w-2xl">
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute left-6 top-10 bottom-10 w-px bg-border" />

            <div className="space-y-8">
              {[
                {
                  icon: Palette,
                  title: "Customize Theme",
                  desc: "Pick a preset or hit Random, then fine-tune colors, radius, fonts, and shadows.",
                },
                {
                  icon: Eye,
                  title: "Live Preview",
                  desc: "Watch all components on this page update in real-time as you adjust.",
                },
                {
                  icon: Code2,
                  title: "Generate CSS",
                  desc: "Your configuration is automatically converted to a valid global.css.",
                },
                {
                  icon: Copy,
                  title: "Copy & Ship",
                  desc: "Copy or download, paste into your project, done.",
                },
              ].map((step, i) => (
                <div key={step.title} className="relative flex items-start gap-5">
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-sm">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <div className="pt-1.5">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Step {i + 1}
                      </span>
                    </div>
                    <h3 className="font-semibold mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <CardContent className="relative flex flex-col items-center text-center py-16 px-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary mb-6">
              <Palette className="h-6 w-6 text-primary-foreground" />
            </div>
            <h2 className="text-2xl font-bold sm:text-3xl mb-3">
              Ready to build your theme?
            </h2>
            <p className="text-muted-foreground max-w-md mb-8">
              Start with a preset, randomize, or fine-tune every detail. No sign-up, no backend.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="text-base px-8 h-12 shadow-md" onClick={() => setSidebarOpen(true)}>
                <Settings2 className="mr-2 h-4 w-4" />
                Open Generator
              </Button>
              <Button variant="outline" size="lg" className="text-base px-8 h-12 gap-2" onClick={randomizeTheme}>
                <Dices className="h-4 w-4" />
                Random Theme
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="container mx-auto px-6 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-primary">
              <Palette className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">Shadcn Theme Generator</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with Vite, React, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  );
}

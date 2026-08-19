import { useState, useEffect } from "react";
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
  Table2,
  ArrowUpDown,
  CheckSquare,
  ArrowRight,
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
import { Link } from "react-router-dom";

function HeroGradient() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-[40%] left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl animate-float-slow" />
      <div className="absolute -bottom-[20%] -right-[10%] h-[400px] w-[400px] rounded-full bg-primary/3 blur-3xl animate-float-delayed" />
      <div className="absolute -bottom-[20%] -left-[10%] h-[300px] w-[300px] rounded-full bg-accent/5 blur-3xl animate-float" />
    </div>
  );
}

/** Animated counter that loops between values */
function AnimatedNumber({ values, prefix = "", suffix = "" }: { values: string[]; prefix?: string; suffix?: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % values.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [values.length]);

  return (
    <span className="inline-block transition-all duration-500">
      {prefix}
      <span key={index} className="inline-block animate-fade-in-up">
        {values[index]}
      </span>
      {suffix}
    </span>
  );
}

/** Animated typing text that loops */
function TypingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = texts[index]!;
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else {
      setIsDeleting(false);
      setIndex((prev) => (prev + 1) % texts.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, index, texts]);

  return (
    <span className="font-mono text-xs text-primary">
      {displayed}
      <span className="animate-blink">|</span>
    </span>
  );
}

function DashboardPreview() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRow((prev) => (prev + 1) % 3);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-xl border bg-card shadow-lg overflow-hidden animate-border-glow">
      {/* Mock window bar */}
      <div className="flex items-center gap-2 border-b bg-muted/40 px-4 py-2.5">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-400 animate-pulse-dot" />
          <div className="h-3 w-3 rounded-full bg-yellow-400 animate-pulse-dot" style={{ animationDelay: "0.3s" }} />
          <div className="h-3 w-3 rounded-full bg-green-400 animate-pulse-dot" style={{ animationDelay: "0.6s" }} />
        </div>
        <div className="flex-1 text-center">
          <div className="mx-auto w-48 rounded-md bg-background/80 px-3 py-1 text-xs text-muted-foreground overflow-hidden">
            <TypingText texts={["localhost:5173", "my-app.vercel.app", "dashboard.dev"]} />
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
          <Button size="sm" className="animate-float-slow">New Project</Button>
        </div>

        {/* Stats with animated numbers */}
        <div className="grid grid-cols-3 gap-3">
          <div className="rounded-lg border bg-background p-3 space-y-1 animate-float" style={{ animationDelay: "0s" }}>
            <p className="text-xs text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold text-card-foreground">
              <AnimatedNumber values={["$45,231", "$48,102", "$51,890", "$47,654"]} />
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-green-600">+20.1%</span>
              <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-green-500 animate-progress" />
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-3 space-y-1 animate-float" style={{ animationDelay: "0.5s" }}>
            <p className="text-xs text-muted-foreground">Users</p>
            <p className="text-lg font-bold text-card-foreground">
              <AnimatedNumber values={["2,350", "2,412", "2,389", "2,501"]} />
            </p>
            <div className="flex items-center gap-1">
              <span className="text-xs text-green-600">+15.3%</span>
              <div className="h-1 flex-1 rounded-full bg-muted overflow-hidden">
                <div className="h-full rounded-full bg-green-500 animate-progress" style={{ animationDelay: "0.5s" }} />
              </div>
            </div>
          </div>
          <div className="rounded-lg border bg-background p-3 space-y-1 animate-float" style={{ animationDelay: "1s" }}>
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-lg font-bold text-card-foreground">
              <AnimatedNumber values={["573", "612", "589", "634"]} />
            </p>
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse-dot" />
              <span className="text-xs text-muted-foreground">online now</span>
            </div>
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

        {/* Form preview with shimmer focus effect */}
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

        {/* Badges with subtle pulse */}
        <div className="flex flex-wrap gap-2">
          <Badge className="animate-float-slow">Active</Badge>
          <Badge variant="secondary" className="animate-float-slow" style={{ animationDelay: "0.3s" }}>Pending</Badge>
          <Badge variant="destructive" className="animate-float-slow" style={{ animationDelay: "0.6s" }}>Error</Badge>
          <Badge variant="outline" className="animate-float-slow" style={{ animationDelay: "0.9s" }}>Draft</Badge>
        </div>

        {/* Mini table with animated row highlight */}
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
              {[
                { name: "Project Alpha", badge: "default" as const, badgeText: "Active", amount: "$2,500" },
                { name: "Project Beta", badge: "secondary" as const, badgeText: "Pending", amount: "$1,200" },
                { name: "Project Gamma", badge: "outline" as const, badgeText: "Draft", amount: "$800" },
              ].map((row, i) => (
                <tr
                  key={row.name}
                  className={cn(
                    "border-b last:border-0 transition-colors duration-500",
                    activeRow === i && "bg-primary/5"
                  )}
                >
                  <td className="px-3 py-2 font-medium">
                    {row.name}
                    {activeRow === i && (
                      <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full bg-primary animate-pulse-dot" />
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <Badge variant={row.badge} className="text-[10px] px-1.5 py-0">
                      {row.badgeText}
                    </Badge>
                  </td>
                  <td className="px-3 py-2 text-right">{row.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function CodePreview() {
  const [line, setLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setLine((prev) => (prev + 1) % 8);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const lines = [
    { prefix: "@import", content: ' "tailwindcss";' },
    { prefix: "@custom-variant", content: " dark (&:is(.dark *));" },
    { prefix: ":root", content: " {" },
    { prefix: "  --primary:", content: " oklch(0.488 0.243 264);" },
    { prefix: "  --background:", content: " oklch(1 0 0);" },
    { prefix: "}", content: "" },
    { prefix: "@theme inline", content: " {" },
    { prefix: "  --color-primary:", content: " var(--primary);" },
  ];

  return (
    <div className="rounded-xl border bg-card overflow-hidden shadow-lg animate-float-slow" style={{ animationDelay: "0.5s" }}>
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
        <span className="text-xs font-medium text-muted-foreground">global.css</span>
        <Button variant="ghost" size="sm" className="h-6 px-2 text-xs gap-1">
          <Copy className="h-3 w-3" />
          Copy
        </Button>
      </div>
      <div className="p-4 font-mono text-xs leading-relaxed text-muted-foreground overflow-hidden max-h-[280px]">
        {lines.map((l, i) => (
          <div
            key={i}
            className={cn(
              "transition-all duration-300 rounded px-1 -mx-1",
              line === i && "bg-primary/10"
            )}
          >
            <span className="text-primary">{l.prefix}</span>
            {l.content}
            {line === i && <span className="animate-blink text-primary">|</span>}
          </div>
        ))}
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
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
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
            <Sparkles className="h-3.5 w-3.5 text-primary animate-pulse-dot" />
            Visual Theme Builder for shadcn/ui
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl mb-6 leading-[1.1]">
            Build your shadcn/ui
            <br />
            theme{" "}
            <span className="relative">
              <span className="text-primary">visually</span>
              <span className="absolute -bottom-1 left-0 right-0 h-1 rounded-full bg-primary/20 animate-shimmer" />
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
            (tech, i) => (
              <div
                key={tech}
                className="rounded-full border bg-card px-4 py-1.5 text-sm font-medium text-card-foreground shadow-sm animate-float-slow"
                style={{ animationDelay: `${i * 0.2}s` }}
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
            <Card className="animate-float" style={{ animationDelay: "1s" }}>
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
          {[
            { icon: Palette, title: "Color System", desc: "Full OKLCH color configuration for 30+ variables. Light and dark modes independently." },
            { icon: Eye, title: "Live Preview", desc: "Real-time preview on actual shadcn/ui components. No refresh needed." },
            { icon: Layers, title: "Theme Presets", desc: "7 built-in presets to jumpstart your theme. Customize further from any preset." },
            { icon: Dices, title: "Random Generate", desc: "Generate harmonious random themes with one click. Explore unexpected color combinations." },
            { icon: Code2, title: "Generate CSS", desc: "Production-ready global.css compatible with Tailwind CSS v4 and shadcn/ui." },
            { icon: Zap, title: "Instant Output", desc: "One-click copy or download. Drop into any Vite + Tailwind + shadcn/ui project." },
          ].map((feature, i) => (
            <Card
              key={feature.title}
              className="group hover:shadow-md transition-all duration-300 hover:-translate-y-1 animate-float-slow"
              style={{ animationDelay: `${i * 0.4}s` }}
            >
              <CardHeader>
                <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 group-hover:scale-110">
                  <feature.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-base">{feature.title}</CardTitle>
                <CardDescription>{feature.desc}</CardDescription>
              </CardHeader>
            </Card>
          ))}
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
            {/* Connecting line with shimmer */}
            <div className="absolute left-6 top-10 bottom-10 w-px bg-border overflow-hidden">
              <div className="absolute inset-0 w-full animate-shimmer opacity-50" />
            </div>

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
                <div
                  key={step.title}
                  className="relative flex items-start gap-5 animate-float-slow"
                  style={{ animationDelay: `${i * 0.6}s` }}
                >
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-background text-primary shadow-sm group">
                    <step.icon className="h-5 w-5" />
                    {/* Ping effect */}
                    <span className="absolute inset-0 rounded-full border-2 border-primary animate-ping opacity-20" style={{ animationDuration: "3s", animationDelay: `${i * 0.8}s` }} />
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

      {/* DataTable Component */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4">
            Open Source
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            DataTable Component
          </h2>
          <p className="mx-auto max-w-xl text-muted-foreground">
            A powerful, interactive datatable built with TanStack Table. Sorting, pagination,
            row selection, and loading states — ready to use.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Card className="relative overflow-hidden group hover:shadow-lg transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-primary/3 opacity-0 group-hover:opacity-100 transition-opacity" />
            <CardContent className="relative p-8">
              <div className="grid gap-8 md:grid-cols-2 items-center">
                {/* Left — Info */}
                <div className="space-y-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Table2 className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold">@wahan/datatable</h3>
                      <p className="text-xs text-muted-foreground">v1.0.0 · MIT License</p>
                    </div>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      { icon: ArrowUpDown, text: "Column sorting (client & server)" },
                      { icon: CheckSquare, text: "Row selection with callbacks" },
                      { icon: Layers, text: "Pagination & loading states" },
                    ].map((item) => (
                      <div key={item.text} className="flex items-center gap-2.5 text-sm text-muted-foreground">
                        <item.icon className="h-4 w-4 text-primary shrink-0" />
                        <span>{item.text}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/datatable">
                    <Button className="gap-2 mt-2">
                      View Documentation
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>

                {/* Right — Install command preview */}
                <div className="space-y-3">
                  <div className="rounded-xl border bg-muted/30 overflow-hidden">
                    <div className="flex items-center gap-2 border-b bg-muted/50 px-4 py-2">
                      <div className="flex gap-1.5">
                        <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                        <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                      </div>
                      <span className="text-[10px] text-muted-foreground font-mono">terminal</span>
                    </div>
                    <div className="p-4 font-mono text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">$</span>
                        <span className="text-foreground">npx shadcn@latest add @wahan/datatable</span>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>✓ installed datatable block</p>
                        <p>✓ 4 files added to components/datatable/</p>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border bg-muted/30 p-4 font-mono text-xs">
                    <p className="text-muted-foreground mb-1">// Quick usage</p>
                    <p><span className="text-primary">import</span> {"{"} DataTable {"}"} <span className="text-primary">from</span> <span className="text-green-600">"@/components/datatable/data-table"</span></p>
                    <p className="mt-2">&lt;<span className="text-primary">DataTable</span></p>
                    <p className="ml-4">columns={"{columns}"}</p>
                    <p className="ml-4">data={"{data}"}</p>
                    <p className="ml-4">isSelect</p>
                    <p>/&gt;</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="container mx-auto px-6 py-20">
        <Card className="relative overflow-hidden animate-border-glow">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
          <CardContent className="relative flex flex-col items-center text-center py-16 px-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary mb-6 animate-float">
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

import { useState } from "react"
import {
  Copy,
  Check,
  Table2,
  ArrowUpDown,
  ListFilter,
  Loader2,
  CheckSquare,
  Hash,
  Zap,
  Github,
  ArrowLeft,
  Package,
  Terminal,
  FileCode2,
  Layers,
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
import { DataTable } from "@/components/datatable/data-table"
import { cn } from "@/lib/utils"
import { Link } from "react-router-dom"

// ─── Sample Data ────────────────────────────────────────────────────────────────

type User = {
  id: number
  name: string
  email: string
  role: string
  status: "active" | "inactive" | "pending"
  joined: string
}

const sampleData: User[] = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "active", joined: "2024-01-15" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Editor", status: "active", joined: "2024-02-20" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Viewer", status: "inactive", joined: "2024-03-10" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Editor", status: "pending", joined: "2024-04-05" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "Admin", status: "active", joined: "2024-05-12" },
  { id: 6, name: "Diana Prince", email: "diana@example.com", role: "Editor", status: "active", joined: "2024-06-08" },
  { id: 7, name: "Edward Norton", email: "edward@example.com", role: "Viewer", status: "inactive", joined: "2024-07-22" },
  { id: 8, name: "Fiona Apple", email: "fiona@example.com", role: "Admin", status: "active", joined: "2024-08-14" },
  { id: 9, name: "George Lucas", email: "george@example.com", role: "Editor", status: "pending", joined: "2024-09-30" },
  { id: 10, name: "Hannah Montana", email: "hannah@example.com", role: "Viewer", status: "active", joined: "2024-10-18" },
  { id: 11, name: "Ivan Petrov", email: "ivan@example.com", role: "Admin", status: "active", joined: "2024-11-02" },
  { id: 12, name: "Julia Roberts", email: "julia@example.com", role: "Editor", status: "inactive", joined: "2024-12-25" },
]

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    sortable: true,
    cell: ({ row }: any) => (
      <div className="font-medium">{row.getValue("name")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    sortable: true,
  },
  {
    accessorKey: "role",
    header: "Role",
    sortable: true,
    cell: ({ row }: any) => (
      <Badge variant={row.getValue("role") === "Admin" ? "default" : "secondary"}>
        {row.getValue("role")}
      </Badge>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    sortable: true,
    cell: ({ row }: any) => {
      const status = row.getValue("status") as string
      return (
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "h-2 w-2 rounded-full",
              status === "active" && "bg-green-500",
              status === "inactive" && "bg-gray-400",
              status === "pending" && "bg-yellow-500"
            )}
          />
          <span className="capitalize">{status}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "joined",
    header: "Joined",
    sortable: true,
  },
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
  const command = `${activeManager.runner} shadcn@latest add ${registryUrl}/r/datatable.json`

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

export function DataTablePage() {
  const [selectedRows, setSelectedRows] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const handleLoadingDemo = () => {
    setIsLoading(true)
    setTimeout(() => setIsLoading(false), 3000)
  }

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
                <Table2 className="h-4 w-4 text-primary-foreground" />
              </div>
              <span className="font-semibold tracking-tight">DataTable</span>
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
            Open Source DataTable Component
          </div>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl mb-4 leading-[1.1]">
            Powerful{" "}
            <span className="text-primary">DataTable</span>
            <br />
            for React
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-muted-foreground mb-8 leading-relaxed">
            A feature-rich, interactive datatable component built with TanStack Table,
            Tailwind CSS, and shadcn/ui. Sorting, pagination, row selection, loading states — all in one package.
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
              <span>Lightweight</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-primary" />
              <span>TypeScript</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Package className="h-4 w-4 text-primary" />
              <span>Tree-shakeable</span>
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
            Interactive demo with sorting, pagination, and row selection. Click column headers to sort.
          </p>
        </div>

        {/* Demo Controls */}
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5"
              onClick={handleLoadingDemo}
            >
              <Loader2 className={cn("h-3.5 w-3.5", isLoading && "animate-spin")} />
              {isLoading ? "Loading..." : "Show Loading State"}
            </Button>
            {selectedRows.length > 0 && (
              <Badge variant="secondary" className="gap-1">
                <CheckSquare className="h-3 w-3" />
                {selectedRows.length} row{selectedRows.length > 1 ? "s" : ""} selected
              </Badge>
            )}
          </div>

          {/* DataTable */}
          <DataTable
            columns={columns}
            data={sampleData}
            loading={isLoading}
            isSelect={true}
            isSequenceNumber={true}
            onSelect={(selected) => setSelectedRows(selected)}
            pagination={{
              initialPageSize: 5,
              pageSizeOptions: [5, 10, 20],
              totalData: sampleData.length,
              initialPageIndex: 1,
            }}
          />
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
            Built for real-world applications with all the features you expect from a professional datatable.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
          {[
            { icon: ArrowUpDown, title: "Sorting", desc: "Click column headers to sort ascending/descending. Supports manual server-side sorting." },
            { icon: ListFilter, title: "Pagination", desc: "Built-in animated pagination with configurable page sizes and server-side support." },
            { icon: CheckSquare, title: "Row Selection", desc: "Checkbox-based row selection with select all. Get selected data via callback." },
            { icon: Hash, title: "Sequence Number", desc: "Auto-generated row numbers that respect pagination offset." },
            { icon: Loader2, title: "Loading State", desc: "Skeleton loading animation while data is being fetched." },
            { icon: Layers, title: "Column Groups", desc: "Support for nested column groups with proper header spanning." },
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
            Get up and running in minutes. Define your columns, pass your data, done.
          </p>
        </div>

        <div className="mx-auto max-w-4xl">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="w-full justify-start mb-4">
              <TabsTrigger value="basic">Basic Usage</TabsTrigger>
              <TabsTrigger value="pagination">With Pagination</TabsTrigger>
              <TabsTrigger value="selection">Row Selection</TabsTrigger>
              <TabsTrigger value="api">Props API</TabsTrigger>
            </TabsList>

            <TabsContent value="basic">
              <CodeBlock
                filename="page.tsx"
                code={`import { DataTable } from "@/components/datatable/data-table"

const columns = [
  {
    accessorKey: "name",
    header: "Name",
    sortable: true,
  },
  {
    accessorKey: "email",
    header: "Email",
    sortable: true,
  },
  {
    accessorKey: "role",
    header: "Role",
  },
]

export default function UsersPage() {
  return (
    <DataTable
      columns={columns}
      data={users}
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="pagination">
              <CodeBlock
                filename="page.tsx"
                code={`import { DataTable } from "@/components/datatable/data-table"

export default function UsersPage() {
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { data, total } = useQuery({
    queryKey: ["users", page, pageSize],
    queryFn: () => fetchUsers({ page, pageSize }),
  })

  return (
    <DataTable
      columns={columns}
      data={data ?? []}
      pagination={{
        initialPageSize: pageSize,
        initialPageIndex: page,
        totalData: total,
        pageSizeOptions: [10, 20, 50],
        onPaginationChange: ({ pageIndex, pageSize }) => {
          setPage(pageIndex)
          setPageSize(pageSize)
        },
      }}
    />
  )
}`}
              />
            </TabsContent>

            <TabsContent value="selection">
              <CodeBlock
                filename="page.tsx"
                code={`import { DataTable } from "@/components/datatable/data-table"

export default function UsersPage() {
  const [selected, setSelected] = useState([])

  return (
    <div>
      <p>{selected.length} rows selected</p>

      <DataTable
        columns={columns}
        data={users}
        isSelect={true}
        onSelect={(rows) => setSelected(rows)}
      />

      <Button onClick={() => handleBulkDelete(selected)}>
        Delete Selected
      </Button>
    </div>
  )
}`}
              />
            </TabsContent>

            <TabsContent value="api">
              <div className="rounded-xl border overflow-hidden">
                <div className="border-b bg-muted/40 px-4 py-2.5">
                  <span className="text-xs font-medium text-muted-foreground">DataTable Props</span>
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
                        { prop: "columns", type: "ColumnDef[]", def: "required", desc: "Column definitions with sortable option" },
                        { prop: "data", type: "TData[]", def: "required", desc: "Array of data to display" },
                        { prop: "pagination", type: "PaginationConfig", def: "undefined", desc: "Pagination configuration object" },
                        { prop: "loading", type: "boolean", def: "false", desc: "Show skeleton loading state" },
                        { prop: "isSelect", type: "boolean", def: "false", desc: "Enable row selection checkboxes" },
                        { prop: "isSequenceNumber", type: "boolean", def: "true", desc: "Show auto row numbers" },
                        { prop: "onSelect", type: "(rows: TData[]) => void", def: "undefined", desc: "Callback when selection changes" },
                        { prop: "onSortingChange", type: "(sorting: SortingState) => void", def: "undefined", desc: "Callback for server-side sorting" },
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
                  { name: "@tanstack/react-table", version: "^8.x" },
                  { name: "tailwindcss", version: "^4.x" },
                  { name: "lucide-react", version: "^0.4x" },
                  { name: "framer-motion", version: "^13.x" },
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
              <Table2 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold sm:text-2xl mb-2">
              Ready to use?
            </h2>
            <p className="text-muted-foreground max-w-md mb-6 text-sm">
              Install the package and start building beautiful data tables in minutes.
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
              <Table2 className="h-3 w-3 text-primary-foreground" />
            </div>
            <span className="text-sm font-medium">@wahan/datatable</span>
          </div>
          <p className="text-sm text-muted-foreground">
            Built with TanStack Table, Tailwind CSS, and shadcn/ui.
          </p>
        </div>
      </footer>
    </div>
  )
}

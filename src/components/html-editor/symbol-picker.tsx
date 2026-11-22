"use client"

import * as React from "react"
import { Search, X } from "lucide-react"
import { cn } from "@/lib/utils"

export interface SymbolItem {
  /** What is shown on the button. */
  label: string
  /** Human-readable name, used for search and tooltip. */
  name: string
  /** Text inserted into the editor. Defaults to `label`. */
  insert?: string
}

export interface SymbolCategory {
  id: string
  label: string
  symbols: SymbolItem[]
}

const s = (label: string, name: string, insert?: string): SymbolItem => ({ label, name, insert })

export const SYMBOL_CATEGORIES: SymbolCategory[] = [
  {
    id: "math",
    label: "Matematika",
    symbols: [
      s("±", "plus minus"),
      s("∓", "minus plus"),
      s("×", "kali times"),
      s("÷", "bagi divide"),
      s("·", "titik kali dot"),
      s("−", "minus"),
      s("=", "sama dengan equals"),
      s("≠", "tidak sama dengan not equal"),
      s("≈", "kira-kira approximately"),
      s("≡", "identik identical"),
      s("≅", "kongruen congruent"),
      s("∼", "sebangun similar tilde"),
      s("∝", "sebanding proportional"),
      s("<", "kurang dari less than", "&lt;"),
      s(">", "lebih dari greater than", "&gt;"),
      s("≤", "kurang dari sama dengan less equal"),
      s("≥", "lebih dari sama dengan greater equal"),
      s("≪", "jauh lebih kecil much less"),
      s("≫", "jauh lebih besar much greater"),
      s("√", "akar kuadrat square root"),
      s("∛", "akar pangkat tiga cube root"),
      s("∜", "akar pangkat empat fourth root"),
      s("∞", "tak hingga infinity"),
      s("°", "derajat degree"),
      s("′", "menit prime"),
      s("″", "detik double prime"),
      s("%", "persen percent"),
      s("‰", "permil per mille"),
      s("∑", "sigma jumlah sum"),
      s("∏", "produk product"),
      s("∫", "integral"),
      s("∬", "integral lipat dua double integral"),
      s("∭", "integral lipat tiga triple integral"),
      s("∮", "integral kontur contour integral"),
      s("∂", "turunan parsial partial"),
      s("∇", "nabla del gradient"),
      s("Δ", "delta perubahan change"),
      s("ƒ", "fungsi function"),
      s("!", "faktorial factorial"),
      s("|x|", "nilai mutlak absolute value", "|x|"),
      s("⌊ ⌋", "floor lantai", "⌊⌋"),
      s("⌈ ⌉", "ceiling atap", "⌈⌉"),
      s("lim", "limit", "lim<sub>x→0</sub> "),
      s("log", "logaritma logarithm", "<sup>a</sup>log b"),
      s("ln", "logaritma natural natural log", "ln "),
    ],
  },
  {
    id: "latex",
    label: "Rumus LaTeX",
    symbols: [
      s("a⁄b", "pecahan fraction frac", "$$\\frac{a}{b}$$"),
      s("√x", "akar square root sqrt", "$$\\sqrt{x}$$"),
      s("ⁿ√x", "akar pangkat n nth root", "$$\\sqrt[n]{x}$$"),
      s("xⁿ", "pangkat power", "$$x^{n}$$"),
      s("xᵢ", "indeks subscript", "$$x_{i}$$"),
      s("∫ dx", "integral tak tentu indefinite", "$$\\int f(x)\\,dx$$"),
      s("∫ₐᵇ", "integral tentu definite", "$$\\int_{a}^{b} f(x)\\,dx$$"),
      s("lim", "limit", "$$\\lim_{x \\to a} f(x)$$"),
      s("d/dx", "turunan derivative", "$$\\frac{d}{dx} f(x)$$"),
      s("∂/∂x", "turunan parsial partial derivative", "$$\\frac{\\partial f}{\\partial x}$$"),
      s("Σ", "sigma jumlah sum", "$$\\sum_{i=1}^{n} x_i$$"),
      s("Π", "produk product", "$$\\prod_{i=1}^{n} x_i$$"),
      s("sin", "trigonometri sinus sin cos tan", "$$\\sin 30^\\circ + \\cos 60^\\circ$$"),
      s("log", "logaritma logarithm", "$$^{a}\\log b$$"),
      s("ax²+bx+c", "persamaan kuadrat quadratic", "$$ax^2 + bx + c = 0$$"),
      s("x₁,₂", "rumus abc quadratic formula", "$$x_{1,2} = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$"),
      s("[ ]", "matriks matrix", "$$\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$$"),
      s("|A|", "determinan determinant", "$$\\begin{vmatrix} a & b \\\\ c & d \\end{vmatrix}$$"),
      s("{ }", "sistem persamaan system of equations cases", "$$\\begin{cases} x + y = 5 \\\\ x - y = 1 \\end{cases}$$"),
      s("ⁿCᵣ", "kombinasi combination binomial", "$$\\binom{n}{r}$$"),
      s("v⃗", "vektor vector", "$$\\vec{v}$$"),
      s("x̄", "rata-rata mean bar", "$$\\bar{x}$$"),
      s("H₂O", "rumus kimia chemistry ce mhchem", "$$\\ce{H2O}$$"),
      s("A ⇌ B", "reaksi kimia reaction equilibrium ce", "$$\\ce{N2 + 3H2 <=> 2NH3}$$"),
      s("$…$", "rumus inline inline math", "$x$"),
      s("$$…$$", "rumus blok display math", "$$x$$"),
    ],
  },
  {
    id: "fraction",
    label: "Pangkat & Pecahan",
    symbols: [
      s("x²", "pangkat superscript", "x<sup>2</sup>"),
      s("x₂", "indeks subscript", "x<sub>2</sub>"),
      s("xⁿ", "pangkat n power", "x<sup>n</sup>"),
      s("eˣ", "eksponen exponential", "e<sup>x</sup>"),
      s("a⁄b", "pecahan fraction", "<sup>a</sup>&frasl;<sub>b</sub>"),
      s("√x", "akar x root", "√<span style=\"text-decoration: overline\">x</span>"),
      s("ⁿ√x", "akar pangkat n nth root", "<sup>n</sup>√<span style=\"text-decoration: overline\">x</span>"),
      s("x̄", "rata-rata mean bar", "x̄"),
      s("½", "setengah half"),
      s("⅓", "sepertiga third"),
      s("⅔", "dua pertiga two thirds"),
      s("¼", "seperempat quarter"),
      s("¾", "tiga perempat three quarters"),
      s("⅕", "seperlima fifth"),
      s("⅙", "seperenam sixth"),
      s("⅛", "seperdelapan eighth"),
      s("⁰", "superscript 0"),
      s("¹", "superscript 1"),
      s("²", "superscript 2 kuadrat squared"),
      s("³", "superscript 3 kubik cubed"),
      s("⁴", "superscript 4"),
      s("⁵", "superscript 5"),
      s("⁶", "superscript 6"),
      s("⁷", "superscript 7"),
      s("⁸", "superscript 8"),
      s("⁹", "superscript 9"),
      s("⁺", "superscript plus"),
      s("⁻", "superscript minus"),
      s("ⁿ", "superscript n"),
      s("₀", "subscript 0"),
      s("₁", "subscript 1"),
      s("₂", "subscript 2"),
      s("₃", "subscript 3"),
      s("₄", "subscript 4"),
      s("₅", "subscript 5"),
      s("₆", "subscript 6"),
      s("₇", "subscript 7"),
      s("₈", "subscript 8"),
      s("₉", "subscript 9"),
      s("₊", "subscript plus"),
      s("₋", "subscript minus"),
    ],
  },
  {
    id: "greek",
    label: "Yunani",
    symbols: [
      s("α", "alpha"),
      s("β", "beta"),
      s("γ", "gamma"),
      s("δ", "delta"),
      s("ε", "epsilon"),
      s("ζ", "zeta"),
      s("η", "eta"),
      s("θ", "theta"),
      s("ι", "iota"),
      s("κ", "kappa"),
      s("λ", "lambda"),
      s("μ", "mu"),
      s("ν", "nu"),
      s("ξ", "xi"),
      s("π", "pi"),
      s("ρ", "rho"),
      s("σ", "sigma"),
      s("τ", "tau"),
      s("υ", "upsilon"),
      s("φ", "phi"),
      s("χ", "chi"),
      s("ψ", "psi"),
      s("ω", "omega"),
      s("Γ", "Gamma kapital"),
      s("Δ", "Delta kapital"),
      s("Θ", "Theta kapital"),
      s("Λ", "Lambda kapital"),
      s("Ξ", "Xi kapital"),
      s("Π", "Pi kapital"),
      s("Σ", "Sigma kapital"),
      s("Φ", "Phi kapital"),
      s("Ψ", "Psi kapital"),
      s("Ω", "Omega kapital"),
    ],
  },
  {
    id: "physics",
    label: "Fisika",
    symbols: [
      s("ℏ", "h bar konstanta planck tereduksi reduced planck"),
      s("Å", "angstrom"),
      s("Ω", "ohm"),
      s("µ", "mikro micro"),
      s("℃", "derajat celcius celsius"),
      s("℉", "derajat fahrenheit"),
      s("K", "kelvin"),
      s("∠", "sudut angle"),
      s("⊥", "tegak lurus perpendicular"),
      s("∥", "sejajar parallel"),
      s("→", "vektor arah vector arrow"),
      s("v⃗", "vektor v vector", "v⃗"),
      s("F⃗", "vektor gaya force vector", "F⃗"),
      s("Δx", "perpindahan displacement", "Δx"),
      s("Δt", "selang waktu time interval", "Δt"),
      s("v₀", "kecepatan awal initial velocity", "v<sub>0</sub>"),
      s("vₜ", "kecepatan akhir final velocity", "v<sub>t</sub>"),
      s("m/s²", "percepatan acceleration", "m/s<sup>2</sup>"),
      s("m/s", "kecepatan velocity meter per detik"),
      s("kg·m/s", "momentum"),
      s("N·m", "torsi torque newton meter"),
      s("J", "joule energi energy"),
      s("W", "watt daya power"),
      s("Pa", "pascal tekanan pressure"),
      s("eV", "elektron volt electron volt"),
      s("ε₀", "permitivitas vakum permittivity", "ε<sub>0</sub>"),
      s("μ₀", "permeabilitas vakum permeability", "μ<sub>0</sub>"),
      s("F = ma", "hukum newton newton law", "F = m·a"),
      s("E = mc²", "einstein energi massa mass energy", "E = mc<sup>2</sup>"),
      s("Eₖ", "energi kinetik kinetic energy", "E<sub>k</sub> = ½mv<sup>2</sup>"),
      s("Eₚ", "energi potensial potential energy", "E<sub>p</sub> = mgh"),
      s("V = IR", "hukum ohm ohm law", "V = I·R"),
      s("PV = nRT", "gas ideal ideal gas"),
      s("λ = c/f", "panjang gelombang wavelength", "λ = c/f"),
      s("×10ⁿ", "notasi ilmiah scientific notation", "× 10<sup>n</sup>"),
    ],
  },
  {
    id: "chemistry",
    label: "Kimia",
    symbols: [
      s("→", "reaksi reaction"),
      s("⇌", "kesetimbangan equilibrium"),
      s("↑", "gas"),
      s("↓", "endapan precipitate"),
      s("Δ", "pemanasan heat"),
      s("H₂O", "air water", "H<sub>2</sub>O"),
      s("CO₂", "karbon dioksida carbon dioxide", "CO<sub>2</sub>"),
      s("O₂", "oksigen oxygen", "O<sub>2</sub>"),
      s("H₂SO₄", "asam sulfat sulfuric acid", "H<sub>2</sub>SO<sub>4</sub>"),
      s("NaCl", "garam dapur sodium chloride"),
      s("NH₃", "amonia ammonia", "NH<sub>3</sub>"),
      s("CH₄", "metana methane", "CH<sub>4</sub>"),
      s("H⁺", "ion hidrogen hydrogen ion", "H<sup>+</sup>"),
      s("OH⁻", "ion hidroksida hydroxide", "OH<sup>−</sup>"),
      s("SO₄²⁻", "ion sulfat sulfate", "SO<sub>4</sub><sup>2−</sup>"),
      s("Xₙ", "subscript indeks", "X<sub>n</sub>"),
      s("Xⁿ⁺", "muatan ion charge", "X<sup>n+</sup>"),
      s("ᴬ₂X", "nomor massa atom isotope", "<sup>A</sup><sub>Z</sub>X"),
      s("(aq)", "larutan aqueous"),
      s("(s)", "padat solid"),
      s("(l)", "cair liquid"),
      s("(g)", "gas"),
      s("pH", "derajat keasaman"),
      s("mol", "mol"),
      s("M", "molaritas molarity"),
    ],
  },
  {
    id: "logic",
    label: "Himpunan & Logika",
    symbols: [
      s("∈", "anggota element of"),
      s("∉", "bukan anggota not element"),
      s("∋", "memuat contains"),
      s("⊂", "himpunan bagian subset"),
      s("⊃", "superset"),
      s("⊆", "subset sama dengan subset equal"),
      s("⊇", "superset sama dengan"),
      s("⊄", "bukan himpunan bagian not subset"),
      s("∪", "gabungan union"),
      s("∩", "irisan intersection"),
      s("∖", "selisih set minus"),
      s("∅", "himpunan kosong empty set"),
      s("Aᶜ", "komplemen complement", "A<sup>c</sup>"),
      s("ℕ", "bilangan asli natural"),
      s("ℤ", "bilangan bulat integer"),
      s("ℚ", "bilangan rasional rational"),
      s("ℝ", "bilangan real"),
      s("ℂ", "bilangan kompleks complex"),
      s("∀", "untuk setiap for all"),
      s("∃", "ada exists"),
      s("∄", "tidak ada not exists"),
      s("¬", "negasi not"),
      s("∧", "dan and konjungsi"),
      s("∨", "atau or disjungsi"),
      s("⊕", "xor"),
      s("⇒", "implikasi implies"),
      s("⇔", "biimplikasi iff"),
      s("∴", "maka therefore"),
      s("∵", "karena because"),
      s("⊤", "benar true"),
      s("⊥", "salah false"),
    ],
  },
  {
    id: "geometry",
    label: "Geometri",
    symbols: [
      s("∠", "sudut angle"),
      s("∡", "sudut terukur measured angle"),
      s("⊥", "tegak lurus perpendicular"),
      s("∥", "sejajar parallel"),
      s("∦", "tidak sejajar not parallel"),
      s("≅", "kongruen congruent"),
      s("∼", "sebangun similar"),
      s("△", "segitiga triangle"),
      s("□", "persegi square"),
      s("▭", "persegi panjang rectangle"),
      s("○", "lingkaran circle"),
      s("⌒", "busur arc"),
      s("°", "derajat degree"),
      s("π", "pi"),
      s("AB̅", "ruas garis segment", "<span style=\"text-decoration: overline\">AB</span>"),
    ],
  },
  {
    id: "arrows",
    label: "Panah",
    symbols: [
      s("→", "panah kanan right"),
      s("←", "panah kiri left"),
      s("↑", "panah atas up"),
      s("↓", "panah bawah down"),
      s("↔", "panah dua arah left right"),
      s("↕", "panah atas bawah up down"),
      s("⇒", "panah ganda kanan double right"),
      s("⇐", "panah ganda kiri double left"),
      s("⇔", "panah ganda dua arah double left right"),
      s("⇌", "kesetimbangan equilibrium"),
      s("↦", "pemetaan maps to"),
      s("⟶", "panah panjang long right"),
      s("↗", "panah serong kanan atas north east"),
      s("↘", "panah serong kanan bawah south east"),
      s("↺", "putar berlawanan counterclockwise"),
      s("↻", "putar searah clockwise"),
    ],
  },
]

const ALL_SYMBOLS: SymbolItem[] = (() => {
  const seen = new Set<string>()
  const out: SymbolItem[] = []
  for (const cat of SYMBOL_CATEGORIES) {
    for (const sym of cat.symbols) {
      const key = `${sym.label}|${sym.insert ?? ""}`
      if (seen.has(key)) continue
      seen.add(key)
      out.push(sym)
    }
  }
  return out
})()

export interface SymbolPickerProps {
  /** Called with the text to insert when a symbol is picked. */
  onSelect: (text: string) => void
  /** Called when the picker should close (Escape / close button). */
  onClose?: () => void
  className?: string
}

/**
 * SymbolPicker — a searchable grid of math, physics, chemistry, Greek, logic,
 * geometry and arrow symbols. Items either insert a plain Unicode character
 * or a small HTML snippet (e.g. `x<sup>2</sup>`, `H<sub>2</sub>O`).
 */
export function SymbolPicker({ onSelect, onClose, className }: SymbolPickerProps) {
  const [category, setCategory] = React.useState(SYMBOL_CATEGORIES[0]!.id)
  const [query, setQuery] = React.useState("")
  const [recent, setRecent] = React.useState<SymbolItem[]>([])

  const q = query.trim().toLowerCase()
  const symbols = q
    ? ALL_SYMBOLS.filter((sym) => sym.name.toLowerCase().includes(q) || sym.label.toLowerCase().includes(q))
    : SYMBOL_CATEGORIES.find((c) => c.id === category)?.symbols ?? []

  const pick = (sym: SymbolItem) => {
    onSelect(sym.insert ?? sym.label)
    setRecent((prev) => [sym, ...prev.filter((r) => r !== sym)].slice(0, 12))
  }

  const renderButton = (sym: SymbolItem, i: number) => (
    <button
      key={`${sym.label}-${i}`}
      type="button"
      title={`${sym.name}${sym.insert && sym.insert !== sym.label ? ` — ${sym.insert}` : ""}`}
      onMouseDown={(e) => e.preventDefault()}
      onClick={() => pick(sym)}
      className={cn(
        "flex h-8 items-center justify-center rounded-md border border-transparent px-1.5 text-sm transition-colors hover:border-border hover:bg-accent hover:text-accent-foreground",
        sym.label.length > 2 ? "col-span-2 text-xs" : ""
      )}
    >
      {sym.label}
    </button>
  )

  return (
    <div
      className={cn("w-80 rounded-lg border bg-popover text-popover-foreground shadow-lg", className)}
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          e.stopPropagation()
          onClose?.()
        }
      }}
    >
      <div className="flex items-center gap-2 border-b px-2.5 py-2">
        <Search className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Cari simbol (mis. akar, alpha, sudut)…"
          className="h-6 w-full bg-transparent text-xs outline-none placeholder:text-muted-foreground"
        />
        {onClose && (
          <button
            type="button"
            aria-label="Tutup"
            onClick={onClose}
            className="rounded p-0.5 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {!q && (
        <div className="flex flex-wrap gap-1 border-b px-2 py-1.5">
          {SYMBOL_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setCategory(cat.id)}
              className={cn(
                "rounded-md px-2 py-0.5 text-[11px] font-medium transition-colors",
                category === cat.id
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      )}

      <div className="max-h-64 overflow-y-auto p-2">
        {!q && recent.length > 0 && (
          <>
            <p className="mb-1 px-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">Terakhir</p>
            <div className="mb-2 grid grid-cols-8 gap-0.5">{recent.map(renderButton)}</div>
          </>
        )}
        {symbols.length > 0 ? (
          <div className="grid grid-cols-8 gap-0.5">{symbols.map(renderButton)}</div>
        ) : (
          <p className="py-6 text-center text-xs text-muted-foreground">Simbol tidak ditemukan</p>
        )}
      </div>
    </div>
  )
}

import { useTheme } from "@/lib/theme-context";
import type { ColorFormat, TailwindVersion } from "@/types/theme";
import { cn } from "@/lib/utils";

const formats: { id: ColorFormat; label: string; description: string }[] = [
  { id: "oklch", label: "OKLCH", description: "Modern perceptual" },
  { id: "hsl", label: "HSL", description: "Hue / Saturation / Lightness" },
  { id: "rgb", label: "RGB", description: "Red / Green / Blue" },
  { id: "hex", label: "HEX", description: "Hexadecimal" },
];

const versions: { id: TailwindVersion; label: string; description: string }[] = [
  { id: "v4", label: "Tailwind v4", description: "@theme inline + OKLCH" },
  { id: "v3", label: "Tailwind v3", description: "@tailwind + raw HSL" },
];

export function ThemeColorFormat() {
  const { colorFormat, setColorFormat, tailwindVersion, setTailwindVersion } = useTheme();

  return (
    <div className="space-y-4">
      {/* Tailwind Version Toggle */}
      <div className="space-y-2.5">
        <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
          Tailwind Version
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {versions.map((ver) => (
            <button
              key={ver.id}
              onClick={() => setTailwindVersion(ver.id)}
              className={cn(
                "flex flex-col items-start rounded-lg border px-3 py-2.5 text-left transition-all duration-200",
                tailwindVersion === ver.id
                  ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                  : "border-border hover:border-primary/40 hover:bg-muted/50"
              )}
            >
              <span
                className={cn(
                  "text-xs font-semibold",
                  tailwindVersion === ver.id ? "text-primary" : "text-foreground"
                )}
              >
                {ver.label}
              </span>
              <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                {ver.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Color Format - only shown for v4 */}
      {tailwindVersion === "v4" && (
        <div className="space-y-2.5">
          <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
            Color Format
          </h4>
          <div className="grid grid-cols-2 gap-2">
            {formats.map((fmt) => (
              <button
                key={fmt.id}
                onClick={() => setColorFormat(fmt.id)}
                className={cn(
                  "flex flex-col items-start rounded-lg border px-3 py-2 text-left transition-all duration-200",
                  colorFormat === fmt.id
                    ? "border-primary bg-primary/5 ring-1 ring-primary/20"
                    : "border-border hover:border-primary/40 hover:bg-muted/50"
                )}
              >
                <span
                  className={cn(
                    "text-xs font-semibold",
                    colorFormat === fmt.id ? "text-primary" : "text-foreground"
                  )}
                >
                  {fmt.label}
                </span>
                <span className="text-[10px] text-muted-foreground leading-tight mt-0.5">
                  {fmt.description}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {tailwindVersion === "v3" && (
        <p className="text-[10px] text-muted-foreground leading-relaxed bg-muted/50 rounded-md px-3 py-2">
          Tailwind v3 uses raw HSL values without wrapper (e.g. <code className="font-mono text-foreground">222.2 47.4% 11.2%</code>). 
          Used with <code className="font-mono text-foreground">hsl(var(--primary))</code> in tailwind.config.js.
        </p>
      )}
    </div>
  );
}

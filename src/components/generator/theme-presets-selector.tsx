import { useTheme } from "@/lib/theme-context";
import { presets } from "@/lib/theme-presets";
import type { PresetName } from "@/types/theme";
import { cn } from "@/lib/utils";

const presetNames: PresetName[] = [
  "default",
  "neutral",
  "blue",
  "green",
  "orange",
  "rose",
  "violet",
];

const presetColors: Record<PresetName, string> = {
  default: "oklch(0.205 0 0)",
  neutral: "oklch(0.371 0 0)",
  blue: "oklch(0.488 0.243 264.376)",
  green: "oklch(0.527 0.154 150.069)",
  orange: "oklch(0.646 0.222 41.116)",
  rose: "oklch(0.645 0.246 16.439)",
  violet: "oklch(0.541 0.281 293.009)",
};

export function ThemePresetsSelector() {
  const { config, applyPreset } = useTheme();

  const currentPreset = presetNames.find(
    (name) => presets[name]?.light.primary === config.light.primary
  );

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Presets
      </h4>
      <div className="grid grid-cols-4 gap-2">
        {presetNames.map((name) => (
          <button
            key={name}
            onClick={() => applyPreset(name)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-2 text-xs capitalize transition-colors hover:bg-accent",
              currentPreset === name &&
                "border-primary bg-primary/5 text-primary"
            )}
          >
            <div
              className="h-5 w-5 rounded-full border"
              style={{ background: presetColors[name] }}
            />
            <span className="text-[10px]">{name}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

import { useTheme } from "@/lib/theme-context";
import { shadowPresets } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

const shadowPresetNames = Object.keys(shadowPresets);

export function ThemeShadows() {
  const { config, updateShadowPreset } = useTheme();

  const currentPreset = shadowPresetNames.find(
    (name) => shadowPresets[name]?.default === config.shadows.default
  );

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Shadows
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {shadowPresetNames.map((name) => (
          <button
            key={name}
            onClick={() => updateShadowPreset(name)}
            className={cn(
              "rounded-lg border px-3 py-2 text-xs capitalize transition-colors hover:bg-accent text-left",
              currentPreset === name &&
                "border-primary bg-primary/5 text-primary"
            )}
          >
            <div
              className="mb-1 h-4 w-full rounded bg-background"
              style={{
                boxShadow: shadowPresets[name]?.md ?? "none",
              }}
            />
            {name}
          </button>
        ))}
      </div>
    </div>
  );
}

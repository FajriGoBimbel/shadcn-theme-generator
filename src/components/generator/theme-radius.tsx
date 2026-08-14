import { useTheme } from "@/lib/theme-context";
import { radiusOptions } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

export function ThemeRadius() {
  const { config, updateRadius } = useTheme();

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Border Radius
      </h4>
      <div className="grid grid-cols-5 gap-2">
        {radiusOptions.map((option) => (
          <button
            key={option.value}
            onClick={() => updateRadius(option.value)}
            className={cn(
              "flex flex-col items-center gap-1 rounded-lg border p-2 text-xs transition-colors hover:bg-accent",
              config.radius === option.value &&
                "border-primary bg-primary/5 text-primary"
            )}
          >
            <div
              className="h-6 w-6 border-2 border-current"
              style={{ borderRadius: option.value }}
            />
            <span className="text-[10px]">{option.label}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground font-mono">
        --radius: {config.radius}
      </p>
    </div>
  );
}

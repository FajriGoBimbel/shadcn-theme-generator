import { useTheme } from "@/lib/theme-context";
import {
  fontSansOptions,
  fontSerifOptions,
  fontMonoOptions,
} from "@/lib/theme-presets";
import { cn } from "@/lib/utils";

export function ThemeTypography() {
  const { config, updateFontSans, updateFontSerif, updateFontMono } =
    useTheme();

  return (
    <div className="space-y-4">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Typography
      </h4>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Font Sans</label>
        <div className="grid grid-cols-3 gap-1.5">
          {fontSansOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFontSans(option.value)}
              className={cn(
                "rounded-md border px-2 py-1.5 text-[11px] transition-colors hover:bg-accent text-left truncate",
                config.fontSans === option.value &&
                  "border-primary bg-primary/5 text-primary font-medium"
              )}
              title={option.label}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Font Serif</label>
        <div className="grid grid-cols-2 gap-1.5">
          {fontSerifOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFontSerif(option.value)}
              className={cn(
                "rounded-md border px-2 py-1.5 text-[11px] transition-colors hover:bg-accent text-left truncate",
                config.fontSerif === option.value &&
                  "border-primary bg-primary/5 text-primary font-medium"
              )}
              title={option.label}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-xs text-muted-foreground">Font Mono</label>
        <div className="grid grid-cols-2 gap-1.5">
          {fontMonoOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => updateFontMono(option.value)}
              className={cn(
                "rounded-md border px-2 py-1.5 text-[11px] transition-colors hover:bg-accent text-left truncate",
                config.fontMono === option.value &&
                  "border-primary bg-primary/5 text-primary font-medium"
              )}
              title={option.label}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useRef } from "react";
import { useTheme } from "@/lib/theme-context";
import { getColorGroups } from "@/lib/theme";
import type { ThemeColors as ThemeColorsType } from "@/types/theme";
import { Input } from "@/components/ui/input";
import { hexToOklch, oklchToHex } from "@/lib/color-utils";

function ColorSwatch({
  color,
  label,
  onChange,
}: {
  color: string;
  label: string;
  onChange: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const hexValue = oklchToHex(color);

  const handlePickerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const oklch = hexToOklch(e.target.value);
    onChange(oklch);
  };

  return (
    <div className="relative">
      <button
        type="button"
        className="h-7 w-7 rounded-md border border-border cursor-pointer hover:ring-2 hover:ring-ring/50 transition-shadow"
        style={{ background: color }}
        title={`Pick color for ${label}`}
        onClick={() => inputRef.current?.click()}
      />
      <input
        ref={inputRef}
        type="color"
        value={hexValue}
        onChange={handlePickerChange}
        className="sr-only"
        tabIndex={-1}
        aria-label={`Color picker for ${label}`}
      />
    </div>
  );
}

export function ThemeColors() {
  const { config, previewMode, updateLightColor, updateDarkColor } = useTheme();
  const groups = getColorGroups();

  const colors: ThemeColorsType =
    previewMode === "light" ? config.light : config.dark;
  const updateColor =
    previewMode === "light" ? updateLightColor : updateDarkColor;

  return (
    <div className="space-y-5">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Colors ({previewMode} mode)
      </h4>
      {groups.map(({ group, variables }) => (
        <div key={group} className="space-y-2">
          <p className="text-[11px] font-medium text-muted-foreground/70 uppercase tracking-wider">
            {group}
          </p>
          <div className="space-y-1.5">
            {variables.map((v) => (
              <div key={v.key} className="flex items-center gap-2">
                <ColorSwatch
                  color={colors[v.key]}
                  label={v.label}
                  onChange={(value) => updateColor(v.key, value)}
                />
                <label className="text-[11px] min-w-[80px] text-muted-foreground shrink-0 truncate">
                  {v.label}
                </label>
                <Input
                  className="h-7 text-[11px] font-mono px-2"
                  value={colors[v.key]}
                  onChange={(e) => updateColor(v.key, e.target.value)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

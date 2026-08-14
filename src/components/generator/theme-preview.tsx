import { useTheme } from "@/lib/theme-context";
import { themeColorsToStyleVars } from "@/lib/theme";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ButtonPreview } from "@/components/preview/button-preview";
import { CardPreview } from "@/components/preview/card-preview";
import { InputPreview } from "@/components/preview/input-preview";
import { BadgePreview } from "@/components/preview/badge-preview";
import { AlertPreview } from "@/components/preview/alert-preview";
import { TabsPreview } from "@/components/preview/tabs-preview";
import { TablePreview } from "@/components/preview/table-preview";

export function ThemePreview() {
  const { config, previewMode } = useTheme();

  const colors = previewMode === "light" ? config.light : config.dark;
  const styleVars = themeColorsToStyleVars(colors);

  return (
    <div
      className="h-full"
      style={
        {
          ...styleVars,
          "--radius": config.radius,
          "--font-sans": config.fontSans,
        } as React.CSSProperties
      }
    >
      <div
        className="h-full rounded-lg"
        style={{
          backgroundColor: colors.background,
          color: colors.foreground,
        }}
      >
        <ScrollArea className="h-full">
          <div className="space-y-8 p-6">
            <div>
              <h2 className="text-lg font-semibold mb-1">Live Preview</h2>
              <p className="text-sm" style={{ color: colors.mutedForeground }}>
                Components update in real-time as you customize the theme.
              </p>
            </div>

            <ButtonPreview />
            <CardPreview />
            <InputPreview />
            <BadgePreview />
            <AlertPreview />
            <TabsPreview />
            <TablePreview />
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}

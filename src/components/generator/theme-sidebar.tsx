import { RotateCcw, Dices, X } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThemeGallery } from "./theme-gallery";
import { ThemePresetsSelector } from "./theme-presets-selector";
import { ThemeColors } from "./theme-colors";
import { ThemeRadius } from "./theme-radius";
import { ThemeTypography } from "./theme-typography";
import { ThemeShadows } from "./theme-shadows";
import { ThemeModeToggle } from "./theme-mode-toggle";
import { ThemeColorFormat } from "./theme-color-format";
import { GeneratedCSS } from "./generated-css";

interface ThemeSidebarProps {
  onClose: () => void;
}

export function ThemeSidebar({ onClose }: ThemeSidebarProps) {
  const { resetTheme, randomizeTheme } = useTheme();

  return (
    <div className="flex h-full flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <h2 className="text-sm font-semibold">Theme Generator</h2>
        <div className="flex items-center gap-1">
          <ThemeModeToggle />
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={randomizeTheme}
            title="Random Theme"
          >
            <Dices className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={resetTheme}
            title="Reset Theme"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={onClose}
            title="Close"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Random button prominent */}
      <div className="px-4 py-3 border-b">
        <Button
          onClick={randomizeTheme}
          className="w-full gap-2"
          variant="outline"
        >
          <Dices className="h-4 w-4" />
          Generate Random Theme
        </Button>
      </div>

      {/* Scrollable content */}
      <ScrollArea className="flex-1">
        <div className="space-y-6 p-4">
          <ThemeGallery />
          <Separator />
          <ThemePresetsSelector />
          <Separator />
          <ThemeRadius />
          <Separator />
          <ThemeTypography />
          <Separator />
          <ThemeShadows />
          <Separator />
          <ThemeColors />
          <Separator />
          <ThemeColorFormat />
          <Separator />
          <GeneratedCSS />
        </div>
      </ScrollArea>
    </div>
  );
}

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme-context";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function ThemeModeToggle() {
  const { previewMode, setPreviewMode } = useTheme();

  return (
    <div className="flex items-center gap-1 rounded-lg border p-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setPreviewMode("light")}
        className={cn(
          "h-7 gap-1.5 px-2.5 text-xs",
          previewMode === "light" && "bg-accent"
        )}
      >
        <Sun className="h-3.5 w-3.5" />
        Light
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setPreviewMode("dark")}
        className={cn(
          "h-7 gap-1.5 px-2.5 text-xs",
          previewMode === "dark" && "bg-accent"
        )}
      >
        <Moon className="h-3.5 w-3.5" />
        Dark
      </Button>
    </div>
  );
}

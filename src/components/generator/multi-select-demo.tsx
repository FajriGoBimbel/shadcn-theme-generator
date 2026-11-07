import { useState } from "react";
import {
  Sparkles,
  Palette,
  Code2,
  Zap,
  Layers,
  Boxes,
  Rocket,
  Wrench,
} from "lucide-react";
import { MultiSelect, type MultiSelectOption } from "@/components/multiselect/multi-select";
import { Badge } from "@/components/ui/badge";

const FRAMEWORK_OPTIONS: MultiSelectOption[] = [
  { value: "react", label: "React", group: "Frameworks", icon: Boxes },
  { value: "vue", label: "Vue", group: "Frameworks", icon: Boxes },
  { value: "svelte", label: "Svelte", group: "Frameworks", icon: Boxes },
  { value: "solid", label: "SolidJS", group: "Frameworks", icon: Boxes },
  { value: "tailwind", label: "Tailwind CSS", group: "Styling", icon: Palette },
  { value: "shadcn", label: "shadcn/ui", group: "Styling", icon: Sparkles },
  { value: "sass", label: "Sass", group: "Styling", icon: Palette },
  { value: "vite", label: "Vite", group: "Tooling", icon: Zap },
  { value: "webpack", label: "Webpack", group: "Tooling", icon: Wrench },
  { value: "turbopack", label: "Turbopack", group: "Tooling", icon: Rocket, disabled: true },
  { value: "typescript", label: "TypeScript", group: "Languages", icon: Code2 },
  { value: "rust", label: "Rust", group: "Languages", icon: Code2 },
];

export function MultiSelectDemo() {
  const [stack, setStack] = useState<string[]>(["react", "tailwind", "shadcn"]);
  const [limited, setLimited] = useState<string[]>([]);

  return (
    <div className="space-y-6">
      {/* Primary demo — grouped + icons */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Layers className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Pick your stack</span>
          <Badge variant="outline" className="ml-auto font-normal text-[10px]">
            grouped · searchable
          </Badge>
        </div>
        <MultiSelect
          options={FRAMEWORK_OPTIONS}
          value={stack}
          onChange={setStack}
          placeholder="Choose frameworks, tools, languages..."
          searchPlaceholder="Search technologies..."
        />
        <div className="min-h-5 text-xs text-muted-foreground">
          {stack.length > 0 ? (
            <span>
              Selected:{" "}
              <span className="font-mono text-foreground">
                [{stack.map((s) => `"${s}"`).join(", ")}]
              </span>
            </span>
          ) : (
            <span>Nothing selected yet.</span>
          )}
        </div>
      </div>

      {/* Secondary demo — max selection limit */}
      <div className="space-y-2.5">
        <div className="flex items-center gap-2">
          <Zap className="h-4 w-4 text-primary" />
          <span className="text-sm font-medium">Limit to 2 (max selection)</span>
          <Badge variant="outline" className="ml-auto font-normal text-[10px]">
            maxSelected
          </Badge>
        </div>
        <MultiSelect
          options={FRAMEWORK_OPTIONS.filter((o) => o.group === "Frameworks")}
          value={limited}
          onChange={setLimited}
          maxSelected={2}
          showToolbar={false}
          placeholder="Pick up to 2 frameworks..."
        />
        <div className="min-h-5 text-xs text-muted-foreground">
          {limited.length >= 2
            ? "Limit reached — remaining options are disabled until you remove one."
            : `${2 - limited.length} more allowed.`}
        </div>
      </div>
    </div>
  );
}

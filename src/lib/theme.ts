import type { ThemeColors, ColorVariable } from "@/types/theme";

export const colorVariables: ColorVariable[] = [
  // Base
  { key: "background", label: "Background", group: "Base" },
  { key: "foreground", label: "Foreground", group: "Base" },

  // Card
  { key: "card", label: "Card", group: "Card" },
  { key: "cardForeground", label: "Card Foreground", group: "Card" },

  // Popover
  { key: "popover", label: "Popover", group: "Popover" },
  { key: "popoverForeground", label: "Popover Foreground", group: "Popover" },

  // Primary
  { key: "primary", label: "Primary", group: "Primary" },
  { key: "primaryForeground", label: "Primary Foreground", group: "Primary" },

  // Secondary
  { key: "secondary", label: "Secondary", group: "Secondary" },
  { key: "secondaryForeground", label: "Secondary Foreground", group: "Secondary" },

  // Muted
  { key: "muted", label: "Muted", group: "Muted" },
  { key: "mutedForeground", label: "Muted Foreground", group: "Muted" },

  // Accent
  { key: "accent", label: "Accent", group: "Accent" },
  { key: "accentForeground", label: "Accent Foreground", group: "Accent" },

  // Destructive
  { key: "destructive", label: "Destructive", group: "Destructive" },

  // Borders
  { key: "border", label: "Border", group: "Borders" },
  { key: "input", label: "Input", group: "Borders" },
  { key: "ring", label: "Ring", group: "Borders" },

  // Charts
  { key: "chart1", label: "Chart 1", group: "Charts" },
  { key: "chart2", label: "Chart 2", group: "Charts" },
  { key: "chart3", label: "Chart 3", group: "Charts" },
  { key: "chart4", label: "Chart 4", group: "Charts" },
  { key: "chart5", label: "Chart 5", group: "Charts" },

  // Sidebar
  { key: "sidebar", label: "Sidebar", group: "Sidebar" },
  { key: "sidebarForeground", label: "Sidebar Foreground", group: "Sidebar" },
  { key: "sidebarPrimary", label: "Sidebar Primary", group: "Sidebar" },
  { key: "sidebarPrimaryForeground", label: "Sidebar Primary FG", group: "Sidebar" },
  { key: "sidebarAccent", label: "Sidebar Accent", group: "Sidebar" },
  { key: "sidebarAccentForeground", label: "Sidebar Accent FG", group: "Sidebar" },
  { key: "sidebarBorder", label: "Sidebar Border", group: "Sidebar" },
  { key: "sidebarRing", label: "Sidebar Ring", group: "Sidebar" },
];

export function getColorGroups(): { group: string; variables: ColorVariable[] }[] {
  const groups: Map<string, ColorVariable[]> = new Map();

  for (const v of colorVariables) {
    const existing = groups.get(v.group) ?? [];
    existing.push(v);
    groups.set(v.group, existing);
  }

  return Array.from(groups.entries()).map(([group, variables]) => ({
    group,
    variables,
  }));
}

export function themeColorsToStyleVars(
  colors: ThemeColors
): Record<string, string> {
  return {
    "--background": colors.background,
    "--foreground": colors.foreground,
    "--card": colors.card,
    "--card-foreground": colors.cardForeground,
    "--popover": colors.popover,
    "--popover-foreground": colors.popoverForeground,
    "--primary": colors.primary,
    "--primary-foreground": colors.primaryForeground,
    "--secondary": colors.secondary,
    "--secondary-foreground": colors.secondaryForeground,
    "--muted": colors.muted,
    "--muted-foreground": colors.mutedForeground,
    "--accent": colors.accent,
    "--accent-foreground": colors.accentForeground,
    "--destructive": colors.destructive,
    "--border": colors.border,
    "--input": colors.input,
    "--ring": colors.ring,
    "--chart-1": colors.chart1,
    "--chart-2": colors.chart2,
    "--chart-3": colors.chart3,
    "--chart-4": colors.chart4,
    "--chart-5": colors.chart5,
    "--sidebar": colors.sidebar,
    "--sidebar-foreground": colors.sidebarForeground,
    "--sidebar-primary": colors.sidebarPrimary,
    "--sidebar-primary-foreground": colors.sidebarPrimaryForeground,
    "--sidebar-accent": colors.sidebarAccent,
    "--sidebar-accent-foreground": colors.sidebarAccentForeground,
    "--sidebar-border": colors.sidebarBorder,
    "--sidebar-ring": colors.sidebarRing,
  };
}

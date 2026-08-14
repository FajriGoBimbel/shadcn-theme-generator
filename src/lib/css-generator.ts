import type { ThemeConfig, ThemeColors } from "@/types/theme";

function colorsToCSS(colors: ThemeColors, indent: string = "  "): string {
  const lines: string[] = [];

  lines.push(`${indent}--background: ${colors.background};`);
  lines.push(`${indent}--foreground: ${colors.foreground};`);
  lines.push("");
  lines.push(`${indent}--card: ${colors.card};`);
  lines.push(`${indent}--card-foreground: ${colors.cardForeground};`);
  lines.push("");
  lines.push(`${indent}--popover: ${colors.popover};`);
  lines.push(`${indent}--popover-foreground: ${colors.popoverForeground};`);
  lines.push("");
  lines.push(`${indent}--primary: ${colors.primary};`);
  lines.push(`${indent}--primary-foreground: ${colors.primaryForeground};`);
  lines.push("");
  lines.push(`${indent}--secondary: ${colors.secondary};`);
  lines.push(`${indent}--secondary-foreground: ${colors.secondaryForeground};`);
  lines.push("");
  lines.push(`${indent}--muted: ${colors.muted};`);
  lines.push(`${indent}--muted-foreground: ${colors.mutedForeground};`);
  lines.push("");
  lines.push(`${indent}--accent: ${colors.accent};`);
  lines.push(`${indent}--accent-foreground: ${colors.accentForeground};`);
  lines.push("");
  lines.push(`${indent}--destructive: ${colors.destructive};`);
  lines.push("");
  lines.push(`${indent}--border: ${colors.border};`);
  lines.push(`${indent}--input: ${colors.input};`);
  lines.push(`${indent}--ring: ${colors.ring};`);
  lines.push("");
  lines.push(`${indent}--chart-1: ${colors.chart1};`);
  lines.push(`${indent}--chart-2: ${colors.chart2};`);
  lines.push(`${indent}--chart-3: ${colors.chart3};`);
  lines.push(`${indent}--chart-4: ${colors.chart4};`);
  lines.push(`${indent}--chart-5: ${colors.chart5};`);
  lines.push("");
  lines.push(`${indent}--sidebar: ${colors.sidebar};`);
  lines.push(`${indent}--sidebar-foreground: ${colors.sidebarForeground};`);
  lines.push(`${indent}--sidebar-primary: ${colors.sidebarPrimary};`);
  lines.push(`${indent}--sidebar-primary-foreground: ${colors.sidebarPrimaryForeground};`);
  lines.push(`${indent}--sidebar-accent: ${colors.sidebarAccent};`);
  lines.push(`${indent}--sidebar-accent-foreground: ${colors.sidebarAccentForeground};`);
  lines.push(`${indent}--sidebar-border: ${colors.sidebarBorder};`);
  lines.push(`${indent}--sidebar-ring: ${colors.sidebarRing};`);

  return lines.join("\n");
}

export function generateCSS(config: ThemeConfig): string {
  const css = `@import "tailwindcss";

@custom-variant dark (&:is(.dark *));

:root {
${colorsToCSS(config.light)}

  --radius: ${config.radius};

  --font-sans: ${config.fontSans};
  --font-serif: ${config.fontSerif};
  --font-mono: ${config.fontMono};

  --shadow-2xs: ${config.shadows["2xs"]};
  --shadow-xs: ${config.shadows.xs};
  --shadow-sm: ${config.shadows.sm};
  --shadow: ${config.shadows.default};
  --shadow-md: ${config.shadows.md};
  --shadow-lg: ${config.shadows.lg};
  --shadow-xl: ${config.shadows.xl};
  --shadow-2xl: ${config.shadows["2xl"]};
}

.dark {
${colorsToCSS(config.dark)}
}

@theme inline {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);

  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}

@layer base {
  * {
    @apply border-border outline-ring/50;
  }

  body {
    @apply bg-background text-foreground;
  }

  html {
    @apply font-sans;
  }
}
`;

  return css;
}

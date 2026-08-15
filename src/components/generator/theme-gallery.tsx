import { useTheme } from "@/lib/theme-context";
import type { ThemeConfig } from "@/types/theme";
import { defaultThemeConfig } from "@/lib/theme-presets";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

interface CuratedTheme {
  name: string;
  description: string;
  config: ThemeConfig;
  preview: {
    bg: string;
    primary: string;
    secondary: string;
    accent: string;
  };
}

const curatedThemes: CuratedTheme[] = [
  {
    name: "Midnight",
    description: "Dark elegant theme with deep blues",
    config: {
      ...defaultThemeConfig,
      radius: "0.625rem",
      light: {
        background: "oklch(0.985 0.002 250)",
        foreground: "oklch(0.15 0.02 250)",
        card: "oklch(0.99 0.001 250)",
        cardForeground: "oklch(0.15 0.02 250)",
        popover: "oklch(0.99 0.001 250)",
        popoverForeground: "oklch(0.15 0.02 250)",
        primary: "oklch(0.35 0.15 260)",
        primaryForeground: "oklch(0.98 0 0)",
        secondary: "oklch(0.94 0.01 250)",
        secondaryForeground: "oklch(0.2 0.02 250)",
        muted: "oklch(0.94 0.008 250)",
        mutedForeground: "oklch(0.5 0.02 250)",
        accent: "oklch(0.92 0.02 250)",
        accentForeground: "oklch(0.2 0.02 250)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.9 0.01 250)",
        input: "oklch(0.9 0.01 250)",
        ring: "oklch(0.35 0.15 260)",
        chart1: "oklch(0.5 0.2 260)",
        chart2: "oklch(0.6 0.15 200)",
        chart3: "oklch(0.45 0.1 280)",
        chart4: "oklch(0.7 0.12 220)",
        chart5: "oklch(0.55 0.18 240)",
        sidebar: "oklch(0.97 0.005 250)",
        sidebarForeground: "oklch(0.15 0.02 250)",
        sidebarPrimary: "oklch(0.35 0.15 260)",
        sidebarPrimaryForeground: "oklch(0.98 0 0)",
        sidebarAccent: "oklch(0.92 0.015 250)",
        sidebarAccentForeground: "oklch(0.2 0.02 250)",
        sidebarBorder: "oklch(0.9 0.01 250)",
        sidebarRing: "oklch(0.35 0.15 260)",
      },
      dark: {
        background: "oklch(0.14 0.02 255)",
        foreground: "oklch(0.95 0.005 250)",
        card: "oklch(0.17 0.025 255)",
        cardForeground: "oklch(0.95 0.005 250)",
        popover: "oklch(0.17 0.025 255)",
        popoverForeground: "oklch(0.95 0.005 250)",
        primary: "oklch(0.6 0.2 260)",
        primaryForeground: "oklch(0.12 0.02 255)",
        secondary: "oklch(0.24 0.03 255)",
        secondaryForeground: "oklch(0.95 0.005 250)",
        muted: "oklch(0.24 0.025 255)",
        mutedForeground: "oklch(0.65 0.02 250)",
        accent: "oklch(0.26 0.035 255)",
        accentForeground: "oklch(0.95 0.005 250)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.28 0.03 255)",
        input: "oklch(0.28 0.03 255)",
        ring: "oklch(0.6 0.2 260)",
        chart1: "oklch(0.6 0.22 260)",
        chart2: "oklch(0.65 0.15 200)",
        chart3: "oklch(0.7 0.13 170)",
        chart4: "oklch(0.55 0.2 290)",
        chart5: "oklch(0.6 0.18 230)",
        sidebar: "oklch(0.14 0.02 255)",
        sidebarForeground: "oklch(0.95 0.005 250)",
        sidebarPrimary: "oklch(0.6 0.2 260)",
        sidebarPrimaryForeground: "oklch(0.95 0 0)",
        sidebarAccent: "oklch(0.24 0.03 255)",
        sidebarAccentForeground: "oklch(0.95 0.005 250)",
        sidebarBorder: "oklch(0.28 0.03 255)",
        sidebarRing: "oklch(0.6 0.2 260)",
      },
    },
    preview: { bg: "oklch(0.14 0.02 255)", primary: "oklch(0.6 0.2 260)", secondary: "oklch(0.24 0.03 255)", accent: "oklch(0.5 0.2 260)" },
  },
  {
    name: "Sunset",
    description: "Warm gradient tones with orange and coral",
    config: {
      ...defaultThemeConfig,
      radius: "0.75rem",
      light: {
        background: "oklch(0.99 0.005 50)",
        foreground: "oklch(0.18 0.03 30)",
        card: "oklch(0.995 0.003 50)",
        cardForeground: "oklch(0.18 0.03 30)",
        popover: "oklch(0.995 0.003 50)",
        popoverForeground: "oklch(0.18 0.03 30)",
        primary: "oklch(0.62 0.24 35)",
        primaryForeground: "oklch(0.99 0 0)",
        secondary: "oklch(0.95 0.02 50)",
        secondaryForeground: "oklch(0.25 0.03 30)",
        muted: "oklch(0.95 0.015 50)",
        mutedForeground: "oklch(0.5 0.03 30)",
        accent: "oklch(0.93 0.04 50)",
        accentForeground: "oklch(0.25 0.03 30)",
        destructive: "oklch(0.55 0.25 20)",
        border: "oklch(0.91 0.015 50)",
        input: "oklch(0.91 0.015 50)",
        ring: "oklch(0.62 0.24 35)",
        chart1: "oklch(0.62 0.24 35)",
        chart2: "oklch(0.7 0.18 60)",
        chart3: "oklch(0.55 0.15 15)",
        chart4: "oklch(0.75 0.15 80)",
        chart5: "oklch(0.6 0.2 350)",
        sidebar: "oklch(0.97 0.008 50)",
        sidebarForeground: "oklch(0.18 0.03 30)",
        sidebarPrimary: "oklch(0.62 0.24 35)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
        sidebarAccent: "oklch(0.93 0.03 50)",
        sidebarAccentForeground: "oklch(0.25 0.03 30)",
        sidebarBorder: "oklch(0.91 0.015 50)",
        sidebarRing: "oklch(0.62 0.24 35)",
      },
      dark: {
        background: "oklch(0.15 0.025 30)",
        foreground: "oklch(0.95 0.008 50)",
        card: "oklch(0.18 0.03 30)",
        cardForeground: "oklch(0.95 0.008 50)",
        popover: "oklch(0.18 0.03 30)",
        popoverForeground: "oklch(0.95 0.008 50)",
        primary: "oklch(0.72 0.2 40)",
        primaryForeground: "oklch(0.13 0.025 30)",
        secondary: "oklch(0.25 0.035 30)",
        secondaryForeground: "oklch(0.95 0.008 50)",
        muted: "oklch(0.25 0.03 30)",
        mutedForeground: "oklch(0.65 0.025 40)",
        accent: "oklch(0.27 0.04 35)",
        accentForeground: "oklch(0.95 0.008 50)",
        destructive: "oklch(0.55 0.25 20)",
        border: "oklch(0.28 0.035 30)",
        input: "oklch(0.28 0.035 30)",
        ring: "oklch(0.72 0.2 40)",
        chart1: "oklch(0.72 0.22 40)",
        chart2: "oklch(0.65 0.18 60)",
        chart3: "oklch(0.6 0.15 15)",
        chart4: "oklch(0.7 0.16 80)",
        chart5: "oklch(0.65 0.2 350)",
        sidebar: "oklch(0.15 0.025 30)",
        sidebarForeground: "oklch(0.95 0.008 50)",
        sidebarPrimary: "oklch(0.72 0.2 40)",
        sidebarPrimaryForeground: "oklch(0.95 0 0)",
        sidebarAccent: "oklch(0.25 0.035 30)",
        sidebarAccentForeground: "oklch(0.95 0.008 50)",
        sidebarBorder: "oklch(0.28 0.035 30)",
        sidebarRing: "oklch(0.72 0.2 40)",
      },
    },
    preview: { bg: "oklch(0.99 0.005 50)", primary: "oklch(0.62 0.24 35)", secondary: "oklch(0.95 0.02 50)", accent: "oklch(0.7 0.18 60)" },
  },
  {
    name: "Forest",
    description: "Natural greens with earthy accents",
    config: {
      ...defaultThemeConfig,
      radius: "0.5rem",
      light: {
        background: "oklch(0.985 0.005 140)",
        foreground: "oklch(0.16 0.03 145)",
        card: "oklch(0.99 0.003 140)",
        cardForeground: "oklch(0.16 0.03 145)",
        popover: "oklch(0.99 0.003 140)",
        popoverForeground: "oklch(0.16 0.03 145)",
        primary: "oklch(0.45 0.14 155)",
        primaryForeground: "oklch(0.98 0 0)",
        secondary: "oklch(0.94 0.015 140)",
        secondaryForeground: "oklch(0.2 0.03 145)",
        muted: "oklch(0.94 0.012 140)",
        mutedForeground: "oklch(0.5 0.025 145)",
        accent: "oklch(0.92 0.025 140)",
        accentForeground: "oklch(0.2 0.03 145)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.9 0.012 140)",
        input: "oklch(0.9 0.012 140)",
        ring: "oklch(0.45 0.14 155)",
        chart1: "oklch(0.5 0.15 155)",
        chart2: "oklch(0.6 0.12 120)",
        chart3: "oklch(0.55 0.1 85)",
        chart4: "oklch(0.65 0.13 170)",
        chart5: "oklch(0.5 0.08 100)",
        sidebar: "oklch(0.97 0.008 140)",
        sidebarForeground: "oklch(0.16 0.03 145)",
        sidebarPrimary: "oklch(0.45 0.14 155)",
        sidebarPrimaryForeground: "oklch(0.98 0 0)",
        sidebarAccent: "oklch(0.92 0.02 140)",
        sidebarAccentForeground: "oklch(0.2 0.03 145)",
        sidebarBorder: "oklch(0.9 0.012 140)",
        sidebarRing: "oklch(0.45 0.14 155)",
      },
      dark: {
        background: "oklch(0.14 0.025 150)",
        foreground: "oklch(0.94 0.008 140)",
        card: "oklch(0.17 0.03 150)",
        cardForeground: "oklch(0.94 0.008 140)",
        popover: "oklch(0.17 0.03 150)",
        popoverForeground: "oklch(0.94 0.008 140)",
        primary: "oklch(0.65 0.16 155)",
        primaryForeground: "oklch(0.13 0.025 150)",
        secondary: "oklch(0.24 0.03 150)",
        secondaryForeground: "oklch(0.94 0.008 140)",
        muted: "oklch(0.24 0.025 150)",
        mutedForeground: "oklch(0.6 0.02 145)",
        accent: "oklch(0.26 0.035 150)",
        accentForeground: "oklch(0.94 0.008 140)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.27 0.03 150)",
        input: "oklch(0.27 0.03 150)",
        ring: "oklch(0.65 0.16 155)",
        chart1: "oklch(0.65 0.17 155)",
        chart2: "oklch(0.6 0.13 120)",
        chart3: "oklch(0.7 0.12 85)",
        chart4: "oklch(0.55 0.15 170)",
        chart5: "oklch(0.6 0.1 100)",
        sidebar: "oklch(0.14 0.025 150)",
        sidebarForeground: "oklch(0.94 0.008 140)",
        sidebarPrimary: "oklch(0.65 0.16 155)",
        sidebarPrimaryForeground: "oklch(0.94 0 0)",
        sidebarAccent: "oklch(0.24 0.03 150)",
        sidebarAccentForeground: "oklch(0.94 0.008 140)",
        sidebarBorder: "oklch(0.27 0.03 150)",
        sidebarRing: "oklch(0.65 0.16 155)",
      },
    },
    preview: { bg: "oklch(0.985 0.005 140)", primary: "oklch(0.45 0.14 155)", secondary: "oklch(0.94 0.015 140)", accent: "oklch(0.6 0.12 120)" },
  },
  {
    name: "Candy",
    description: "Playful pink and purple tones",
    config: {
      ...defaultThemeConfig,
      radius: "1rem",
      light: {
        background: "oklch(0.99 0.005 320)",
        foreground: "oklch(0.18 0.03 310)",
        card: "oklch(0.995 0.003 320)",
        cardForeground: "oklch(0.18 0.03 310)",
        popover: "oklch(0.995 0.003 320)",
        popoverForeground: "oklch(0.18 0.03 310)",
        primary: "oklch(0.58 0.23 330)",
        primaryForeground: "oklch(0.99 0 0)",
        secondary: "oklch(0.95 0.02 310)",
        secondaryForeground: "oklch(0.25 0.03 310)",
        muted: "oklch(0.95 0.015 320)",
        mutedForeground: "oklch(0.5 0.025 310)",
        accent: "oklch(0.93 0.04 300)",
        accentForeground: "oklch(0.25 0.03 310)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.92 0.015 320)",
        input: "oklch(0.92 0.015 320)",
        ring: "oklch(0.58 0.23 330)",
        chart1: "oklch(0.58 0.23 330)",
        chart2: "oklch(0.55 0.2 290)",
        chart3: "oklch(0.65 0.18 350)",
        chart4: "oklch(0.7 0.15 270)",
        chart5: "oklch(0.6 0.22 310)",
        sidebar: "oklch(0.97 0.008 320)",
        sidebarForeground: "oklch(0.18 0.03 310)",
        sidebarPrimary: "oklch(0.58 0.23 330)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
        sidebarAccent: "oklch(0.93 0.03 310)",
        sidebarAccentForeground: "oklch(0.25 0.03 310)",
        sidebarBorder: "oklch(0.92 0.015 320)",
        sidebarRing: "oklch(0.58 0.23 330)",
      },
      dark: {
        background: "oklch(0.14 0.025 320)",
        foreground: "oklch(0.95 0.008 315)",
        card: "oklch(0.17 0.03 320)",
        cardForeground: "oklch(0.95 0.008 315)",
        popover: "oklch(0.17 0.03 320)",
        popoverForeground: "oklch(0.95 0.008 315)",
        primary: "oklch(0.7 0.2 330)",
        primaryForeground: "oklch(0.13 0.025 320)",
        secondary: "oklch(0.25 0.035 320)",
        secondaryForeground: "oklch(0.95 0.008 315)",
        muted: "oklch(0.25 0.03 320)",
        mutedForeground: "oklch(0.65 0.02 315)",
        accent: "oklch(0.27 0.04 310)",
        accentForeground: "oklch(0.95 0.008 315)",
        destructive: "oklch(0.55 0.24 25)",
        border: "oklch(0.28 0.035 320)",
        input: "oklch(0.28 0.035 320)",
        ring: "oklch(0.7 0.2 330)",
        chart1: "oklch(0.7 0.22 330)",
        chart2: "oklch(0.6 0.2 290)",
        chart3: "oklch(0.7 0.17 350)",
        chart4: "oklch(0.6 0.18 270)",
        chart5: "oklch(0.65 0.2 310)",
        sidebar: "oklch(0.14 0.025 320)",
        sidebarForeground: "oklch(0.95 0.008 315)",
        sidebarPrimary: "oklch(0.7 0.2 330)",
        sidebarPrimaryForeground: "oklch(0.95 0 0)",
        sidebarAccent: "oklch(0.25 0.035 320)",
        sidebarAccentForeground: "oklch(0.95 0.008 315)",
        sidebarBorder: "oklch(0.28 0.035 320)",
        sidebarRing: "oklch(0.7 0.2 330)",
      },
    },
    preview: { bg: "oklch(0.99 0.005 320)", primary: "oklch(0.58 0.23 330)", secondary: "oklch(0.95 0.02 310)", accent: "oklch(0.55 0.2 290)" },
  },
  {
    name: "Monochrome",
    description: "Clean black and white minimal",
    config: {
      ...defaultThemeConfig,
      radius: "0.25rem",
      light: defaultThemeConfig.light,
      dark: defaultThemeConfig.dark,
    },
    preview: { bg: "oklch(1 0 0)", primary: "oklch(0.205 0 0)", secondary: "oklch(0.97 0 0)", accent: "oklch(0.556 0 0)" },
  },
  {
    name: "Ocean",
    description: "Deep teal and aqua hues",
    config: {
      ...defaultThemeConfig,
      radius: "0.625rem",
      light: {
        ...defaultThemeConfig.light,
        primary: "oklch(0.5 0.15 195)",
        primaryForeground: "oklch(0.99 0 0)",
        ring: "oklch(0.5 0.15 195)",
        accent: "oklch(0.93 0.02 195)",
        accentForeground: "oklch(0.2 0.03 195)",
        chart1: "oklch(0.5 0.15 195)",
        chart2: "oklch(0.6 0.12 220)",
        chart3: "oklch(0.45 0.1 175)",
        chart4: "oklch(0.7 0.1 200)",
        chart5: "oklch(0.55 0.13 210)",
        sidebarPrimary: "oklch(0.5 0.15 195)",
        sidebarPrimaryForeground: "oklch(0.99 0 0)",
        sidebarRing: "oklch(0.5 0.15 195)",
      },
      dark: {
        ...defaultThemeConfig.dark,
        primary: "oklch(0.65 0.14 195)",
        primaryForeground: "oklch(0.13 0.02 195)",
        ring: "oklch(0.65 0.14 195)",
        accent: "oklch(0.26 0.03 195)",
        accentForeground: "oklch(0.95 0 0)",
        chart1: "oklch(0.65 0.15 195)",
        chart2: "oklch(0.6 0.13 220)",
        chart3: "oklch(0.7 0.1 175)",
        chart4: "oklch(0.55 0.15 200)",
        chart5: "oklch(0.6 0.12 210)",
        sidebarPrimary: "oklch(0.65 0.14 195)",
        sidebarPrimaryForeground: "oklch(0.95 0 0)",
        sidebarRing: "oklch(0.65 0.14 195)",
      },
    },
    preview: { bg: "oklch(0.985 0.005 195)", primary: "oklch(0.5 0.15 195)", secondary: "oklch(0.94 0.01 195)", accent: "oklch(0.6 0.12 220)" },
  },
];

export function ThemeGallery() {
  const { config, applyFullTheme } = useTheme();

  const currentThemeName = curatedThemes.find(
    (t) => t.config.light.primary === config.light.primary && t.config.radius === config.radius
  )?.name;

  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">
        Theme Gallery
      </h4>
      <div className="grid grid-cols-2 gap-2">
        {curatedThemes.map((theme) => {
          const isActive = currentThemeName === theme.name;
          return (
            <button
              key={theme.name}
              onClick={() => applyFullTheme(theme.config)}
              className={cn(
                "relative rounded-lg border p-2.5 text-left transition-all hover:shadow-md hover:-translate-y-0.5",
                isActive && "border-primary ring-1 ring-primary/30"
              )}
            >
              {isActive && (
                <div className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary">
                  <Check className="h-2.5 w-2.5 text-primary-foreground" />
                </div>
              )}
              {/* Color preview */}
              <div className="flex gap-1 mb-2">
                <div
                  className="h-6 flex-1 rounded-l-sm"
                  style={{ background: theme.preview.bg }}
                />
                <div
                  className="h-6 flex-1"
                  style={{ background: theme.preview.primary }}
                />
                <div
                  className="h-6 flex-1"
                  style={{ background: theme.preview.secondary }}
                />
                <div
                  className="h-6 flex-1 rounded-r-sm"
                  style={{ background: theme.preview.accent }}
                />
              </div>
              <p className="text-xs font-medium leading-none mb-0.5">{theme.name}</p>
              <p className="text-[10px] text-muted-foreground leading-tight">{theme.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { curatedThemes };

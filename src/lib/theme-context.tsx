import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import type { ThemeConfig, ThemeColors, ThemeMode, PresetName, ColorFormat, TailwindVersion } from "@/types/theme";
import { defaultThemeConfig, presets, shadowPresets } from "./theme-presets";

const STORAGE_KEY = "shadcn-theme-generator";

interface ThemeState {
  config: ThemeConfig;
  previewMode: ThemeMode;
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
}

interface ThemeContextValue {
  config: ThemeConfig;
  previewMode: ThemeMode;
  colorFormat: ColorFormat;
  tailwindVersion: TailwindVersion;
  setPreviewMode: (mode: ThemeMode) => void;
  setColorFormat: (format: ColorFormat) => void;
  setTailwindVersion: (version: TailwindVersion) => void;
  updateLightColor: (key: keyof ThemeColors, value: string) => void;
  updateDarkColor: (key: keyof ThemeColors, value: string) => void;
  updateRadius: (radius: string) => void;
  updateFontSans: (font: string) => void;
  updateFontSerif: (font: string) => void;
  updateFontMono: (font: string) => void;
  updateShadowPreset: (preset: string) => void;
  applyPreset: (preset: PresetName) => void;
  applyFullTheme: (theme: ThemeConfig) => void;
  resetTheme: () => void;
  randomizeTheme: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

function loadFromStorage(): ThemeState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      return JSON.parse(raw) as ThemeState;
    }
  } catch {
    // ignore
  }
  return null;
}

function saveToStorage(state: ThemeState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // ignore
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [config, setConfig] = useState<ThemeConfig>(() => {
    const saved = loadFromStorage();
    return saved?.config ?? defaultThemeConfig;
  });

  const [previewMode, setPreviewMode] = useState<ThemeMode>(() => {
    const saved = loadFromStorage();
    return saved?.previewMode ?? "light";
  });

  const [colorFormat, setColorFormat] = useState<ColorFormat>(() => {
    const saved = loadFromStorage();
    return saved?.colorFormat ?? "oklch";
  });

  const [tailwindVersion, setTailwindVersion] = useState<TailwindVersion>(() => {
    const saved = loadFromStorage();
    return saved?.tailwindVersion ?? "v4";
  });

  // Persist to localStorage
  useEffect(() => {
    saveToStorage({ config, previewMode, colorFormat, tailwindVersion });
  }, [config, previewMode, colorFormat, tailwindVersion]);

  // Inject CSS variables into :root so all pages reflect the theme
  useEffect(() => {
    const root = document.documentElement;
    const colors = previewMode === "light" ? config.light : config.dark;

    root.style.setProperty("--background", colors.background);
    root.style.setProperty("--foreground", colors.foreground);
    root.style.setProperty("--card", colors.card);
    root.style.setProperty("--card-foreground", colors.cardForeground);
    root.style.setProperty("--popover", colors.popover);
    root.style.setProperty("--popover-foreground", colors.popoverForeground);
    root.style.setProperty("--primary", colors.primary);
    root.style.setProperty("--primary-foreground", colors.primaryForeground);
    root.style.setProperty("--secondary", colors.secondary);
    root.style.setProperty("--secondary-foreground", colors.secondaryForeground);
    root.style.setProperty("--muted", colors.muted);
    root.style.setProperty("--muted-foreground", colors.mutedForeground);
    root.style.setProperty("--accent", colors.accent);
    root.style.setProperty("--accent-foreground", colors.accentForeground);
    root.style.setProperty("--destructive", colors.destructive);
    root.style.setProperty("--border", colors.border);
    root.style.setProperty("--input", colors.input);
    root.style.setProperty("--ring", colors.ring);
    root.style.setProperty("--chart-1", colors.chart1);
    root.style.setProperty("--chart-2", colors.chart2);
    root.style.setProperty("--chart-3", colors.chart3);
    root.style.setProperty("--chart-4", colors.chart4);
    root.style.setProperty("--chart-5", colors.chart5);
    root.style.setProperty("--sidebar", colors.sidebar);
    root.style.setProperty("--sidebar-foreground", colors.sidebarForeground);
    root.style.setProperty("--sidebar-primary", colors.sidebarPrimary);
    root.style.setProperty("--sidebar-primary-foreground", colors.sidebarPrimaryForeground);
    root.style.setProperty("--sidebar-accent", colors.sidebarAccent);
    root.style.setProperty("--sidebar-accent-foreground", colors.sidebarAccentForeground);
    root.style.setProperty("--sidebar-border", colors.sidebarBorder);
    root.style.setProperty("--sidebar-ring", colors.sidebarRing);
    root.style.setProperty("--radius", config.radius);
    root.style.setProperty("--font-sans", config.fontSans);
    root.style.setProperty("--font-serif", config.fontSerif);
    root.style.setProperty("--font-mono", config.fontMono);

    // Toggle dark class on html
    if (previewMode === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [config, previewMode]);

  const updateLightColor = useCallback(
    (key: keyof ThemeColors, value: string) => {
      setConfig((prev) => ({
        ...prev,
        light: { ...prev.light, [key]: value },
      }));
    },
    []
  );

  const updateDarkColor = useCallback(
    (key: keyof ThemeColors, value: string) => {
      setConfig((prev) => ({
        ...prev,
        dark: { ...prev.dark, [key]: value },
      }));
    },
    []
  );

  const updateRadius = useCallback((radius: string) => {
    setConfig((prev) => ({ ...prev, radius }));
  }, []);

  const updateFontSans = useCallback((fontSans: string) => {
    setConfig((prev) => ({ ...prev, fontSans }));
  }, []);

  const updateFontSerif = useCallback((fontSerif: string) => {
    setConfig((prev) => ({ ...prev, fontSerif }));
  }, []);

  const updateFontMono = useCallback((fontMono: string) => {
    setConfig((prev) => ({ ...prev, fontMono }));
  }, []);

  const updateShadowPreset = useCallback((preset: string) => {
    const shadows = shadowPresets[preset];
    if (shadows) {
      setConfig((prev) => ({ ...prev, shadows }));
    }
  }, []);

  const applyPreset = useCallback((preset: PresetName) => {
    const p = presets[preset];
    if (p) {
      setConfig((prev) => ({
        ...prev,
        light: { ...p.light },
        dark: { ...p.dark },
      }));
    }
  }, []);

  const applyFullTheme = useCallback((theme: ThemeConfig) => {
    setConfig(theme);
  }, []);

  const resetTheme = useCallback(() => {
    setConfig(defaultThemeConfig);
    setPreviewMode("light");
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  const randomizeTheme = useCallback(() => {
    function randOklch(lMin: number, lMax: number, cMin: number, cMax: number): string {
      const l = (Math.random() * (lMax - lMin) + lMin).toFixed(3);
      const c = (Math.random() * (cMax - cMin) + cMin).toFixed(3);
      const h = (Math.random() * 360).toFixed(2);
      return `oklch(${l} ${c} ${h})`;
    }

    // Generate a base hue for harmony
    const baseHue = Math.random() * 360;
    const hueShift = () => ((baseHue + (Math.random() * 60 - 30) + 360) % 360).toFixed(2);
    const compHue = () => ((baseHue + 180 + (Math.random() * 40 - 20) + 360) % 360).toFixed(2);

    const lightColors: ThemeColors = {
      background: `oklch(${(0.97 + Math.random() * 0.03).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${hueShift()})`,
      foreground: `oklch(${(0.1 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      card: `oklch(${(0.98 + Math.random() * 0.02).toFixed(3)} ${(Math.random() * 0.008).toFixed(3)} ${hueShift()})`,
      cardForeground: `oklch(${(0.1 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      popover: `oklch(${(0.98 + Math.random() * 0.02).toFixed(3)} ${(Math.random() * 0.005).toFixed(3)} ${hueShift()})`,
      popoverForeground: `oklch(${(0.1 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      primary: `oklch(${(0.45 + Math.random() * 0.2).toFixed(3)} ${(0.15 + Math.random() * 0.15).toFixed(3)} ${baseHue.toFixed(2)})`,
      primaryForeground: `oklch(${(0.95 + Math.random() * 0.05).toFixed(3)} 0 0)`,
      secondary: `oklch(${(0.93 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      secondaryForeground: `oklch(${(0.15 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      muted: `oklch(${(0.93 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${hueShift()})`,
      mutedForeground: `oklch(${(0.45 + Math.random() * 0.15).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      accent: `oklch(${(0.93 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.03).toFixed(3)} ${hueShift()})`,
      accentForeground: `oklch(${(0.15 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      destructive: randOklch(0.5, 0.6, 0.2, 0.26),
      border: `oklch(${(0.88 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${hueShift()})`,
      input: `oklch(${(0.88 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${hueShift()})`,
      ring: `oklch(${(0.5 + Math.random() * 0.2).toFixed(3)} ${(0.1 + Math.random() * 0.15).toFixed(3)} ${baseHue.toFixed(2)})`,
      chart1: `oklch(${(0.55 + Math.random() * 0.15).toFixed(3)} ${(0.15 + Math.random() * 0.1).toFixed(3)} ${baseHue.toFixed(2)})`,
      chart2: `oklch(${(0.55 + Math.random() * 0.15).toFixed(3)} ${(0.1 + Math.random() * 0.1).toFixed(3)} ${compHue()})`,
      chart3: `oklch(${(0.4 + Math.random() * 0.15).toFixed(3)} ${(0.05 + Math.random() * 0.08).toFixed(3)} ${hueShift()})`,
      chart4: `oklch(${(0.7 + Math.random() * 0.15).toFixed(3)} ${(0.12 + Math.random() * 0.1).toFixed(3)} ${hueShift()})`,
      chart5: `oklch(${(0.65 + Math.random() * 0.15).toFixed(3)} ${(0.12 + Math.random() * 0.1).toFixed(3)} ${hueShift()})`,
      sidebar: `oklch(${(0.96 + Math.random() * 0.03).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${hueShift()})`,
      sidebarForeground: `oklch(${(0.1 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      sidebarPrimary: `oklch(${(0.45 + Math.random() * 0.2).toFixed(3)} ${(0.15 + Math.random() * 0.15).toFixed(3)} ${baseHue.toFixed(2)})`,
      sidebarPrimaryForeground: `oklch(${(0.95 + Math.random() * 0.05).toFixed(3)} 0 0)`,
      sidebarAccent: `oklch(${(0.93 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      sidebarAccentForeground: `oklch(${(0.15 + Math.random() * 0.1).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${hueShift()})`,
      sidebarBorder: `oklch(${(0.88 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${hueShift()})`,
      sidebarRing: `oklch(${(0.5 + Math.random() * 0.2).toFixed(3)} ${(0.1 + Math.random() * 0.15).toFixed(3)} ${baseHue.toFixed(2)})`,
    };

    const darkBaseHue = (baseHue + (Math.random() * 20 - 10) + 360) % 360;
    const darkHueShift = () => ((darkBaseHue + (Math.random() * 60 - 30) + 360) % 360).toFixed(2);

    const darkColors: ThemeColors = {
      background: `oklch(${(0.13 + Math.random() * 0.04).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      foreground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      card: `oklch(${(0.15 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      cardForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      popover: `oklch(${(0.15 + Math.random() * 0.05).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      popoverForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      primary: `oklch(${(0.6 + Math.random() * 0.15).toFixed(3)} ${(0.15 + Math.random() * 0.12).toFixed(3)} ${darkBaseHue.toFixed(2)})`,
      primaryForeground: `oklch(${(0.1 + Math.random() * 0.1).toFixed(3)} 0 0)`,
      secondary: `oklch(${(0.22 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${darkHueShift()})`,
      secondaryForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      muted: `oklch(${(0.22 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      mutedForeground: `oklch(${(0.6 + Math.random() * 0.15).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${darkHueShift()})`,
      accent: `oklch(${(0.22 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.025).toFixed(3)} ${darkHueShift()})`,
      accentForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      destructive: randOklch(0.5, 0.62, 0.2, 0.26),
      border: `oklch(${(0.25 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      input: `oklch(${(0.25 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      ring: `oklch(${(0.55 + Math.random() * 0.2).toFixed(3)} ${(0.1 + Math.random() * 0.12).toFixed(3)} ${darkBaseHue.toFixed(2)})`,
      chart1: `oklch(${(0.55 + Math.random() * 0.15).toFixed(3)} ${(0.18 + Math.random() * 0.1).toFixed(3)} ${darkBaseHue.toFixed(2)})`,
      chart2: `oklch(${(0.6 + Math.random() * 0.15).toFixed(3)} ${(0.12 + Math.random() * 0.1).toFixed(3)} ${((darkBaseHue + 120) % 360).toFixed(2)})`,
      chart3: `oklch(${(0.65 + Math.random() * 0.12).toFixed(3)} ${(0.12 + Math.random() * 0.1).toFixed(3)} ${((darkBaseHue + 60) % 360).toFixed(2)})`,
      chart4: `oklch(${(0.55 + Math.random() * 0.15).toFixed(3)} ${(0.18 + Math.random() * 0.1).toFixed(3)} ${((darkBaseHue + 240) % 360).toFixed(2)})`,
      chart5: `oklch(${(0.58 + Math.random() * 0.15).toFixed(3)} ${(0.18 + Math.random() * 0.1).toFixed(3)} ${((darkBaseHue + 300) % 360).toFixed(2)})`,
      sidebar: `oklch(${(0.13 + Math.random() * 0.04).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      sidebarForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      sidebarPrimary: `oklch(${(0.6 + Math.random() * 0.15).toFixed(3)} ${(0.15 + Math.random() * 0.12).toFixed(3)} ${darkBaseHue.toFixed(2)})`,
      sidebarPrimaryForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} 0 0)`,
      sidebarAccent: `oklch(${(0.22 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.02).toFixed(3)} ${darkHueShift()})`,
      sidebarAccentForeground: `oklch(${(0.93 + Math.random() * 0.06).toFixed(3)} ${(Math.random() * 0.01).toFixed(3)} ${darkHueShift()})`,
      sidebarBorder: `oklch(${(0.25 + Math.random() * 0.08).toFixed(3)} ${(Math.random() * 0.015).toFixed(3)} ${darkHueShift()})`,
      sidebarRing: `oklch(${(0.55 + Math.random() * 0.2).toFixed(3)} ${(0.1 + Math.random() * 0.12).toFixed(3)} ${darkBaseHue.toFixed(2)})`,
    };

    const radiusOptions = ["0", "0.25rem", "0.5rem", "0.625rem", "0.75rem", "1rem"];
    const randomRadius = radiusOptions[Math.floor(Math.random() * radiusOptions.length)]!;

    setConfig((prev) => ({
      ...prev,
      light: lightColors,
      dark: darkColors,
      radius: randomRadius,
    }));
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        config,
        previewMode,
        colorFormat,
        tailwindVersion,
        setPreviewMode,
        setColorFormat,
        setTailwindVersion,
        updateLightColor,
        updateDarkColor,
        updateRadius,
        updateFontSans,
        updateFontSerif,
        updateFontMono,
        updateShadowPreset,
        applyPreset,
        applyFullTheme,
        resetTheme,
        randomizeTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}

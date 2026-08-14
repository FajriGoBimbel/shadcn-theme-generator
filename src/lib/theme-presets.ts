import type { ThemeColors, ThemeConfig, ThemeShadows, PresetName } from "@/types/theme";

const defaultLight: ThemeColors = {
  background: "oklch(1 0 0)",
  foreground: "oklch(0.145 0 0)",

  card: "oklch(1 0 0)",
  cardForeground: "oklch(0.145 0 0)",

  popover: "oklch(1 0 0)",
  popoverForeground: "oklch(0.145 0 0)",

  primary: "oklch(0.205 0 0)",
  primaryForeground: "oklch(0.985 0 0)",

  secondary: "oklch(0.97 0 0)",
  secondaryForeground: "oklch(0.205 0 0)",

  muted: "oklch(0.97 0 0)",
  mutedForeground: "oklch(0.556 0 0)",

  accent: "oklch(0.97 0 0)",
  accentForeground: "oklch(0.205 0 0)",

  destructive: "oklch(0.577 0.245 27.325)",

  border: "oklch(0.922 0 0)",
  input: "oklch(0.922 0 0)",
  ring: "oklch(0.708 0 0)",

  chart1: "oklch(0.646 0.222 41.116)",
  chart2: "oklch(0.6 0.118 184.704)",
  chart3: "oklch(0.398 0.07 227.392)",
  chart4: "oklch(0.828 0.189 84.429)",
  chart5: "oklch(0.769 0.188 70.08)",

  sidebar: "oklch(0.985 0 0)",
  sidebarForeground: "oklch(0.145 0 0)",
  sidebarPrimary: "oklch(0.205 0 0)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.97 0 0)",
  sidebarAccentForeground: "oklch(0.205 0 0)",
  sidebarBorder: "oklch(0.922 0 0)",
  sidebarRing: "oklch(0.708 0 0)",
};

const defaultDark: ThemeColors = {
  background: "oklch(0.145 0 0)",
  foreground: "oklch(0.985 0 0)",

  card: "oklch(0.145 0 0)",
  cardForeground: "oklch(0.985 0 0)",

  popover: "oklch(0.145 0 0)",
  popoverForeground: "oklch(0.985 0 0)",

  primary: "oklch(0.985 0 0)",
  primaryForeground: "oklch(0.205 0 0)",

  secondary: "oklch(0.269 0 0)",
  secondaryForeground: "oklch(0.985 0 0)",

  muted: "oklch(0.269 0 0)",
  mutedForeground: "oklch(0.708 0 0)",

  accent: "oklch(0.269 0 0)",
  accentForeground: "oklch(0.985 0 0)",

  destructive: "oklch(0.577 0.245 27.325)",

  border: "oklch(0.269 0 0)",
  input: "oklch(0.269 0 0)",
  ring: "oklch(0.439 0 0)",

  chart1: "oklch(0.488 0.243 264.376)",
  chart2: "oklch(0.696 0.17 162.48)",
  chart3: "oklch(0.769 0.188 70.08)",
  chart4: "oklch(0.627 0.265 303.9)",
  chart5: "oklch(0.645 0.246 16.439)",

  sidebar: "oklch(0.145 0 0)",
  sidebarForeground: "oklch(0.985 0 0)",
  sidebarPrimary: "oklch(0.488 0.243 264.376)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarAccent: "oklch(0.269 0 0)",
  sidebarAccentForeground: "oklch(0.985 0 0)",
  sidebarBorder: "oklch(0.269 0 0)",
  sidebarRing: "oklch(0.439 0 0)",
};

const blueLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.488 0.243 264.376)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.488 0.243 264.376)",
  chart1: "oklch(0.488 0.243 264.376)",
  sidebarPrimary: "oklch(0.488 0.243 264.376)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.488 0.243 264.376)",
};

const blueDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.623 0.214 259.815)",
  primaryForeground: "oklch(0.145 0 0)",
  ring: "oklch(0.623 0.214 259.815)",
  chart1: "oklch(0.623 0.214 259.815)",
  sidebarPrimary: "oklch(0.623 0.214 259.815)",
  sidebarPrimaryForeground: "oklch(0.145 0 0)",
  sidebarRing: "oklch(0.623 0.214 259.815)",
};

const greenLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.527 0.154 150.069)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.527 0.154 150.069)",
  chart1: "oklch(0.527 0.154 150.069)",
  sidebarPrimary: "oklch(0.527 0.154 150.069)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.527 0.154 150.069)",
};

const greenDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.696 0.17 162.48)",
  primaryForeground: "oklch(0.145 0 0)",
  ring: "oklch(0.696 0.17 162.48)",
  chart1: "oklch(0.696 0.17 162.48)",
  sidebarPrimary: "oklch(0.696 0.17 162.48)",
  sidebarPrimaryForeground: "oklch(0.145 0 0)",
  sidebarRing: "oklch(0.696 0.17 162.48)",
};

const orangeLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.646 0.222 41.116)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.646 0.222 41.116)",
  chart1: "oklch(0.646 0.222 41.116)",
  sidebarPrimary: "oklch(0.646 0.222 41.116)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.646 0.222 41.116)",
};

const orangeDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.769 0.188 70.08)",
  primaryForeground: "oklch(0.145 0 0)",
  ring: "oklch(0.769 0.188 70.08)",
  chart1: "oklch(0.769 0.188 70.08)",
  sidebarPrimary: "oklch(0.769 0.188 70.08)",
  sidebarPrimaryForeground: "oklch(0.145 0 0)",
  sidebarRing: "oklch(0.769 0.188 70.08)",
};

const roseLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.645 0.246 16.439)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.645 0.246 16.439)",
  chart1: "oklch(0.645 0.246 16.439)",
  sidebarPrimary: "oklch(0.645 0.246 16.439)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.645 0.246 16.439)",
};

const roseDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.717 0.194 13.428)",
  primaryForeground: "oklch(0.145 0 0)",
  ring: "oklch(0.717 0.194 13.428)",
  chart1: "oklch(0.717 0.194 13.428)",
  sidebarPrimary: "oklch(0.717 0.194 13.428)",
  sidebarPrimaryForeground: "oklch(0.145 0 0)",
  sidebarRing: "oklch(0.717 0.194 13.428)",
};

const violetLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.541 0.281 293.009)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.541 0.281 293.009)",
  chart1: "oklch(0.541 0.281 293.009)",
  sidebarPrimary: "oklch(0.541 0.281 293.009)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.541 0.281 293.009)",
};

const violetDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.627 0.265 303.9)",
  primaryForeground: "oklch(0.985 0 0)",
  ring: "oklch(0.627 0.265 303.9)",
  chart1: "oklch(0.627 0.265 303.9)",
  sidebarPrimary: "oklch(0.627 0.265 303.9)",
  sidebarPrimaryForeground: "oklch(0.985 0 0)",
  sidebarRing: "oklch(0.627 0.265 303.9)",
};

const neutralLight: ThemeColors = {
  ...defaultLight,
  primary: "oklch(0.371 0 0)",
  primaryForeground: "oklch(0.985 0 0)",
  secondary: "oklch(0.961 0.001 286.375)",
  secondaryForeground: "oklch(0.21 0.006 285.885)",
  accent: "oklch(0.961 0.001 286.375)",
  accentForeground: "oklch(0.21 0.006 285.885)",
  muted: "oklch(0.961 0.001 286.375)",
  mutedForeground: "oklch(0.552 0.016 285.938)",
  border: "oklch(0.918 0.002 286.375)",
  input: "oklch(0.918 0.002 286.375)",
  ring: "oklch(0.371 0 0)",
};

const neutralDark: ThemeColors = {
  ...defaultDark,
  primary: "oklch(0.985 0 0)",
  primaryForeground: "oklch(0.205 0 0)",
  secondary: "oklch(0.274 0.006 286.033)",
  secondaryForeground: "oklch(0.985 0 0)",
  accent: "oklch(0.274 0.006 286.033)",
  accentForeground: "oklch(0.985 0 0)",
  muted: "oklch(0.274 0.006 286.033)",
  mutedForeground: "oklch(0.705 0.015 286.067)",
  border: "oklch(0.274 0.006 286.033)",
  input: "oklch(0.274 0.006 286.033)",
  ring: "oklch(0.439 0 0)",
};

const defaultShadows: ThemeShadows = {
  "2xs": "0 1px rgb(0 0 0 / 0.07)",
  xs: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
  sm: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  default: "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
  md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
  lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
  xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.25)",
};

export const defaultThemeConfig: ThemeConfig = {
  light: defaultLight,
  dark: defaultDark,
  radius: "0.625rem",
  fontSans: '"ui-sans-serif", system-ui, sans-serif',
  fontSerif: '"ui-serif", Georgia, serif',
  fontMono: '"ui-monospace", monospace',
  shadows: defaultShadows,
};

export const presets: Record<PresetName, { light: ThemeColors; dark: ThemeColors }> = {
  default: { light: defaultLight, dark: defaultDark },
  neutral: { light: neutralLight, dark: neutralDark },
  blue: { light: blueLight, dark: blueDark },
  green: { light: greenLight, dark: greenDark },
  orange: { light: orangeLight, dark: orangeDark },
  rose: { light: roseLight, dark: roseDark },
  violet: { light: violetLight, dark: violetDark },
};

export const radiusOptions = [
  { label: "None", value: "0" },
  { label: "Small", value: "0.25rem" },
  { label: "Medium", value: "0.5rem" },
  { label: "Large", value: "0.625rem" },
  { label: "Extra Large", value: "1rem" },
];

export const fontSansOptions = [
  { label: "System", value: '"ui-sans-serif", system-ui, sans-serif' },
  { label: "Inter", value: '"Inter", ui-sans-serif, system-ui, sans-serif' },
  { label: "Geist", value: '"Geist", ui-sans-serif, system-ui, sans-serif' },
  { label: "Roboto", value: '"Roboto", ui-sans-serif, system-ui, sans-serif' },
];

export const fontSerifOptions = [
  { label: "System", value: '"ui-serif", Georgia, serif' },
  { label: "Georgia", value: '"Georgia", ui-serif, serif' },
  { label: "Geist", value: '"Geist", ui-serif, Georgia, serif' },
];

export const fontMonoOptions = [
  { label: "System", value: '"ui-monospace", monospace' },
  { label: "JetBrains Mono", value: '"JetBrains Mono", ui-monospace, monospace' },
  { label: "Geist Mono", value: '"Geist Mono", ui-monospace, monospace' },
];

export const shadowPresets: Record<string, ThemeShadows> = {
  none: {
    "2xs": "none",
    xs: "none",
    sm: "none",
    default: "none",
    md: "none",
    lg: "none",
    xl: "none",
    "2xl": "none",
  },
  soft: {
    "2xs": "0 1px rgb(0 0 0 / 0.04)",
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    default: "0 1px 3px 0 rgb(0 0 0 / 0.06), 0 1px 2px -1px rgb(0 0 0 / 0.06)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.06), 0 2px 4px -2px rgb(0 0 0 / 0.06)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.06), 0 4px 6px -4px rgb(0 0 0 / 0.06)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.06), 0 8px 10px -6px rgb(0 0 0 / 0.06)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.15)",
  },
  default: defaultShadows,
  strong: {
    "2xs": "0 1px rgb(0 0 0 / 0.12)",
    xs: "0 1px 2px 0 rgb(0 0 0 / 0.1)",
    sm: "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)",
    default: "0 1px 3px 0 rgb(0 0 0 / 0.15), 0 1px 2px -1px rgb(0 0 0 / 0.15)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.15), 0 2px 4px -2px rgb(0 0 0 / 0.15)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.15), 0 4px 6px -4px rgb(0 0 0 / 0.15)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.15), 0 8px 10px -6px rgb(0 0 0 / 0.15)",
    "2xl": "0 25px 50px -12px rgb(0 0 0 / 0.35)",
  },
};

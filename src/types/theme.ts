export interface ThemeColors {
  background: string;
  foreground: string;

  card: string;
  cardForeground: string;

  popover: string;
  popoverForeground: string;

  primary: string;
  primaryForeground: string;

  secondary: string;
  secondaryForeground: string;

  muted: string;
  mutedForeground: string;

  accent: string;
  accentForeground: string;

  destructive: string;

  border: string;
  input: string;
  ring: string;

  chart1: string;
  chart2: string;
  chart3: string;
  chart4: string;
  chart5: string;

  sidebar: string;
  sidebarForeground: string;
  sidebarPrimary: string;
  sidebarPrimaryForeground: string;
  sidebarAccent: string;
  sidebarAccentForeground: string;
  sidebarBorder: string;
  sidebarRing: string;
}

export interface ThemeShadows {
  "2xs": string;
  xs: string;
  sm: string;
  default: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
}

export interface ThemeConfig {
  light: ThemeColors;
  dark: ThemeColors;

  radius: string;

  fontSans: string;
  fontSerif: string;
  fontMono: string;

  shadows: ThemeShadows;
}

export type ThemeMode = "light" | "dark";

export type PresetName =
  | "default"
  | "neutral"
  | "blue"
  | "green"
  | "orange"
  | "rose"
  | "violet";

export interface ColorVariable {
  key: keyof ThemeColors;
  label: string;
  group: string;
}

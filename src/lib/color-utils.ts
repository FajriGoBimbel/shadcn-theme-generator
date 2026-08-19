/**
 * Convert hex color (#rrggbb) to oklch string.
 * Uses approximate conversion via linear sRGB → OKLab → OKLCH.
 */
export function hexToOklch(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  // sRGB to linear
  const toLinear = (c: number) =>
    c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);

  const lr = toLinear(r);
  const lg = toLinear(g);
  const lb = toLinear(b);

  // Linear sRGB to LMS (using OKLab matrix)
  const l_ = 0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb;
  const m_ = 0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb;
  const s_ = 0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb;

  // LMS to OKLab
  const l2 = Math.cbrt(l_);
  const m2 = Math.cbrt(m_);
  const s2 = Math.cbrt(s_);

  const L = 0.2104542553 * l2 + 0.7936177850 * m2 - 0.0040720468 * s2;
  const a = 1.9779984951 * l2 - 2.4285922050 * m2 + 0.4505937099 * s2;
  const bVal = 0.0259040371 * l2 + 0.7827717662 * m2 - 0.8086757660 * s2;

  // OKLab to OKLCH
  const C = Math.sqrt(a * a + bVal * bVal);
  let H = (Math.atan2(bVal, a) * 180) / Math.PI;
  if (H < 0) H += 360;

  return `oklch(${L.toFixed(3)} ${C.toFixed(3)} ${H.toFixed(2)})`;
}

/**
 * Convert an oklch string to approximate hex color.
 * Parses oklch(L C H) then converts OKLCH → OKLab → linear sRGB → sRGB → hex.
 */
export function oklchToHex(oklch: string): string {
  const match = oklch.match(
    /oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)/
  );
  if (!match) return "#808080";

  const L = parseFloat(match[1]!);
  const C = parseFloat(match[2]!);
  const H = parseFloat(match[3]!);

  // OKLCH to OKLab
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  // OKLab to LMS
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.2914855480 * b;

  // Cube LMS
  const l2 = l_ * l_ * l_;
  const m2 = m_ * m_ * m_;
  const s2 = s_ * s_ * s_;

  // LMS to linear sRGB
  const lr = +4.0767416621 * l2 - 3.3077115913 * m2 + 0.2309699292 * s2;
  const lg = -1.2684380046 * l2 + 2.6097574011 * m2 - 0.3413193965 * s2;
  const lb = -0.0041960863 * l2 - 0.7034186147 * m2 + 1.7076147010 * s2;

  // Linear to sRGB gamma
  const toSrgb = (c: number) => {
    const clamped = Math.max(0, Math.min(1, c));
    return clamped <= 0.0031308
      ? 12.92 * clamped
      : 1.055 * Math.pow(clamped, 1 / 2.4) - 0.055;
  };

  const r = Math.round(toSrgb(lr) * 255);
  const g = Math.round(toSrgb(lg) * 255);
  const bFinal = Math.round(toSrgb(lb) * 255);

  const toHex = (n: number) =>
    Math.max(0, Math.min(255, n)).toString(16).padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(bFinal)}`;
}


/**
 * Convert an oklch string to HSL format: hsl(h, s%, l%)
 */
export function oklchToHsl(oklch: string): string {
  const hex = oklchToHex(oklch);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return `hsl(0 0% ${Math.round(l * 100)}%)`;
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return `hsl(${Math.round(h * 360)} ${Math.round(s * 100)}% ${Math.round(l * 100)}%)`;
}

/**
 * Convert an oklch string to RGB format: rgb(r, g, b)
 */
export function oklchToRgb(oklch: string): string {
  const hex = oklchToHex(oklch);
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgb(${r}, ${g}, ${b})`;
}

/**
 * Convert an oklch color value to the specified format.
 */
export type ColorFormat = "oklch" | "hsl" | "rgb" | "hex";

export function convertColor(oklchValue: string, format: ColorFormat): string {
  if (!oklchValue || !oklchValue.startsWith("oklch(")) return oklchValue;

  switch (format) {
    case "oklch":
      return oklchValue;
    case "hsl":
      return oklchToHsl(oklchValue);
    case "rgb":
      return oklchToRgb(oklchValue);
    case "hex":
      return oklchToHex(oklchValue);
    default:
      return oklchValue;
  }
}


/**
 * Convert an oklch string to raw HSL values for Tailwind v3: "H S% L%" (no hsl() wrapper)
 */
export function oklchToHslRaw(oklch: string): string {
  const hex = oklchToHex(oklch);
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;

  if (max === min) {
    return `0 0% ${Math.round(l * 100)}%`;
  }

  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;

  return `${(h * 360).toFixed(1)} ${(s * 100).toFixed(1)}% ${(l * 100).toFixed(1)}%`;
}

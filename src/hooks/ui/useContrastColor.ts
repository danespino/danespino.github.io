import { useMemo } from "react";

type Result = {
  baseBgClass: string;        // e.g. "bg-blue-900" or "bg-[#112233]"
  beforeBgClass?: string;     // e.g. "before:bg-blue-600"
  textClass: "text-white" | "text-black";
};

type Options = {
  /** For hex → lightness bump in HSL (0–1). Default 0.18 */
  lighterDelta?: number;
  /** If true, force Tailwind classes only (no arbitrary). Hex falls back to neutral classes. */
  tailwindOnly?: boolean;
};

const TAILWIND_COLORS = new Set([
  "slate","gray","zinc","neutral","stone",
  "red","orange","amber","yellow","lime",
  "green","emerald","teal","cyan","sky",
  "blue","indigo","violet","purple","fuchsia","pink","rose"
]);
const TAILWIND_SHADES = [50,100,200,300,400,500,600,700,800,900,950] as const;
type Shade = typeof TAILWIND_SHADES[number];

const isHex = (v: string) => /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v.trim());

function normalizeHex(hex: string): string {
  const h = hex.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/i.test(h)) {
    return "#" + h.slice(1).split("").map(c => c + c).join("");
  }
  return h;
}
function hexToRgb(hex: string) {
  const h = normalizeHex(hex).slice(1);
  return {
    r: parseInt(h.slice(0,2), 16),
    g: parseInt(h.slice(2,4), 16),
    b: parseInt(h.slice(4,6), 16),
  };
}
function rgbToHsl(r: number, g: number, b: number) {
  r/=255; g/=255; b/=255;
  const max = Math.max(r,g,b), min = Math.min(r,g,b);
  let h = 0, s = 0;
  const l = (max + min) / 2;
  const d = max - min;
  if (d !== 0) {
    s = d / (1 - Math.abs(2*l - 1));
    switch (max) {
      case r: h = ((g - b) / d) % 6; break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h *= 60;
    if (h < 0) h += 360;
  }
  return { h, s, l };
}
function textForBg({ r, g, b }: {r:number; g:number; b:number}): "text-white" | "text-black" {
  const toLin = (c: number) => {
    const cs = c / 255;
    return cs <= 0.03928 ? cs / 12.92 : Math.pow((cs + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * toLin(r) + 0.7152 * toLin(g) + 0.0722 * toLin(b);
  return L < 0.5 ? "text-white" : "text-black";
}
function lighterShade(shade: Shade): Shade {
  const idx = TAILWIND_SHADES.indexOf(shade);
  if (idx === -1) return 600;
  const step = (shade >= 800) ? 3 : (shade >= 700 ? 2 : 2);
  return TAILWIND_SHADES[Math.max(0, idx - step)];
}
function parseTailwindToken(token: string): { color: string; shade?: Shade } | null {
  const t = token.trim().toLowerCase();
  if (t === "black") return { color: "black" };
  if (t === "white") return { color: "white" };
  const m = t.match(/^([a-z]+)-(\d{2,3})$/);
  if (m) {
    const color = m[1];
    const shadeNum = Number(m[2]) as Shade;
    if (TAILWIND_COLORS.has(color) && TAILWIND_SHADES.includes(shadeNum)) {
      return { color, shade: shadeNum };
    }
  }
  if (TAILWIND_COLORS.has(t)) return { color: t };
  return null;
}
function hslToBeforeClass(h: number, s: number, l: number) {
  const hs = Math.round(h);
  const ss = Math.round(s * 100);
  const ls = Math.round(l * 100);
  // Tailwind arbitrary values require underscores for spaces:
  return `before:bg-[hsl(${hs}_${ss}%_${ls}%)]`;
}

/**
 * useContrastColor
 * @param input Tailwind token ("blue-900", "blue", "black") or hex (#rrggbb or #rgb)
 * @param options Optional behavior tuning
 */
export function useContrastColor(input: string, options?: Options): Result {
  const { lighterDelta = 0.18, tailwindOnly = false } = options ?? {};

  return useMemo<Result>(() => {
    const v = input.trim();

    // HEX path
    if (isHex(v)) {
      if (tailwindOnly) {
        // Fall back to neutral classes if arbitrary not desired
        return {
          baseBgClass: "bg-neutral-900",
          beforeBgClass: "before:bg-neutral-600",
          textClass: "text-white",
        };
      }
      const hex = normalizeHex(v);
      const { r, g, b } = hexToRgb(hex);
      const { h, s, l } = rgbToHsl(r, g, b);
      const textClass = textForBg({ r, g, b });
      const lighterL = Math.min(0.9, l + lighterDelta);

      return {
        baseBgClass: `bg-[${hex}]`,
        beforeBgClass: hslToBeforeClass(h, s, lighterL),
        textClass,
      };
    }

    // Tailwind token path
    const parsed = parseTailwindToken(v);
    if (parsed) {
      if (parsed.color === "black") {
        return { baseBgClass: "bg-black",  beforeBgClass: "before:bg-neutral-700", textClass: "text-white" };
      }
      if (parsed.color === "white") {
        return { baseBgClass: "bg-white",  beforeBgClass: "before:bg-neutral-200", textClass: "text-black" };
      }
      if (parsed.shade) {
        const beforeShade = lighterShade(parsed.shade);
        return {
          baseBgClass: `bg-${parsed.color}-${parsed.shade}`,
          beforeBgClass: `before:bg-${parsed.color}-${beforeShade}`,
          textClass: parsed.shade >= 600 ? "text-white" : "text-black",
        };
      }
      // color without shade → default (base 600 / before 400)
      return {
        baseBgClass: `bg-${parsed.color}-600`,
        beforeBgClass: `before:bg-${parsed.color}-400`,
        textClass: "text-white",
      };
    }

    // Unknown input fallback
    return {
      baseBgClass: "bg-neutral-900",
      beforeBgClass: "before:bg-neutral-600",
      textClass: "text-white",
    };
  }, [input, lighterDelta, tailwindOnly]);
}


/**
 * Color manipulation utilities
 */

interface RGB {
    r: number;
    g: number;
    b: number;
}

interface HSL {
    h: number;
    s: number;
    l: number;
}

interface RGBA extends RGB {
    a: number;
}

/**
 * Parse a color string to RGB values
 */
export function parseColor(color: string): RGBA {
    // Handle hex colors
    if (color.startsWith("#")) {
        return hexToRgba(color);
    }
    
    // Handle rgb/rgba
    if (color.startsWith("rgb")) {
        return parseRgba(color);
    }
    
    // Handle hsl/hsla
    if (color.startsWith("hsl")) {
        return hslaToRgba(parseHsla(color));
    }
    
    throw new Error(`Failed to parse color: ${color}`);
}

/**
 * Convert hex to RGBA
 */
export function hexToRgba(hex: string): RGBA {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
    if (!result) {
        // Try short hex
        const short = /^#?([a-f\d])([a-f\d])([a-f\d])$/i.exec(hex);
        if (short) {
            return {
                r: parseInt(short[1] + short[1], 16),
                g: parseInt(short[2] + short[2], 16),
                b: parseInt(short[3] + short[3], 16),
                a: 1,
            };
        }
        return { r: 0, g: 0, b: 0, a: 1 };
    }
    return {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
        a: result[4] ? parseInt(result[4], 16) / 255 : 1,
    };
}

/**
 * Parse rgb/rgba string
 */
function parseRgba(color: string): RGBA {
    const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
    if (!match) return { r: 0, g: 0, b: 0, a: 1 };
    return {
        r: parseInt(match[1]),
        g: parseInt(match[2]),
        b: parseInt(match[3]),
        a: match[4] ? parseFloat(match[4]) : 1,
    };
}

/**
 * Parse hsl/hsla string
 */
function parseHsla(color: string): { h: number; s: number; l: number; a: number } {
    const match = color.match(/hsla?\((\d+),\s*([\d.]+)%,\s*([\d.]+)%(?:,\s*([\d.]+))?\)/);
    if (!match) return { h: 0, s: 0, l: 0, a: 1 };
    return {
        h: parseInt(match[1]),
        s: parseFloat(match[2]) / 100,
        l: parseFloat(match[3]) / 100,
        a: match[4] ? parseFloat(match[4]) : 1,
    };
}

/**
 * Convert RGB to HSL
 */
export function rgbToHsl(rgb: RGB): HSL {
    const r = rgb.r / 255;
    const g = rgb.g / 255;
    const b = rgb.b / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    const l = (max + min) / 2;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
                break;
            case g:
                h = ((b - r) / d + 2) / 6;
                break;
            case b:
                h = ((r - g) / d + 4) / 6;
                break;
        }
    }

    return { h: h * 360, s, l };
}

/**
 * Convert HSL to RGB
 */
export function hslToRgb(hsl: HSL): RGB {
    const { h, s, l } = hsl;
    const hue = h / 360;

    if (s === 0) {
        const val = Math.round(l * 255);
        return { r: val, g: val, b: val };
    }

    const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    return {
        r: Math.round(hue2rgb(p, q, hue + 1 / 3) * 255),
        g: Math.round(hue2rgb(p, q, hue) * 255),
        b: Math.round(hue2rgb(p, q, hue - 1 / 3) * 255),
    };
}

/**
 * Convert HSLA to RGBA
 */
function hslaToRgba(hsla: { h: number; s: number; l: number; a: number }): RGBA {
    const rgb = hslToRgb({ h: hsla.h, s: hsla.s, l: hsla.l });
    return { ...rgb, a: hsla.a };
}

/**
 * Convert RGBA to CSS string
 */
export function rgbaToString(rgba: RGBA): string {
    if (rgba.a === 1) {
        return `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`;
    }
    return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${rgba.a})`;
}

/**
 * Convert RGB to hex string
 */
export function rgbToHex(rgb: RGB): string {
    const toHex = (n: number) => Math.round(n).toString(16).padStart(2, "0");
    return `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
}

// ============================================
// SCSS-like color functions
// ============================================

/**
 * Lighten a color by a percentage (like SCSS lighten)
 * @param color - CSS color string
 * @param amount - Amount to lighten (0-100)
 */
export function lighten(color: string, amount: number): string {
    const rgba = parseColor(color);
    const hsl = rgbToHsl(rgba);
    hsl.l = Math.min(1, hsl.l + amount / 100);
    const rgb = hslToRgb(hsl);
    return rgbaToString({ ...rgb, a: rgba.a });
}

/**
 * Darken a color by a percentage (like SCSS darken)
 * @param color - CSS color string
 * @param amount - Amount to darken (0-100)
 */
export function darken(color: string, amount: number): string {
    const rgba = parseColor(color);
    const hsl = rgbToHsl(rgba);
    hsl.l = Math.max(0, hsl.l - amount / 100);
    const rgb = hslToRgb(hsl);
    return rgbaToString({ ...rgb, a: rgba.a });
}

/**
 * Saturate a color by a percentage (like SCSS saturate)
 * @param color - CSS color string
 * @param amount - Amount to saturate (0-100)
 */
export function saturate(color: string, amount: number): string {
    const rgba = parseColor(color);
    const hsl = rgbToHsl(rgba);
    hsl.s = Math.min(1, hsl.s + amount / 100);
    const rgb = hslToRgb(hsl);
    return rgbaToString({ ...rgb, a: rgba.a });
}

/**
 * Desaturate a color by a percentage (like SCSS desaturate)
 * @param color - CSS color string
 * @param amount - Amount to desaturate (0-100)
 */
export function desaturate(color: string, amount: number): string {
    const rgba = parseColor(color);
    const hsl = rgbToHsl(rgba);
    hsl.s = Math.max(0, hsl.s - amount / 100);
    const rgb = hslToRgb(hsl);
    return rgbaToString({ ...rgb, a: rgba.a });
}

/**
 * Adjust the hue of a color (like SCSS adjust-hue)
 * @param color - CSS color string
 * @param degrees - Degrees to rotate (-360 to 360)
 */
export function adjustHue(color: string, degrees: number): string {
    const rgba = parseColor(color);
    const hsl = rgbToHsl(rgba);
    hsl.h = (hsl.h + degrees + 360) % 360;
    const rgb = hslToRgb(hsl);
    return rgbaToString({ ...rgb, a: rgba.a });
}

/**
 * Get the complement of a color (like SCSS complement)
 * @param color - CSS color string
 */
export function complement(color: string): string {
    return adjustHue(color, 180);
}

/**
 * Invert a color (like SCSS invert)
 * @param color - CSS color string
 */
export function invert(color: string): string {
    const rgba = parseColor(color);
    return rgbaToString({
        r: 255 - rgba.r,
        g: 255 - rgba.g,
        b: 255 - rgba.b,
        a: rgba.a,
    });
}

/**
 * Convert color to grayscale (like SCSS grayscale)
 * @param color - CSS color string
 */
export function grayscale(color: string): string {
    return desaturate(color, 100);
}

/**
 * Mix two colors together (like SCSS mix)
 * @param color1 - First CSS color string
 * @param color2 - Second CSS color string
 * @param weight - Weight of first color (0-100), default 50
 */
export function mix(color1: string, color2: string, weight: number = 50): string {
    const rgba1 = parseColor(color1);
    const rgba2 = parseColor(color2);
    const w = weight / 100;

    return rgbaToString({
        r: Math.round(rgba1.r * w + rgba2.r * (1 - w)),
        g: Math.round(rgba1.g * w + rgba2.g * (1 - w)),
        b: Math.round(rgba1.b * w + rgba2.b * (1 - w)),
        a: rgba1.a * w + rgba2.a * (1 - w),
    });
}

/**
 * Tint a color (mix with white) (like SCSS tint)
 * @param color - CSS color string
 * @param amount - Amount to tint (0-100)
 */
export function tint(color: string, amount: number): string {
    return mix("#ffffff", color, amount);
}

/**
 * Shade a color (mix with black) (like SCSS shade)
 * @param color - CSS color string
 * @param amount - Amount to shade (0-100)
 */
export function shade(color: string, amount: number): string {
    return mix("#000000", color, amount);
}

/**
 * Set the alpha/opacity of a color (like SCSS rgba or transparentize)
 * @param color - CSS color string
 * @param alpha - Alpha value (0-1)
 */
export function alpha(color: string, alphaValue: number): string {
    const rgba = parseColor(color);
    return rgbaToString({ ...rgba, a: Math.max(0, Math.min(1, alphaValue)) });
}

/**
 * Alias for alpha - set opacity (like SCSS opacify/fade-in)
 */
export const opacity = alpha;

/**
 * Make a color more transparent (like SCSS transparentize/fade-out)
 * @param color - CSS color string
 * @param amount - Amount to reduce opacity (0-1)
 */
export function transparentize(color: string, amount: number): string {
    const rgba = parseColor(color);
    return rgbaToString({ ...rgba, a: Math.max(0, rgba.a - amount) });
}

/**
 * Make a color more opaque (like SCSS opacify/fade-in)
 * @param color - CSS color string
 * @param amount - Amount to increase opacity (0-1)
 */
export function opacify(color: string, amount: number): string {
    const rgba = parseColor(color);
    return rgbaToString({ ...rgba, a: Math.min(1, rgba.a + amount) });
}

/**
 * Get the luminance of a color (useful for contrast calculations)
 * @param color - CSS color string
 * @returns Luminance value 0-1
 */
export function luminance(color: string): number {
    const rgba = parseColor(color);
    const [r, g, b] = [rgba.r, rgba.g, rgba.b].map((v) => {
        v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Get contrast ratio between two colors
 * @param color1 - First CSS color string
 * @param color2 - Second CSS color string
 * @returns Contrast ratio
 */
export function contrastRatio(color1: string, color2: string): number {
    const l1 = luminance(color1);
    const l2 = luminance(color2);
    const lighter = Math.max(l1, l2);
    const darker = Math.min(l1, l2);
    return (lighter + 0.05) / (darker + 0.05);
}

/**
 * Check if a color is light or dark
 * @param color - CSS color string
 * @returns true if color is light
 */
export function isLight(color: string): boolean {
    return luminance(color) > 0.5;
}

/**
 * Check if a color is dark
 * @param color - CSS color string
 * @returns true if color is dark
 */
export function isDark(color: string): boolean {
    return !isLight(color);
}

/**
 * Get a readable text color (black or white) for a background
 * @param backgroundColor - CSS color string
 * @returns "#000000" or "#ffffff"
 */
export function readableColor(backgroundColor: string): string {
    return isLight(backgroundColor) ? "#000000" : "#ffffff";
}

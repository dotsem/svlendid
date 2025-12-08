/**
 * Shared style resolution utilities for Svlendid components
 * These functions resolve theme values or pass through custom values
 */

import { getTheme, type Theme } from "$lib/config/theme.js";
import type { ColorPalette } from "$lib/types/colorPalette.type.js";
import type { Radius, Spacing, BoxShadow } from "$lib/types/layout.type.js";

/**
 * Resolve a color from the theme palette or return custom color as-is
 * @param color - Color palette key or custom CSS color value
 * @param theme - Optional theme instance (uses getTheme() if not provided)
 * @returns Resolved CSS color value or undefined
 * 
 * @example
 * resolveColor("primary") // returns theme's primary color
 * resolveColor("#ff0000") // returns "#ff0000"
 * resolveColor("rgb(255, 0, 0)") // returns "rgb(255, 0, 0)"
 * resolveColor("linear-gradient(...)") // returns the gradient
 */
export function resolveColor(
    color: ColorPalette | string | undefined,
    theme?: Theme
): string | undefined {
    if (!color) return undefined;
    const t = theme ?? getTheme();
    // Check if it's a palette color
    const paletteColor = t.colors[color as ColorPalette];
    return paletteColor ?? color;
}

/**
 * Resolve a spacing value from theme or return custom value as-is
 * @param value - Spacing key or custom CSS value
 * @param theme - Optional theme instance
 * @returns Resolved CSS spacing value or undefined
 * 
 * @example
 * resolveSpacing("m") // returns theme's medium spacing
 * resolveSpacing("16px") // returns "16px"
 * resolveSpacing("1rem") // returns "1rem"
 */
export function resolveSpacing(
    value: Spacing | string | undefined,
    theme?: Theme
): string | undefined {
    if (!value) return undefined;
    const t = theme ?? getTheme();
    const themeSpacing = t.spacing[value as Spacing];
    return themeSpacing ?? value;
}

/**
 * Resolve an array of spacing values to CSS string
 * Supports single value, [vertical, horizontal], or [top, right, bottom, left]
 * @param value - Single spacing or array of spacings
 * @param theme - Optional theme instance
 * @returns CSS spacing string (e.g., "8px 16px")
 * 
 * @example
 * resolveSpacingArray("m") // returns "16px"
 * resolveSpacingArray(["s", "m"]) // returns "8px 16px"
 * resolveSpacingArray(["xs", "s", "m", "l"]) // returns "4px 8px 16px 24px"
 */
export function resolveSpacingArray(
    value: Spacing | string | (Spacing | string)[] | undefined,
    theme?: Theme
): string | undefined {
    if (!value) return undefined;
    const t = theme ?? getTheme();
    if (Array.isArray(value)) {
        return value.map(v => resolveSpacing(v, t)).join(" ");
    }
    return resolveSpacing(value, t);
}

/**
 * Resolve a border radius value from theme or return custom value
 * @param value - Radius key or custom CSS value
 * @param theme - Optional theme instance
 * @returns Resolved CSS radius value or undefined
 * 
 * @example
 * resolveRadius("m") // returns theme's medium radius
 * resolveRadius("8px") // returns "8px"
 * resolveRadius("50%") // returns "50%"
 */
export function resolveRadius(
    value: Radius | string | undefined,
    theme?: Theme
): string | undefined {
    if (!value) return undefined;
    const t = theme ?? getTheme();
    const themeRadius = t.radius[value as Radius];
    return themeRadius ?? value;
}

/**
 * Resolve a box shadow value from theme or return custom value
 * @param value - Shadow key or custom CSS value
 * @param theme - Optional theme instance
 * @returns Resolved CSS shadow value or undefined
 * 
 * @example
 * resolveShadow("m") // returns theme's medium shadow
 * resolveShadow("0 2px 4px rgba(0,0,0,0.1)") // returns custom shadow
 */
export function resolveShadow(
    value: BoxShadow | string | undefined,
    theme?: Theme
): string | undefined {
    if (!value) return undefined;
    const t = theme ?? getTheme();
    const themeShadow = t.boxShadow[value as BoxShadow];
    return themeShadow ?? value;
}

/**
 * Map for converting align shorthand to CSS flexbox values
 */
export const alignMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    stretch: "stretch",
    baseline: "baseline",
} as const;

/**
 * Map for converting justify shorthand to CSS flexbox values
 */
export const justifyMap = {
    start: "flex-start",
    center: "center",
    end: "flex-end",
    between: "space-between",
    around: "space-around",
    evenly: "space-evenly",
} as const;

/**
 * Get the "on" color for a given color (for contrast text)
 * @param color - Base color palette key or custom color
 * @param theme - Optional theme instance
 * @returns The contrasting text color
 * 
 * @example
 * getOnColor("primary") // returns theme's onPrimary color
 * getOnColor("#ff0000") // returns "#fff" (fallback)
 */
export function getOnColor(
    color: ColorPalette | string | undefined,
    theme?: Theme
): string {
    if (!color) return "#fff";
    const t = theme ?? getTheme();
    
    // Check if it's a palette color and has a matching "on" color
    const paletteColor = t.colors[color as ColorPalette];
    if (paletteColor) {
        const onKey = `on${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof t.colors;
        return t.colors[onKey] ?? "#fff";
    }
    
    // For custom colors, return a default
    return "#fff";
}

/**
 * Get the container color for a given color
 * @param color - Base color palette key
 * @param theme - Optional theme instance
 * @returns The container color
 */
export function getContainerColor(
    color: ColorPalette | string | undefined,
    theme?: Theme
): string | undefined {
    if (!color) return undefined;
    const t = theme ?? getTheme();
    
    const containerKey = `${color}Container` as keyof typeof t.colors;
    return t.colors[containerKey] ?? resolveColor(color, t);
}

/**
 * Get the "on container" color for a given color
 * @param color - Base color palette key
 * @param theme - Optional theme instance
 * @returns The contrasting text color for container
 */
export function getOnContainerColor(
    color: ColorPalette | string | undefined,
    theme?: Theme
): string {
    if (!color) return "#000";
    const t = theme ?? getTheme();
    
    const onContainerKey = `on${color.charAt(0).toUpperCase()}${color.slice(1)}Container` as keyof typeof t.colors;
    return t.colors[onContainerKey] ?? getOnColor(color, t);
}

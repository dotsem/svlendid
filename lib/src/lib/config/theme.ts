import { getContext, setContext } from "svelte";
import type { ColorPaletteValues } from "$package/types/colorPalette.type.js";
import type {
    SpacingValues,
    RadiusValues,
    ZIndexValues,
    ContainerValues,
    BreakpointValues,
    BoxShadowValues,
} from "$package/types/layout.type.js";
import type { FontTheme, TransitionValues, Font } from "$package/types/theme.type.js";
import { defaultLightTheme, defaultDarkTheme } from "./colorPalette.default.js";
import {
    defaultSpacing,
    defaultRadius,
    defaultZIndex,
    defaultContainer,
    defaultBreakpoints,
    defaultBoxShadow,
} from "./layout.default.js";
import { defaultFontTheme, defaultTransitions } from "./theme.default.js";

const THEME_CONTEXT_KEY = Symbol.for("svlendid-theme");

/**
 * Click/interaction effect types for buttons and clickables
 * - scale: Button scales down slightly on click (default)
 * - ripple: Material Design ripple effect
 * - lift: Button lifts up on hover, presses down on click
 * - none: No effect
 */
export type ClickEffect = "scale" | "ripple" | "lift" | "none";

/**
 * Complete theme configuration
 * All properties are optional - defaults will be used for any missing values
 */
export interface ThemeConfig {
    colors?: Partial<ColorPaletteValues>;
    darkColors?: Partial<ColorPaletteValues>;
    spacing?: Partial<SpacingValues>;
    radius?: Partial<RadiusValues>;
    zIndex?: Partial<ZIndexValues>;
    container?: Partial<ContainerValues>;
    breakpoints?: Partial<BreakpointValues>;
    boxShadow?: Partial<BoxShadowValues>;
    fonts?: { [K in keyof FontTheme]?: Partial<Font> };
    transitions?: Partial<TransitionValues>;
    /** Global click effect for buttons and clickables */
    clickEffect?: ClickEffect;
}

/**
 * Resolved theme with all values filled in
 */
export interface Theme {
    colors: ColorPaletteValues;
    darkColors: ColorPaletteValues;
    spacing: SpacingValues;
    radius: RadiusValues;
    zIndex: ZIndexValues;
    container: ContainerValues;
    breakpoints: BreakpointValues;
    boxShadow: BoxShadowValues;
    fonts: FontTheme;
    transitions: TransitionValues;
    clickEffect: ClickEffect;
}

/**
 * Creates a complete theme by merging user config with defaults
 */
export function createTheme(config: ThemeConfig = {}): Theme {
    const mergedFonts = { ...defaultFontTheme };

    if (config.fonts) {
        for (const [key, value] of Object.entries(config.fonts)) {
            const k = key as keyof FontTheme;
            if (mergedFonts[k]) {
                mergedFonts[k] = { ...mergedFonts[k], ...value } as Font;
            }
        }
    }

    return {
        colors: { ...defaultLightTheme, ...config.colors },
        darkColors: { ...defaultDarkTheme, ...config.darkColors },
        spacing: { ...defaultSpacing, ...config.spacing },
        radius: { ...defaultRadius, ...config.radius },
        zIndex: { ...defaultZIndex, ...config.zIndex },
        container: { ...defaultContainer, ...config.container },
        breakpoints: { ...defaultBreakpoints, ...config.breakpoints },
        boxShadow: { ...defaultBoxShadow, ...config.boxShadow },
        fonts: mergedFonts,
        transitions: { ...defaultTransitions, ...config.transitions },
        clickEffect: config.clickEffect ?? "scale",
    };
}

/**
 * Default theme instance
 */
export const defaultTheme: Theme = createTheme();

/**
 * Set theme in Svelte context (call this in your root layout)
 */
export function setThemeContext(theme: Theme = defaultTheme): void {
    setContext(THEME_CONTEXT_KEY, theme);
}

/**
 * Get theme from Svelte context
 * Returns default theme if no context is set
 */
export function getTheme(): Theme {
    return getContext<Theme>(THEME_CONTEXT_KEY) ?? defaultTheme;
}

/**
 * Shorthand helpers to access specific theme parts
 */
export function useColors(): ColorPaletteValues {
    return getTheme().colors;
}

export function useSpacing(): SpacingValues {
    return getTheme().spacing;
}

export function useRadius(): RadiusValues {
    return getTheme().radius;
}

export function useBoxShadow(): BoxShadowValues {
    return getTheme().boxShadow;
}

export function useZIndex(): ZIndexValues {
    return getTheme().zIndex;
}

export function useFonts(): FontTheme {
    return getTheme().fonts;
}

export function useTransitions(): TransitionValues {
    return getTheme().transitions;
}

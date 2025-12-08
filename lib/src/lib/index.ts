// Svlendid - A Flutter-inspired component library for Svelte 5

// ============================================
// Theme & Configuration
// ============================================
export {
    createTheme,
    defaultTheme,
    setThemeContext,
    getTheme,
    useColors,
    useSpacing,
    useRadius,
    useBoxShadow,
    useZIndex,
    useFonts,
    useTransitions,
    type ThemeConfig,
    type Theme,
    type ClickEffect,
} from "$lib/config/theme.js";

export { defaultLightTheme, defaultDarkTheme } from "$lib/config/colorPalette.default.js";
export { defaultSpacing, defaultRadius, defaultBreakpoints, defaultZIndex, defaultContainer, defaultBoxShadow } from "$lib/config/layout.default.js";
export { defaultFontTheme, defaultFontWeights, defaultTransitions } from "$lib/config/theme.default.js";

// ============================================
// Types
// ============================================
export type { Color, ColorPalette, ColorPaletteValues, ThemeMode } from "$lib/types/colorPalette.type.js";
export type { Spacing, SpacingValues, Radius, RadiusValues, ZIndex, ZIndexValues, Container as ContainerSize, ContainerValues, Breakpoint, BreakpointValues, BoxShadow, BoxShadowValues } from "$lib/types/layout.type.js";
export type { Transition, TransitionValues, FontWeight, FontWeightValues, Font, FontTheme } from "$lib/types/theme.type.js";

// ============================================
// Base Components
// ============================================
export { default as ThemeProvider } from "$lib/components/base/ThemeProvider.svelte";
export { default as Button } from "$lib/components/base/Button.svelte";
export { default as Text } from "$lib/components/base/Text.svelte";
export { default as Card } from "$lib/components/base/Card.svelte";
export { default as Input } from "$lib/components/base/Input.svelte";
export { default as Divider } from "$lib/components/base/Divider.svelte";
export { default as Icon, type IconName } from "$lib/components/base/Icon.svelte";

// ============================================
// Layout Components
// ============================================
export { default as Box } from "$lib/components/layout/Box.svelte";
export { default as Flex } from "$lib/components/layout/Flex.svelte";
export { default as Stack } from "$lib/components/layout/Stack.svelte";
export { default as Column } from "$lib/components/layout/Column.svelte";
export { default as Row } from "$lib/components/layout/Row.svelte";
export { default as Center } from "$lib/components/layout/Center.svelte";
export { default as Spacer } from "$lib/components/layout/Spacer.svelte";
export { default as Expanded } from "$lib/components/layout/Expanded.svelte";
export { default as Container } from "$lib/components/layout/Container.svelte";

// ============================================
// Primitive Components - Interactable
// ============================================
export { default as Clickable } from "$lib/components/primitives/interactable/Clickable.svelte";
export { default as Draggable } from "$lib/components/primitives/interactable/Draggable.svelte";
export { default as Hoverable } from "$lib/components/primitives/interactable/Hoverable.svelte";
export { default as Followable } from "$lib/components/primitives/interactable/Followable.svelte";
export { default as Keyboard } from "$lib/components/primitives/interactable/Keyboard.svelte";
export { default as Ripple } from "$lib/components/primitives/interactable/Ripple.svelte";

// ============================================
// Primitive Components - Visibility
// ============================================
export { default as Visible } from "$lib/components/primitives/visibility/Visible.svelte";
export { default as Portal } from "$lib/components/primitives/visibility/Portal.svelte";

// ============================================
// Primitive Components - Animation
// ============================================
export { default as Animate } from "$lib/components/primitives/animation/Animate.svelte";
export type { AnimationPreset, AnimationEasing, AnimationConfig } from "$lib/types/animation.type.js";

// ============================================
// Widgets
// ============================================
export { default as Tooltip } from "$lib/components/base/Tooltip.svelte";
export { default as Badge } from "$lib/components/widgets/Badge.svelte";

// ============================================
// Utilities
// ============================================
export {
    lighten,
    darken,
    saturate,
    desaturate,
    adjustHue,
    alpha,
    opacify,
    transparentize,
    mix,
    tint,
    shade,
    complement,
    invert,
    grayscale,
    hexToRgba,
    rgbToHex,
    rgbToHsl,
    hslToRgb,
    parseColor,
    rgbaToString,
} from "$lib/utils/color.js";

export {
    resolveColor,
    resolveSpacing,
    resolveSpacingArray,
    resolveRadius,
    resolveShadow,
    alignMap,
    justifyMap,
    getOnColor,
    getContainerColor,
    getOnContainerColor,
} from "$lib/utils/style.js";

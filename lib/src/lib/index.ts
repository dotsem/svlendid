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
} from "$package/config/theme.js";

export {
    defaultLightTheme,
    defaultDarkTheme,
} from "$package/config/colorPalette.default.js";
export {
    defaultSpacing,
    defaultRadius,
    defaultBreakpoints,
    defaultZIndex,
    defaultContainer,
    defaultBoxShadow,
} from "$package/config/layout.default.js";
export {
    defaultFontTheme,
    defaultFontWeights,
    defaultTransitions,
} from "$package/config/theme.default.js";

// ============================================
// Types
// ============================================
export type {
    Color,
    ColorPalette,
    ColorPaletteValues,
    ThemeMode,
} from "$package/types/colorPalette.type.js";
export type {
    Spacing,
    SpacingValues,
    Radius,
    RadiusValues,
    ZIndex,
    ZIndexValues,
    Container as ContainerSize,
    ContainerValues,
    Breakpoint,
    BreakpointValues,
    BoxShadow,
    BoxShadowValues,
} from "$package/types/layout.type.js";
export type {
    Transition,
    TransitionValues,
    FontWeight,
    FontWeightValues,
    Font,
    FontTheme,
} from "$package/types/theme.type.js";

// ============================================
// Base Components
// ============================================
export { default as ThemeProvider } from "$package/components/base/ThemeProvider.svelte";
export { default as Button } from "$package/components/base/Button.svelte";
export { default as Text } from "$package/components/base/Text.svelte";
export { default as Card } from "$package/components/base/Card.svelte";
export { default as Input } from "$package/components/base/Input.svelte";
export { default as Divider } from "$package/components/base/Divider.svelte";
export {
    default as Icon,
    type IconName,
} from "$package/components/base/Icon.svelte";

// ============================================
// Layout Components
// ============================================
export { default as Box } from "$package/components/layout/Box.svelte";
export { default as Flex } from "$package/components/layout/Flex.svelte";
export { default as Stack } from "$package/components/layout/Stack.svelte";
export { default as Column } from "$package/components/layout/Column.svelte";
export { default as Row } from "$package/components/layout/Row.svelte";
export { default as Center } from "$package/components/layout/Center.svelte";
export { default as Spacer } from "$package/components/layout/Spacer.svelte";
export { default as Expanded } from "$package/components/layout/Expanded.svelte";
export { default as Container } from "$package/components/layout/Container.svelte";

// ============================================
// Primitive Components - Interactable
// ============================================
export { default as Clickable } from "$package/components/primitives/interactable/Clickable.svelte";
export { default as Draggable } from "$package/components/primitives/interactable/Draggable.svelte";
export { default as Hoverable } from "$package/components/primitives/interactable/Hoverable.svelte";
export { default as Followable } from "$package/components/primitives/interactable/Followable.svelte";
export { default as Keyboard } from "$package/components/primitives/interactable/Keyboard.svelte";
export { default as Ripple } from "$package/components/primitives/interactable/Ripple.svelte";

// ============================================
// Primitive Components - Visibility
// ============================================
export { default as Visible } from "$package/components/primitives/visibility/Visible.svelte";
export { default as Portal } from "$package/components/primitives/visibility/Portal.svelte";

// ============================================
// Primitive Components - Animation
// ============================================
export { default as Animate } from "$package/components/primitives/animation/Animate.svelte";
export type {
    AnimationPreset,
    AnimationEasing,
    AnimationConfig,
} from "$package/types/animation.type.js";

// ============================================
// Widgets
// ============================================
export { default as Tooltip } from "$package/components/base/Tooltip.svelte";
export { default as Badge } from "$package/components/widgets/Badge.svelte";

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
    readableColor,
    isLight,
    isDark,
    luminance,
    contrastRatio,
} from "$package/utils/color.js";

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
} from "$package/utils/style.js";

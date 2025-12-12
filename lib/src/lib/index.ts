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
    ColorProp,
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

// Form Inputs
export { default as Checkbox } from "$package/components/base/Checkbox.svelte";
export { default as Radio } from "$package/components/base/Radio.svelte";
export { default as Switch } from "$package/components/base/Switch.svelte";
export { default as Select } from "$package/components/base/Select.svelte";
export { default as Slider } from "$package/components/base/Slider.svelte";
export { default as TextArea } from "$package/components/base/TextArea.svelte";

// Display Components
export { default as Avatar } from "$package/components/base/Avatar.svelte";
export { default as Chip } from "$package/components/base/Chip.svelte";
export { default as Image } from "$package/components/base/Image.svelte";
export { default as Link } from "$package/components/base/Link.svelte";
export { default as Progress } from "$package/components/base/Progress.svelte";
export { default as CircularProgress } from "$package/components/base/CircularProgress.svelte";
export { default as Spinner } from "$package/components/base/Spinner.svelte";
export { default as Modal } from "$package/components/base/Modal.svelte";
export { default as Popup } from "$package/components/base/Popup.svelte";
export { default as Head } from "$package/components/base/Head.svelte";

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
export { default as Grid } from "$package/components/layout/Grid.svelte";

// ============================================
// Primitive Components - Interactable
// ============================================
export { default as Clickable } from "$package/components/primitives/interactable/Clickable.svelte";
export { default as Draggable } from "$package/components/primitives/interactable/Draggable.svelte";
export { default as Hoverable } from "$package/components/primitives/interactable/Hoverable.svelte";
export { default as Followable } from "$package/components/primitives/interactable/Followable.svelte";
export { default as Keyboard } from "$package/components/primitives/interactable/Keyboard.svelte";
export { default as Ripple } from "$package/components/primitives/interactable/Ripple.svelte";
export { default as FocusRing } from "$package/components/primitives/interactable/FocusRing.svelte";

// ============================================
// Primitive Components - Visibility
// ============================================
export { default as Visible } from "$package/components/primitives/visibility/Visible.svelte";
export { default as Portal } from "$package/components/primitives/visibility/Portal.svelte";
export { default as Overlay } from "$package/components/primitives/visibility/Overlay.svelte";
export { default as VisuallyHidden } from "$package/components/primitives/visibility/VisuallyHidden.svelte";
export { default as ViewPort } from "$package/components/primitives/visibility/ViewPort.svelte";

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

// Navigation Widgets
export { default as Tabs } from "$package/components/widgets/Tabs.svelte";
export { default as Breadcrumb } from "$package/components/widgets/Breadcrumb.svelte";
export { default as Pagination } from "$package/components/widgets/Pagination.svelte";
export { default as Menu } from "$package/components/widgets/Menu.svelte";
export { default as Dropdown } from "$package/components/widgets/Dropdown.svelte";

// Feedback Widgets
export { default as Alert } from "$package/components/widgets/Alert.svelte";
export { default as Toast } from "$package/components/widgets/Toast.svelte";
export { default as ToastStack } from "$package/components/widgets/ToastStack.svelte";
export {
    toastStore,
    showToast,
    showSuccess,
    showError,
    showWarning,
    showInfo,
    type ToastMessage,
} from "$package/stores/toast.js";
export { default as Skeleton } from "$package/components/widgets/Skeleton.svelte";
export { default as Dialog } from "$package/components/widgets/Dialog.svelte";
export { default as Drawer } from "$package/components/widgets/Drawer.svelte";

// Form Widgets
export { default as Form } from "$package/components/widgets/Form.svelte";
export { default as FormField } from "$package/components/widgets/FormField.svelte";
export { default as SearchInput } from "$package/components/widgets/SearchInput.svelte";

// Content Widgets
export { default as Accordion } from "$package/components/widgets/Accordion.svelte";
export { default as AccordionItem } from "$package/components/widgets/AccordionItem.svelte";
export { default as List } from "$package/components/widgets/List.svelte";
export { default as ListItem } from "$package/components/widgets/ListItem.svelte";
export { default as Table } from "$package/components/widgets/Table.svelte";
export { default as Hero } from "$package/components/widgets/Hero.svelte";
export { default as SplitSection } from "$package/components/widgets/SplitSection.svelte";

// Special Widgets
export { default as ThemeToggle } from "$package/components/widgets/ThemeToggle.svelte";
export { default as BackToTop } from "$package/components/widgets/BackToTop.svelte";
export { default as FloatingActionButton } from "$package/components/widgets/FloatingActionButton.svelte";

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

export type Color = string;
export type ColorPalette = keyof ColorPaletteValues;

/**
 * ColorProp type that preserves intellisense suggestions while allowing custom strings.
 * Use this for component props that accept color values.
 */
export type ColorProp = ColorPalette | (string & {});

export type ThemeMode = "light" | "dark" | "system";

/**
 * Color palette
 * Each color has an on variant, which should be a high contrast color
 *
 * Colors which are not user defined but used will use the default colors
 */
export interface ColorPaletteValues {
    primary?: Color;
    onPrimary?: Color;
    secondary?: Color;
    onSecondary?: Color;
    trinary?: Color;
    onTrinary?: Color;

    success?: Color;
    onSuccess?: Color;
    warning?: Color;
    onWarning?: Color;
    error?: Color;
    onError?: Color;
    info?: Color;
    onInfo?: Color;

    successContainer?: Color;
    onSuccessContainer?: Color;
    warningContainer?: Color;
    onWarningContainer?: Color;
    errorContainer?: Color;
    onErrorContainer?: Color;
    infoContainer?: Color;
    onInfoContainer?: Color;

    neutral?: Color;
    onNeutral?: Color;

    bg?: Color;
    onBg?: Color;
    surface?: Color;
    onSurface?: Color;
    surfaceVariant?: Color;
    onSurfaceVariant?: Color;

    primaryContainer?: Color;
    onPrimaryContainer?: Color;
    secondaryContainer?: Color;
    onSecondaryContainer?: Color;
    trinaryContainer?: Color;
    onTrinaryContainer?: Color;

    border?: Color;

    outline?: Color;
    outlineVariant?: Color;

    card?: Color;
    onCard?: Color;

    shadow?: Color;
}

import type { ColorPaletteValues } from "$lib/types/colorPalette.type.js";

export const defaultLightTheme: ColorPaletteValues = {
    primary: "#f97316",
    onPrimary: "#ffffff",
    primaryContainer: "#ffedd5",
    onPrimaryContainer: "#7c2d12",

    secondary: "#22c55e",
    onSecondary: "#ffffff",
    secondaryContainer: "#dcfce7",
    onSecondaryContainer: "#14532d",

    trinary: "#a855f7",
    onTrinary: "#ffffff",
    trinaryContainer: "#f3e8ff",
    onTrinaryContainer: "#3b0764",

    error: "#ef4444",
    onError: "#ffffff",
    errorContainer: "#fee2e2",
    onErrorContainer: "#7f1d1d",

    success: "#22c55e",
    onSuccess: "#ffffff",
    successContainer: "#dcfce7",
    onSuccessContainer: "#14532d",

    warning: "#f59e0b",
    onWarning: "#ffffff",
    warningContainer: "#fef3c7",
    onWarningContainer: "#78350f",

    info: "#3b82f6",
    onInfo: "#ffffff",
    infoContainer: "#dbeafe",
    onInfoContainer: "#1e3a8a",

    bg: "#ffffff",
    onBg: "#1f2937",
    surface: "#eef1f3",
    onSurface: "#1f2937",
    surfaceVariant: "#f3f4f6",
    onSurfaceVariant: "#6b7280",

    border: "#e5e7eb",
    outline: "#9ca3af",
    outlineVariant: "#e5e7eb",

    card: "#cccccc",
    onCard: "#000000",

    shadow: "rgba(0,0,0,0.1)",
};

export const defaultDarkTheme: ColorPaletteValues = {
    primary: "#fb923c",
    onPrimary: "#7c2d12",
    primaryContainer: "#7c2d12",
    onPrimaryContainer: "#ffedd5",

    secondary: "#4ade80",
    onSecondary: "#14532d",
    secondaryContainer: "#14532d",
    onSecondaryContainer: "#dcfce7",

    trinary: "#c084fc",
    onTrinary: "#3b0764",
    trinaryContainer: "#581c87",
    onTrinaryContainer: "#f3e8ff",

    error: "#f87171",
    onError: "#7f1d1d",
    errorContainer: "#7f1d1d",
    onErrorContainer: "#fee2e2",

    success: "#4ade80",
    onSuccess: "#14532d",
    successContainer: "#14532d",
    onSuccessContainer: "#dcfce7",

    warning: "#fbbf24",
    onWarning: "#78350f",
    warningContainer: "#78350f",
    onWarningContainer: "#fef3c7",

    info: "#60a5fa",
    onInfo: "#1e3a8a",
    infoContainer: "#1e3a8a",
    onInfoContainer: "#dbeafe",

    bg: "#111827",
    onBg: "#f9fafb",
    surface: "#1f2937",
    onSurface: "#f9fafb",
    surfaceVariant: "#374151",
    onSurfaceVariant: "#9ca3af",

    border: "#4b5563",
    outline: "#6b7280",
    outlineVariant: "#4b5563",

    card: "#2d3947",
    onCard: "#f9fafb",

    shadow: "rgba(0,0,0,0.3)",
};

export let palette: ColorPaletteValues = defaultLightTheme;
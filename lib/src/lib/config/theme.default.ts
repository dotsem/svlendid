import type {
    Font,
    FontTheme,
    FontWeightValues,
    TransitionValues,
} from "$package/types/theme.type.js";

export const defaultFontWeights: FontWeightValues = {
    extraThin: 100,
    thin: 300,
    regular: 400,
    medium: 500,
    bold: 700,
    extrabold: 800,
};

export const defaultTransitions: TransitionValues = {
    instant: "0ms",
    fast: "100ms",
    normal: "200ms",
    slow: "400ms",
};

const baseFont: Omit<Font, "fontSize" | "lineHeight"> = {
    fontFamily:
        "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    fontWeight: "regular",
    italic: false,
    letterSpacing: "normal",
};

export const defaultFontTheme: FontTheme = {
    h1: {
        ...baseFont,
        fontSize: "2.5rem",
        lineHeight: "1.2",
        fontWeight: "bold",
    },
    h2: {
        ...baseFont,
        fontSize: "2rem",
        lineHeight: "1.25",
        fontWeight: "bold",
    },
    h3: {
        ...baseFont,
        fontSize: "1.75rem",
        lineHeight: "1.3",
        fontWeight: "bold",
    },
    h4: {
        ...baseFont,
        fontSize: "1.5rem",
        lineHeight: "1.35",
        fontWeight: "medium",
    },
    h5: {
        ...baseFont,
        fontSize: "1.25rem",
        lineHeight: "1.4",
        fontWeight: "medium",
    },
    h6: {
        ...baseFont,
        fontSize: "1rem",
        lineHeight: "1.45",
        fontWeight: "medium",
    },
    body1: { ...baseFont, fontSize: "1rem", lineHeight: "1.5" },
    body2: { ...baseFont, fontSize: "0.875rem", lineHeight: "1.5" },
    subtitle1: {
        ...baseFont,
        fontSize: "1rem",
        lineHeight: "1.5",
        fontWeight: "medium",
    },
    subtitle2: {
        ...baseFont,
        fontSize: "0.875rem",
        lineHeight: "1.5",
        fontWeight: "medium",
    },
    caption: { ...baseFont, fontSize: "0.75rem", lineHeight: "1.4" },
    overline: {
        ...baseFont,
        fontSize: "0.625rem",
        lineHeight: "1.4",
        letterSpacing: "0.1em",
    },
};

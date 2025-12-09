<!-- filepath: /home/sem/prog/html/svlendid/lib/src/lib/components/base/Text.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { FontTheme } from "$package/types/theme.type.js";

    /**
     * Text - Typography component with theme integration
     */
    type TextVariant = keyof FontTheme;

    interface Props {
        children: Snippet;
        /** Typography variant from theme */
        variant?: TextVariant;
        /** Text color from palette or custom */
        color?: ColorPalette | string;
        /** Text alignment */
        align?: "left" | "center" | "right" | "justify";
        /** Font weight override */
        weight?:
            | "extraThin"
            | "thin"
            | "regular"
            | "medium"
            | "bold"
            | "extrabold"
            | number;
        /** Font size override */
        size?: string;
        /** Line height override */
        lineHeight?: string;
        /** Letter spacing override */
        letterSpacing?: string;
        /** Make text italic */
        italic?: boolean;
        /** Text decoration */
        decoration?: "none" | "underline" | "line-through" | "overline";
        /** Text transform */
        transform?: "none" | "uppercase" | "lowercase" | "capitalize";
        /** Truncate with ellipsis after n lines (0 = no truncation) */
        maxLines?: number;
        /** Allow text to wrap */
        wrap?: boolean;
        /** HTML element to render */
        as?:
            | "p"
            | "span"
            | "h1"
            | "h2"
            | "h3"
            | "h4"
            | "h5"
            | "h6"
            | "label"
            | "div";
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        variant = "body1",
        color,
        align,
        weight,
        size,
        lineHeight,
        letterSpacing,
        italic,
        decoration,
        transform,
        maxLines,
        wrap = true,
        as = "span",
        ...props
    }: Props = $props();

    const theme = getTheme();

    // Font weight mapping
    const weightMap: Record<string, number> = {
        extraThin: 100,
        thin: 300,
        regular: 400,
        medium: 500,
        bold: 700,
        extrabold: 800,
    };

    // Get font config from theme - with fallback
    const fontConfig = $derived(theme.fonts[variant] ?? theme.fonts.body1);

    // Resolve color from palette or use as-is
    function resolveColor(
        colorValue: ColorPalette | string | undefined
    ): string | undefined {
        if (!colorValue) return undefined;
        const paletteColor = theme.colors[colorValue as ColorPalette];
        return paletteColor ?? colorValue;
    }

    // Resolve font weight
    function resolveWeight(w: typeof weight): number | undefined {
        if (w === undefined) {
            const configWeight = fontConfig.fontWeight;
            return typeof configWeight === "number"
                ? configWeight
                : (weightMap[configWeight] ?? 400);
        }
        return typeof w === "number" ? w : (weightMap[w] ?? 400);
    }

    const computedColor = $derived(resolveColor(color));
    const computedWeight = $derived(resolveWeight(weight));
    const computedSize = $derived(size ?? fontConfig.fontSize);
    const computedLineHeight = $derived(lineHeight ?? fontConfig.lineHeight);
    const computedLetterSpacing = $derived(
        letterSpacing ?? fontConfig.letterSpacing
    );
    const computedItalic = $derived(italic ?? fontConfig.italic);
</script>

<svelte:element
    this={as}
    class="text"
    class:truncate={maxLines !== undefined && maxLines > 0}
    style:color={computedColor}
    style:text-align={align}
    style:font-family={fontConfig.fontFamily}
    style:font-size={computedSize}
    style:font-weight={computedWeight}
    style:line-height={computedLineHeight}
    style:letter-spacing={computedLetterSpacing}
    style:font-style={computedItalic ? "italic" : "normal"}
    style:text-decoration={decoration}
    style:text-transform={transform}
    style:white-space={wrap ? "normal" : "nowrap"}
    style:--max-lines={maxLines}
    {...props}
>
    {@render children()}
</svelte:element>

<style>
    .text {
        margin: 0;
        padding: 0;
    }

    .truncate {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: var(--max-lines);
        line-clamp: var(--max-lines);
        overflow: hidden;
        text-overflow: ellipsis;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";
    import type { Radius, Spacing, BoxShadow } from "$lib/types/layout.type.js";
    import { 
        resolveColor, 
        resolveSpacing, 
        resolveSpacingArray, 
        resolveRadius,
        resolveShadow,
        alignMap, 
        justifyMap 
    } from "$lib/utils/style.js";

    /**
     * @component Box
     * A fundamental layout container with extensive styling options.
     * The most versatile building block for creating layouts.
     * 
     * @example
     * <Box bg="surface" padding="m" radius="m">
     *   Content goes here
     * </Box>
     */
    interface Props {
        children?: Snippet;
        /** Background color from palette or custom CSS (supports gradients) */
        bg?: ColorPalette | string;
        /** Width */
        width?: string;
        /** Height */
        height?: string;
        /** Min width */
        minWidth?: string;
        /** Min height */
        minHeight?: string;
        /** Max width */
        maxWidth?: string;
        /** Max height */
        maxHeight?: string;
        /** Padding - single value or [vertical, horizontal] or [top, right, bottom, left] */
        padding?: Spacing | string | (Spacing | string)[];
        /** Margin - single value or [vertical, horizontal] or [top, right, bottom, left] */
        margin?: Spacing | string | (Spacing | string)[];
        /** Border radius */
        radius?: Radius | string;
        /** Border */
        border?: string;
        /** Box shadow level or custom shadow */
        shadow?: BoxShadow | string;
        /** Display type */
        display?: string;
        /** Flex direction (if display is flex) */
        direction?: "row" | "column" | "row-reverse" | "column-reverse";
        /** Align items (flex) */
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        /** Justify content (flex) */
        justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
        /** Gap between children */
        gap?: Spacing | string;
        /** Flex wrap */
        wrap?: "nowrap" | "wrap" | "wrap-reverse";
        /** Overflow behavior */
        overflow?: "visible" | "hidden" | "scroll" | "auto";
        /** Position */
        position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
        /** Custom inline styles */
        style?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        bg,
        width,
        height,
        minWidth,
        minHeight,
        maxWidth,
        maxHeight,
        padding,
        margin,
        radius,
        border,
        shadow,
        display = "block",
        direction,
        align,
        justify,
        gap,
        wrap,
        overflow,
        position,
        style,
        ...props
    }: Props = $props();

    const theme = getTheme();

    // Use $derived to ensure reactivity with theme
    const computedBg = $derived(bg ? resolveColor(bg, theme) : undefined);
    const computedPadding = $derived(padding ? resolveSpacingArray(padding, theme) : undefined);
    const computedMargin = $derived(margin ? resolveSpacingArray(margin, theme) : undefined);
    const computedGap = $derived(gap ? resolveSpacing(gap, theme) : undefined);
    const computedRadius = $derived(radius ? resolveRadius(radius, theme) : undefined);
    const computedShadow = $derived(shadow ? resolveShadow(shadow, theme) : undefined);

    // Build combined style string
    const computedStyle = $derived.by(() => {
        const styles: string[] = [];
        if (computedBg) styles.push(`background: ${computedBg}`);
        if (width) styles.push(`width: ${width}`);
        if (height) styles.push(`height: ${height}`);
        if (minWidth) styles.push(`min-width: ${minWidth}`);
        if (minHeight) styles.push(`min-height: ${minHeight}`);
        if (maxWidth) styles.push(`max-width: ${maxWidth}`);
        if (maxHeight) styles.push(`max-height: ${maxHeight}`);
        if (computedPadding) styles.push(`padding: ${computedPadding}`);
        if (computedMargin) styles.push(`margin: ${computedMargin}`);
        if (computedRadius) styles.push(`border-radius: ${computedRadius}`);
        if (border) styles.push(`border: ${border}`);
        if (computedShadow) styles.push(`box-shadow: ${computedShadow}`);
        if (display) styles.push(`display: ${display}`);
        if (direction) styles.push(`flex-direction: ${direction}`);
        if (align) styles.push(`align-items: ${alignMap[align]}`);
        if (justify) styles.push(`justify-content: ${justifyMap[justify]}`);
        if (computedGap) styles.push(`gap: ${computedGap}`);
        if (wrap) styles.push(`flex-wrap: ${wrap}`);
        if (overflow) styles.push(`overflow: ${overflow}`);
        if (position) styles.push(`position: ${position}`);
        // Append custom style last so it can override
        if (style) styles.push(style);
        return styles.join('; ');
    });
</script>

<div
    class="box"
    style={computedStyle}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .box {
        box-sizing: border-box;
    }
</style>

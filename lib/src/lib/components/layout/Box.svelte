<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";
    import type { Radius, Spacing } from "$lib/types/layout.type.js";

    /**
     * Box - A fundamental layout container
     */
    interface Props {
        children?: Snippet;
        /** Background color from palette or custom */
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
        /** Box shadow level */
        shadow?: "none" | "s" | "m" | "l";
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
        ...props
    }: Props = $props();

    const theme = getTheme();

    // Resolve color from palette or use as-is
    function resolveColor(color: ColorPalette | string | undefined): string | undefined {
        if (!color) return undefined;
        const paletteColor = theme.colors[color as ColorPalette];
        return paletteColor ?? color;
    }

    // Resolve spacing from theme or use as-is
    function resolveSpacing(value: Spacing | string | undefined): string | undefined {
        if (!value) return undefined;
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    // Convert padding/margin array to CSS string
    function resolveSpacingArray(value: Spacing | string | (Spacing | string)[] | undefined): string | undefined {
        if (!value) return undefined;
        if (Array.isArray(value)) {
            return value.map(v => resolveSpacing(v)).join(" ");
        }
        return resolveSpacing(value);
    }

    // Map align/justify shorthand to CSS values
    const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };
    const justifyMap = { start: "flex-start", center: "center", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" };

    const computedBg = $derived(resolveColor(bg));
    const computedPadding = $derived(resolveSpacingArray(padding));
    const computedMargin = $derived(resolveSpacingArray(margin));
    const computedGap = $derived(resolveSpacing(gap));
    const computedRadius = $derived(radius ? (theme.radius[radius as Radius] ?? radius) : undefined);
    const computedShadow = $derived(shadow ? theme.boxShadow[shadow] : undefined);
</script>

<div
    class="box"
    style:background={computedBg}
    style:width={width}
    style:height={height}
    style:min-width={minWidth}
    style:min-height={minHeight}
    style:max-width={maxWidth}
    style:max-height={maxHeight}
    style:padding={computedPadding}
    style:margin={computedMargin}
    style:border-radius={computedRadius}
    style:border={border}
    style:box-shadow={computedShadow}
    style:display={display}
    style:flex-direction={direction}
    style:align-items={align ? alignMap[align] : undefined}
    style:justify-content={justify ? justifyMap[justify] : undefined}
    style:gap={computedGap}
    style:flex-wrap={wrap}
    style:overflow={overflow}
    style:position={position}
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

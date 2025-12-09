<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { Spacing } from "$package/types/layout.type.js";

    /**
     * Divider - Visual separator line
     */
    interface Props {
        /** Orientation */
        direction?: "horizontal" | "vertical";
        /** Color from palette or custom */
        color?: ColorPalette | string;
        /** Thickness */
        thickness?: string;
        /** Margin around the divider */
        margin?: Spacing | string;
        /** Indent from start */
        indent?: string;
        /** Indent from end */
        endIndent?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        direction = "horizontal",
        color,
        thickness = "1px",
        margin,
        indent = "0",
        endIndent = "0",
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveColor(c: ColorPalette | string | undefined): string {
        if (!c) return theme.colors.outline ?? "#e5e7eb";
        const paletteColor = theme.colors[c as ColorPalette];
        return paletteColor ?? c;
    }

    function resolveSpacing(value: Spacing | string | undefined): string {
        if (!value) return "0";
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    const computedColor = $derived(resolveColor(color));
    const computedMargin = $derived(resolveSpacing(margin));
</script>

{#if direction === "horizontal"}
    <hr
        class="divider horizontal"
        style:background-color={computedColor}
        style:height={thickness}
        style:margin-top={computedMargin}
        style:margin-bottom={computedMargin}
        style:margin-left={indent}
        style:margin-right={endIndent}
        {...props}
    />
{:else}
    <div
        class="divider vertical"
        style:background-color={computedColor}
        style:width={thickness}
        style:margin-left={computedMargin}
        style:margin-right={computedMargin}
        style:margin-top={indent}
        style:margin-bottom={endIndent}
        {...props}
    ></div>
{/if}

<style>
    .divider {
        border: none;
        flex-shrink: 0;
    }

    .horizontal {
        width: 100%;
    }

    .vertical {
        height: 100%;
        align-self: stretch;
    }
</style>

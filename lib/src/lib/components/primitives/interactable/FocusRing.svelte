<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorProp } from "$package/types/colorPalette.type.js";

    /**
     * FocusRing - A consistent focus indicator for interactive elements
     * Renders an absolutely positioned focus ring around the parent element
     */
    interface Props {
        /** Whether the focus ring is visible */
        visible?: boolean;
        /** Color of the focus ring */
        color?: ColorProp;
        /** Offset from the element edge */
        offset?: string;
        /** Width of the focus ring */
        width?: string;
        /** Border radius (inherits from parent if not set) */
        radius?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        visible = false,
        color,
        offset = "2px",
        width = "2px",
        radius,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(() => {
        if (!color) return theme.colors.primary;
        const paletteColor = theme.colors[color as ColorPalette];
        return paletteColor ?? color;
    });
</script>

{#if visible}
    <span
        class="focus-ring"
        style:--ring-color={computedColor()}
        style:--ring-offset={offset}
        style:--ring-width={width}
        style:--ring-radius={radius ?? "inherit"}
        {...props}
    ></span>
{/if}

<style>
    .focus-ring {
        position: absolute;
        inset: calc(-1 * var(--ring-offset));
        border: var(--ring-width) solid var(--ring-color);
        border-radius: var(--ring-radius);
        pointer-events: none;
    }
</style>

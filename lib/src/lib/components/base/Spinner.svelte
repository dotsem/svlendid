<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Spinner - A simple loading spinner
     */
    type SpinnerSize = "xs" | "s" | "m" | "l" | "xl";

    interface Props {
        /** Color scheme */
        color?: ColorPalette | string;
        /** Size preset */
        size?: SpinnerSize;
        /** Custom size override */
        customSize?: string;
        /** Stroke width */
        strokeWidth?: number;
        /** Animation speed (e.g., "0.75s") */
        speed?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        color = "primary",
        size = "m",
        customSize,
        strokeWidth,
        speed = "0.75s",
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        xs: { size: "16px", stroke: 2 },
        s: { size: "20px", stroke: 2 },
        m: { size: "24px", stroke: 3 },
        l: { size: "32px", stroke: 3 },
        xl: { size: "48px", stroke: 4 },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedSize = $derived(customSize ?? sizeConfig[size].size);
    const computedStroke = $derived(strokeWidth ?? sizeConfig[size].stroke);
</script>

<svg
    class="spinner"
    viewBox="0 0 24 24"
    style:--spinner-size={computedSize}
    style:--spinner-color={computedColor}
    style:--spinner-speed={speed}
    role="status"
    aria-label="Loading"
    {...props}
>
    <circle
        class="spinner-circle"
        cx="12"
        cy="12"
        r={10 - computedStroke / 2}
        fill="none"
        stroke-width={computedStroke}
    />
</svg>

<style>
    .spinner {
        width: var(--spinner-size);
        height: var(--spinner-size);
        animation: spin var(--spinner-speed) linear infinite;
    }

    .spinner-circle {
        stroke: var(--spinner-color);
        stroke-linecap: round;
        stroke-dasharray: 60, 200;
        stroke-dashoffset: 0;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>

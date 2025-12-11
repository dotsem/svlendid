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

    // Calculate circumference for the dash animation
    const radius = $derived(10 - computedStroke / 2);
    const circumference = $derived(2 * Math.PI * radius);
</script>

<svg
    class="spinner"
    viewBox="0 0 24 24"
    style:--spinner-size={computedSize}
    style:--spinner-color={computedColor}
    style:--spinner-speed={speed}
    style:--spinner-circumference={circumference}
    role="status"
    aria-label="Loading"
    {...props}
>
    <!-- Track circle (faint background) -->
    <circle
        class="spinner-track"
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke-width={computedStroke}
    />
    <!-- Animated arc -->
    <circle
        class="spinner-arc"
        cx="12"
        cy="12"
        r={radius}
        fill="none"
        stroke-width={computedStroke}
        stroke-dasharray={`${circumference * 0.25} ${circumference * 0.75}`}
    />
</svg>

<style>
    .spinner {
        width: var(--spinner-size);
        height: var(--spinner-size);
        animation: spinner-rotate var(--spinner-speed) linear infinite;
    }

    .spinner-track {
        stroke: var(--spinner-color);
        opacity: 0.2;
    }

    .spinner-arc {
        stroke: var(--spinner-color);
        stroke-linecap: round;
        transform-origin: center;
        animation: spinner-dash calc(var(--spinner-speed) * 2) ease-in-out
            infinite;
    }

    @keyframes spinner-rotate {
        to {
            transform: rotate(360deg);
        }
    }

    @keyframes spinner-dash {
        0% {
            stroke-dasharray: calc(var(--spinner-circumference) * 0.1)
                calc(var(--spinner-circumference) * 0.9);
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: calc(var(--spinner-circumference) * 0.7)
                calc(var(--spinner-circumference) * 0.3);
            stroke-dashoffset: calc(var(--spinner-circumference) * -0.2);
        }
        100% {
            stroke-dasharray: calc(var(--spinner-circumference) * 0.1)
                calc(var(--spinner-circumference) * 0.9);
            stroke-dashoffset: calc(var(--spinner-circumference) * -0.9);
        }
    }
</style>

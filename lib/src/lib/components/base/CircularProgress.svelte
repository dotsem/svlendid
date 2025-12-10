<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * CircularProgress - A circular progress indicator
     */
    type CircularProgressSize = "s" | "m" | "l" | "xl";

    interface Props {
        /** Current value (0-100 or 0-max) */
        value?: number;
        /** Maximum value */
        max?: number;
        /** Color scheme */
        color?: ColorPalette;
        /** Size preset */
        size?: CircularProgressSize;
        /** Custom size override */
        customSize?: string;
        /** Stroke width */
        strokeWidth?: number;
        /** Indeterminate (loading) state */
        indeterminate?: boolean;
        /** Show percentage label */
        showLabel?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = 0,
        max = 100,
        color = "primary",
        size = "m",
        customSize,
        strokeWidth,
        indeterminate = false,
        showLabel = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { size: "24px", stroke: 3, fontSize: "0.5rem" },
        m: { size: "40px", stroke: 4, fontSize: "0.75rem" },
        l: { size: "56px", stroke: 5, fontSize: "1rem" },
        xl: { size: "80px", stroke: 6, fontSize: "1.25rem" },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedSize = $derived(customSize ?? sizeConfig[size].size);
    const computedStroke = $derived(strokeWidth ?? sizeConfig[size].stroke);
    const percentage = $derived(Math.min(100, (value / max) * 100));

    const radius = $derived(50 - computedStroke / 2);
    const circumference = $derived(2 * Math.PI * radius);
    const strokeDashoffset = $derived(
        circumference - (percentage / 100) * circumference
    );
</script>

<div
    class="circular-progress"
    class:indeterminate
    style:--cp-size={computedSize}
    style:--cp-color={computedColor}
    style:--cp-bg={theme.colors.surfaceVariant}
    style:--cp-font-size={sizeConfig[size].fontSize}
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={0}
    aria-valuemax={max}
    {...props}
>
    <svg viewBox="0 0 100 100" class="circular-progress-svg">
        <circle
            class="circular-progress-track"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke-width={computedStroke}
        />
        <circle
            class="circular-progress-bar"
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke-width={computedStroke}
            stroke-dasharray={circumference}
            stroke-dashoffset={indeterminate
                ? circumference * 0.75
                : strokeDashoffset}
            stroke-linecap="round"
        />
    </svg>
    {#if showLabel && !indeterminate}
        <span class="circular-progress-label">{Math.round(percentage)}%</span>
    {/if}
</div>

<style>
    .circular-progress {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--cp-size);
        height: var(--cp-size);
    }

    .circular-progress-svg {
        width: 100%;
        height: 100%;
        transform: rotate(-90deg);
    }

    .circular-progress-track {
        stroke: var(--cp-bg);
    }

    .circular-progress-bar {
        stroke: var(--cp-color);
        transition: stroke-dashoffset 0.3s ease;
    }

    .indeterminate .circular-progress-svg {
        animation: rotate 1.5s linear infinite;
    }

    .indeterminate .circular-progress-bar {
        animation: dash 1.5s ease-in-out infinite;
    }

    @keyframes rotate {
        100% {
            transform: rotate(270deg);
        }
    }

    @keyframes dash {
        0% {
            stroke-dashoffset: 235.6;
        }
        50% {
            stroke-dashoffset: 78.5;
        }
        100% {
            stroke-dashoffset: 235.6;
        }
    }

    .circular-progress-label {
        position: absolute;
        font-size: var(--cp-font-size);
        font-weight: 600;
        font-variant-numeric: tabular-nums;
    }
</style>

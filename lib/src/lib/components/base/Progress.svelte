<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Progress - A linear progress bar
     */
    type ProgressSize = "s" | "m" | "l";

    interface Props {
        /** Current value (0-100 or 0-max) */
        value?: number;
        /** Maximum value */
        max?: number;
        /** Color scheme */
        color?: ColorPalette;
        /** Progress bar height */
        size?: ProgressSize;
        /** Indeterminate (loading) state */
        indeterminate?: boolean;
        /** Show percentage label */
        showLabel?: boolean;
        /** Border radius */
        rounded?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = 0,
        max = 100,
        color = "primary",
        size = "m",
        indeterminate = false,
        showLabel = false,
        rounded = true,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: "4px",
        m: "8px",
        l: "12px",
    };

    const computedColor = $derived(resolveColor(color, theme));
    const percentage = $derived(Math.min(100, (value / max) * 100));
    const computedRadius = $derived(rounded ? "9999px" : "0");
</script>

<div
    class="progress-wrapper"
    class:indeterminate
    style:--progress-height={sizeConfig[size]}
    style:--progress-color={computedColor}
    style:--progress-bg={theme.colors.surfaceVariant}
    style:--progress-radius={computedRadius}
    style:--progress-value={`${percentage}%`}
    role="progressbar"
    aria-valuenow={indeterminate ? undefined : value}
    aria-valuemin={0}
    aria-valuemax={max}
    {...props}
>
    <div class="progress-track">
        <div class="progress-bar"></div>
    </div>
    {#if showLabel && !indeterminate}
        <span class="progress-label">{Math.round(percentage)}%</span>
    {/if}
</div>

<style>
    .progress-wrapper {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
    }

    .progress-track {
        flex: 1;
        height: var(--progress-height);
        background: var(--progress-bg);
        border-radius: var(--progress-radius);
        overflow: hidden;
    }

    .progress-bar {
        height: 100%;
        width: var(--progress-value);
        background: var(--progress-color);
        border-radius: var(--progress-radius);
        transition: width 0.3s ease;
    }

    .indeterminate .progress-bar {
        width: 30%;
        animation: indeterminate 1.5s infinite ease-in-out;
    }

    @keyframes indeterminate {
        0% {
            transform: translateX(-100%);
        }
        50% {
            transform: translateX(200%);
        }
        100% {
            transform: translateX(-100%);
        }
    }

    .progress-label {
        min-width: 3ch;
        font-size: 0.875rem;
        font-variant-numeric: tabular-nums;
        text-align: right;
    }
</style>

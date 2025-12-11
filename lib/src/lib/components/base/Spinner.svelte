<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Spinner - A loading spinner with multiple animation variants
     */
    type SpinnerSize = "xs" | "s" | "m" | "l" | "xl";
    type SpinnerVariant = "spin" | "pulse" | "dots";
    type SpinnerStyle = "smooth" | "steps" | "bounce";

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
        /** Animation variant */
        variant?: SpinnerVariant;
        /** Animation style (sub-variant) */
        animationStyle?: SpinnerStyle;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        color = "primary",
        size = "m",
        customSize,
        strokeWidth,
        speed = "0.75s",
        variant = "spin",
        animationStyle = "smooth",
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

    const animationClass = $derived(`${variant}-${animationStyle}`);
</script>

{#if variant === "dots"}
    <div
        class="spinner-dots {animationClass}"
        style:--spinner-size={computedSize}
        style:--spinner-color={computedColor}
        style:--spinner-speed={speed}
        role="status"
        aria-label="Loading"
        {...props}
    >
        <span class="dot"></span>
        <span class="dot"></span>
        <span class="dot"></span>
    </div>
{:else if variant === "pulse"}
    <div
        class="spinner-pulse {animationClass}"
        style:--spinner-size={computedSize}
        style:--spinner-color={computedColor}
        style:--spinner-speed={speed}
        role="status"
        aria-label="Loading"
        {...props}
    ></div>
{:else}
    <svg
        class="spinner-circle {animationClass}"
        viewBox="0 0 50 50"
        style:--spinner-size={computedSize}
        style:--spinner-color={computedColor}
        style:--spinner-speed={speed}
        role="status"
        aria-label="Loading"
        {...props}
    >
        <circle
            class="track"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width={computedStroke}
        />
        <circle
            class="arc"
            cx="25"
            cy="25"
            r="20"
            fill="none"
            stroke-width={computedStroke}
            stroke-linecap="round"
        />
    </svg>
{/if}

<style>
    .spinner-circle {
        width: var(--spinner-size);
        height: var(--spinner-size);
    }

    .spinner-circle .track {
        stroke: var(--spinner-color);
        opacity: 0.2;
    }

    .spinner-circle .arc {
        stroke: var(--spinner-color);
        stroke-dasharray: 90, 150;
        stroke-dashoffset: 0;
        transform-origin: center;
    }

    /* Spin Smooth */
    .spin-smooth {
        animation: spin-smooth var(--spinner-speed) linear infinite;
    }

    @keyframes spin-smooth {
        100% {
            transform: rotate(360deg);
        }
    }

    /* Spin Steps */
    .spin-steps {
        animation: spin-steps var(--spinner-speed) steps(12) infinite;
    }

    @keyframes spin-steps {
        100% {
            transform: rotate(360deg);
        }
    }

    /* Spin Bounce */
    .spin-bounce {
        animation: spin-bounce var(--spinner-speed) ease-in-out infinite;
    }

    @keyframes spin-bounce {
        0% {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(200deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }

    /* Pulse variant */
    .spinner-pulse {
        width: var(--spinner-size);
        height: var(--spinner-size);
        border-radius: 50%;
        background: var(--spinner-color);
    }

    .pulse-smooth {
        animation: pulse-smooth var(--spinner-speed) ease-in-out infinite;
    }

    @keyframes pulse-smooth {
        0%,
        100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .pulse-steps {
        animation: pulse-steps var(--spinner-speed) steps(4) infinite;
    }

    @keyframes pulse-steps {
        0%,
        100% {
            transform: scale(0.8);
            opacity: 0.5;
        }
        50% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .pulse-bounce {
        animation: pulse-bounce var(--spinner-speed) ease-out infinite;
    }

    @keyframes pulse-bounce {
        0% {
            transform: scale(0.5);
            opacity: 0.3;
        }
        50% {
            transform: scale(1.1);
            opacity: 1;
        }
        100% {
            transform: scale(0.5);
            opacity: 0.3;
        }
    }

    /* Dots variant */
    .spinner-dots {
        display: flex;
        gap: calc(var(--spinner-size) * 0.2);
        align-items: center;
    }

    .spinner-dots .dot {
        width: calc(var(--spinner-size) * 0.3);
        height: calc(var(--spinner-size) * 0.3);
        border-radius: 50%;
        background: var(--spinner-color);
    }

    .dots-smooth .dot {
        animation: dots-smooth var(--spinner-speed) ease-in-out infinite;
    }

    .dots-smooth .dot:nth-child(2) {
        animation-delay: calc(var(--spinner-speed) * 0.15);
    }
    .dots-smooth .dot:nth-child(3) {
        animation-delay: calc(var(--spinner-speed) * 0.3);
    }

    @keyframes dots-smooth {
        0%,
        80%,
        100% {
            transform: scale(0.6);
            opacity: 0.5;
        }
        40% {
            transform: scale(1);
            opacity: 1;
        }
    }

    .dots-steps .dot {
        animation: dots-steps var(--spinner-speed) steps(2) infinite;
    }

    .dots-steps .dot:nth-child(2) {
        animation-delay: calc(var(--spinner-speed) * 0.33);
    }
    .dots-steps .dot:nth-child(3) {
        animation-delay: calc(var(--spinner-speed) * 0.66);
    }

    @keyframes dots-steps {
        0%,
        100% {
            opacity: 0.3;
        }
        50% {
            opacity: 1;
        }
    }

    .dots-bounce .dot {
        animation: dots-bounce var(--spinner-speed) ease infinite;
    }

    .dots-bounce .dot:nth-child(2) {
        animation-delay: calc(var(--spinner-speed) * 0.1);
    }
    .dots-bounce .dot:nth-child(3) {
        animation-delay: calc(var(--spinner-speed) * 0.2);
    }

    @keyframes dots-bounce {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(calc(var(--spinner-size) * -0.3));
        }
    }
</style>

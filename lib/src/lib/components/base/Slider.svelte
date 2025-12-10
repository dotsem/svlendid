<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Slider - A range slider input component
     */
    type SliderSize = "s" | "m" | "l";

    interface Props {
        /** Current value */
        value?: number;
        /** Minimum value */
        min?: number;
        /** Maximum value */
        max?: number;
        /** Step increment */
        step?: number;
        /** Disabled state */
        disabled?: boolean;
        /** Color scheme */
        color?: ColorPalette;
        /** Slider size */
        size?: SliderSize;
        /** Show current value label */
        showValue?: boolean;
        /** Name for form submission */
        name?: string;
        /** Change handler */
        onchange?: (value: number) => void;
        /** Input handler (fires during drag) */
        oninput?: (value: number) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = $bindable(50),
        min = 0,
        max = 100,
        step = 1,
        disabled = false,
        color = "primary",
        size = "m",
        showValue = false,
        name,
        onchange,
        oninput,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { track: "4px", thumb: "14px" },
        m: { track: "6px", thumb: "18px" },
        l: { track: "8px", thumb: "22px" },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const percentage = $derived(((value - min) / (max - min)) * 100);

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = parseFloat(target.value);
        oninput?.(value);
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        value = parseFloat(target.value);
        onchange?.(value);
    }
</script>

<div
    class="slider-wrapper"
    class:disabled
    style:--slider-track-height={sizeConfig[size].track}
    style:--slider-thumb-size={sizeConfig[size].thumb}
    style:--slider-color={computedColor}
    style:--slider-percentage={`${percentage}%`}
    style:--slider-transition={theme.transitions.fast}
    style:--slider-track-bg={theme.colors.outline}
    {...props}
>
    <input
        type="range"
        class="slider-input"
        {value}
        {min}
        {max}
        {step}
        {disabled}
        {name}
        oninput={handleInput}
        onchange={handleChange}
    />
    {#if showValue}
        <span class="slider-value">{value}</span>
    {/if}
</div>

<style>
    .slider-wrapper {
        display: flex;
        align-items: center;
        gap: 1rem;
        width: 100%;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .slider-input {
        appearance: none;
        flex: 1;
        height: var(--slider-track-height);
        background: linear-gradient(
            to right,
            var(--slider-color) 0%,
            var(--slider-color) var(--slider-percentage),
            var(--slider-track-bg) var(--slider-percentage),
            var(--slider-track-bg) 100%
        );
        border-radius: calc(var(--slider-track-height) / 2);
        cursor: pointer;

        &::-webkit-slider-thumb {
            appearance: none;
            width: var(--slider-thumb-size);
            height: var(--slider-thumb-size);
            background: var(--slider-color);
            border-radius: 50%;
            cursor: grab;
            transition: transform var(--slider-transition) ease;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

            &:hover {
                transform: scale(1.1);
            }

            &:active {
                cursor: grabbing;
                transform: scale(1.15);
            }
        }

        &::-moz-range-thumb {
            width: var(--slider-thumb-size);
            height: var(--slider-thumb-size);
            background: var(--slider-color);
            border: none;
            border-radius: 50%;
            cursor: grab;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        &:focus-visible {
            outline: none;

            &::-webkit-slider-thumb {
                outline: 2px solid var(--slider-color);
                outline-offset: 2px;
            }
        }
    }

    .slider-value {
        min-width: 3ch;
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
</style>

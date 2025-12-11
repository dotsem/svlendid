<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Radio - A themed radio button input with optional label
     */
    type RadioSize = "s" | "m" | "l";

    interface Props {
        /** Whether the radio is checked */
        checked?: boolean;
        /** Label text for the radio button */
        label?: string;
        /** Name attribute for radio group */
        group: string;
        /** Value for this radio option */
        value: string;
        /** Disabled state */
        disabled?: boolean;
        /** Color scheme from the palette */
        color?: ColorPalette;
        /** Radio size */
        size?: RadioSize;
        /** Change handler */
        onchange?: (value: string) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        checked = false,
        label,
        group,
        value,
        disabled = false,
        color = "primary",
        size = "m",
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { outer: "16px", inner: "8px", fontSize: "0.875rem" },
        m: { outer: "20px", inner: "10px", fontSize: "1rem" },
        l: { outer: "24px", inner: "12px", fontSize: "1.125rem" },
    };

    const computedColor = $derived(resolveColor(color, theme));

    function handleChange() {
        onchange?.(value);
    }
</script>

<label
    class="radio-wrapper"
    class:disabled
    style:--radio-size={sizeConfig[size].outer}
    style:--radio-inner-size={sizeConfig[size].inner}
    style:--radio-color={computedColor}
    style:--radio-font-size={sizeConfig[size].fontSize}
    style:--radio-transition={theme.transitions.fast}
    {...props}
>
    <input
        type="radio"
        class="radio-input"
        {checked}
        {disabled}
        {group}
        {value}
        onchange={handleChange}
    />
    <span class="radio-circle">
        <span class="radio-dot"></span>
    </span>
    {#if label}
        <span class="radio-label">{label}</span>
    {/if}
</label>

<style>
    .radio-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: var(--radio-font-size);
        user-select: none;

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .radio-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .radio-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--radio-size);
        height: var(--radio-size);
        border: 2px solid var(--radio-color);
        border-radius: 50%;
        background: transparent;
        transition: border-color var(--radio-transition) ease;
    }

    .radio-dot {
        width: var(--radio-inner-size);
        height: var(--radio-inner-size);
        border-radius: 50%;
        background: var(--radio-color);
        transform: scale(0);
        transition: transform var(--radio-transition) ease;

        .radio-input:checked + .radio-circle & {
            transform: scale(1);
        }
    }

    .radio-input:focus-visible + .radio-circle {
        outline: 2px solid var(--radio-color);
        outline-offset: 2px;
    }

    .radio-label {
        color: inherit;
    }
</style>

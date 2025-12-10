<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveColor, resolveRadius } from "$package/utils/style.js";

    /**
     * Select - A dropdown select component
     */
    type SelectVariant = "filled" | "outlined";
    type SelectSize = "s" | "m" | "l";

    interface SelectOption {
        value: string;
        label: string;
        disabled?: boolean;
    }

    interface Props {
        /** Current selected value */
        value?: string;
        /** Available options */
        options: SelectOption[];
        /** Placeholder text when no value selected */
        placeholder?: string;
        /** Disabled state */
        disabled?: boolean;
        /** Color scheme */
        color?: ColorPalette;
        /** Select variant */
        variant?: SelectVariant;
        /** Select size */
        size?: SelectSize;
        /** Border radius */
        radius?: Radius | string;
        /** Name for form submission */
        name?: string;
        /** Full width */
        fullWidth?: boolean;
        /** Error state */
        error?: boolean;
        /** Change handler */
        onchange?: (value: string) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = $bindable(""),
        options,
        placeholder = "Select an option",
        disabled = false,
        color = "primary",
        variant = "outlined",
        size = "m",
        radius,
        name,
        fullWidth = false,
        error = false,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: {
            padding: "0.375rem 0.75rem",
            fontSize: "0.875rem",
            height: "32px",
        },
        m: { padding: "0.5rem 1rem", fontSize: "1rem", height: "40px" },
        l: { padding: "0.75rem 1.25rem", fontSize: "1.125rem", height: "48px" },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedRadius = $derived(
        resolveRadius(radius, theme) ?? theme.radius.m
    );
    const computedBg = $derived(
        variant === "filled" ? theme.colors.surfaceVariant : "transparent"
    );
    const computedBorder = $derived(
        variant === "outlined"
            ? error
                ? `1px solid ${theme.colors.error}`
                : `1px solid ${theme.colors.outline}`
            : "none"
    );

    function handleChange(event: Event) {
        const target = event.target as HTMLSelectElement;
        value = target.value;
        onchange?.(value);
    }
</script>

<div
    class="select-wrapper"
    class:full-width={fullWidth}
    class:disabled
    style:--select-padding={sizeConfig[size].padding}
    style:--select-font-size={sizeConfig[size].fontSize}
    style:--select-height={sizeConfig[size].height}
    style:--select-color={computedColor}
    style:--select-bg={computedBg}
    style:--select-border={computedBorder}
    style:--select-radius={computedRadius}
    style:--select-transition={theme.transitions.fast}
    {...props}
>
    <select
        class="select-input"
        {disabled}
        {name}
        {value}
        onchange={handleChange}
        aria-invalid={error}
    >
        {#if placeholder}
            <option value="" disabled>{placeholder}</option>
        {/if}
        {#each options as option}
            <option value={option.value} disabled={option.disabled}>
                {option.label}
            </option>
        {/each}
    </select>
    <span class="select-arrow">
        <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    </span>
</div>

<style>
    .select-wrapper {
        position: relative;
        display: inline-flex;
        align-items: center;

        &.full-width {
            width: 100%;
        }

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .select-input {
        appearance: none;
        width: 100%;
        height: var(--select-height);
        padding: var(--select-padding);
        padding-right: 2.5rem;
        font-size: var(--select-font-size);
        font-family: inherit;
        color: inherit;
        background: var(--select-bg);
        border: var(--select-border);
        border-radius: var(--select-radius);
        cursor: pointer;
        transition:
            border-color var(--select-transition) ease,
            box-shadow var(--select-transition) ease;

        &:focus {
            outline: none;
            border-color: var(--select-color);
            box-shadow: 0 0 0 2px
                color-mix(in srgb, var(--select-color) 20%, transparent);
        }
    }

    .select-arrow {
        position: absolute;
        right: 0.75rem;
        pointer-events: none;
        display: flex;
        align-items: center;
        color: inherit;
        opacity: 0.6;
    }
</style>

<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Checkbox - A themed checkbox input with optional label
     */
    type CheckboxSize = "s" | "m" | "l";

    interface Props {
        /** Whether the checkbox is checked */
        checked?: boolean;
        /** Label text for the checkbox */
        label?: string;
        /** Disabled state */
        disabled?: boolean;
        /** Color scheme from the palette */
        color?: ColorPalette;
        /** Checkbox size */
        size?: CheckboxSize;
        /** Name attribute for form submission */
        name?: string;
        /** Value attribute for form submission */
        value?: string;
        /** Change handler */
        onchange?: (checked: boolean) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        checked = $bindable(false),
        label,
        disabled = false,
        color = "primary",
        size = "m",
        name,
        value,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { box: "16px", icon: "12px", fontSize: "0.875rem" },
        m: { box: "20px", icon: "14px", fontSize: "1rem" },
        l: { box: "24px", icon: "18px", fontSize: "1.125rem" },
    };

    const computedColor = $derived(resolveColor(color, theme));

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onchange?.(checked);
    }
</script>

<label
    class="checkbox-wrapper"
    class:disabled
    style:--checkbox-size={sizeConfig[size].box}
    style:--checkbox-icon-size={sizeConfig[size].icon}
    style:--checkbox-color={computedColor}
    style:--checkbox-font-size={sizeConfig[size].fontSize}
    style:--checkbox-transition={theme.transitions.fast}
    style:--checkbox-radius={theme.radius.xs}
    {...props}
>
    <input
        type="checkbox"
        class="checkbox-input"
        {checked}
        {disabled}
        {name}
        {value}
        onchange={handleChange}
    />
    <span class="checkbox-box">
        {#if checked}
            <svg
                class="checkbox-icon"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="3"
            >
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
        {/if}
    </span>
    {#if label}
        <span class="checkbox-label">{label}</span>
    {/if}
</label>

<style>
    .checkbox-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;
        font-size: var(--checkbox-font-size);
        user-select: none;

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .checkbox-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .checkbox-box {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--checkbox-size);
        height: var(--checkbox-size);
        border: 2px solid var(--checkbox-color);
        border-radius: var(--checkbox-radius);
        background: transparent;
        transition:
            background var(--checkbox-transition) ease,
            border-color var(--checkbox-transition) ease;

        .checkbox-input:checked + & {
            background: var(--checkbox-color);
            border-color: var(--checkbox-color);
        }

        .checkbox-input:focus-visible + & {
            outline: 2px solid var(--checkbox-color);
            outline-offset: 2px;
        }
    }

    .checkbox-icon {
        width: var(--checkbox-icon-size);
        height: var(--checkbox-icon-size);
        color: white;
    }

    .checkbox-label {
        color: inherit;
    }
</style>

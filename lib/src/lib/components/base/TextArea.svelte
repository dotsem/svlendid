<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveColor, resolveRadius } from "$package/utils/style.js";

    /**
     * TextArea - A multi-line text input component
     */
    type TextAreaVariant = "filled" | "outlined";
    type TextAreaResize = "none" | "vertical" | "horizontal" | "both";

    interface Props {
        /** Current value */
        value?: string;
        /** Placeholder text */
        placeholder?: string;
        /** Number of visible rows */
        rows?: number;
        /** Disabled state */
        disabled?: boolean;
        /** Readonly state */
        readonly?: boolean;
        /** Color scheme */
        color?: ColorPalette;
        /** Input variant */
        variant?: TextAreaVariant;
        /** Border radius */
        radius?: Radius | string;
        /** Resize behavior */
        resize?: TextAreaResize;
        /** Maximum length */
        maxlength?: number;
        /** Show character count */
        showCount?: boolean;
        /** Name for form submission */
        name?: string;
        /** Full width */
        fullWidth?: boolean;
        /** Error state */
        error?: boolean;
        /** Input handler */
        oninput?: (value: string) => void;
        /** Change handler */
        onchange?: (value: string) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = $bindable(""),
        placeholder,
        rows = 4,
        disabled = false,
        readonly = false,
        color = "primary",
        variant = "outlined",
        radius,
        resize = "vertical",
        maxlength,
        showCount = false,
        name,
        fullWidth = false,
        error = false,
        oninput,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

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
    const charCount = $derived(value.length);

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        oninput?.(value);
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        onchange?.(value);
    }
</script>

<div
    class="textarea-wrapper"
    class:full-width={fullWidth}
    class:disabled
    style:--textarea-color={computedColor}
    style:--textarea-bg={computedBg}
    style:--textarea-border={computedBorder}
    style:--textarea-radius={computedRadius}
    style:--textarea-transition={theme.transitions.fast}
    {...props}
>
    <textarea
        class="textarea-input"
        {placeholder}
        {rows}
        {disabled}
        {readonly}
        {maxlength}
        {name}
        style:resize
        oninput={handleInput}
        onchange={handleChange}
        aria-invalid={error}>{value}</textarea
    >
    {#if showCount && maxlength}
        <span class="textarea-count">
            {charCount}/{maxlength}
        </span>
    {/if}
</div>

<style>
    .textarea-wrapper {
        position: relative;
        display: inline-flex;
        flex-direction: column;

        &.full-width {
            width: 100%;
        }

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .textarea-input {
        width: 100%;
        padding: 0.75rem 1rem;
        font-size: 1rem;
        font-family: inherit;
        color: inherit;
        background: var(--textarea-bg);
        border: var(--textarea-border);
        border-radius: var(--textarea-radius);
        transition:
            border-color var(--textarea-transition) ease,
            box-shadow var(--textarea-transition) ease;

        &::placeholder {
            color: inherit;
            opacity: 0.5;
        }

        &:focus {
            outline: none;
            border-color: var(--textarea-color);
            box-shadow: 0 0 0 2px
                color-mix(in srgb, var(--textarea-color) 20%, transparent);
        }
    }

    .textarea-count {
        position: absolute;
        bottom: 0.5rem;
        right: 0.75rem;
        font-size: 0.75rem;
        opacity: 0.6;
        font-variant-numeric: tabular-nums;
    }
</style>

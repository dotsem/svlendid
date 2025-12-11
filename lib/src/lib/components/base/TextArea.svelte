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
        /** Auto-resize height based on content */
        autoResize?: boolean;
        /** Minimum height when auto-resizing */
        minHeight?: string;
        /** Maximum height when auto-resizing */
        maxHeight?: string;
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
        autoResize = false,
        minHeight,
        maxHeight,
        oninput,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let textareaEl = $state<HTMLTextAreaElement>();

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
    const computedResize = $derived(autoResize ? "none" : resize);

    function adjustHeight() {
        if (!autoResize || !textareaEl) return;

        // Reset height to auto to get the correct scrollHeight
        textareaEl.style.height = "auto";
        textareaEl.style.height = `${textareaEl.scrollHeight}px`;
    }

    function handleInput(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        adjustHeight();
        oninput?.(value);
    }

    function handleChange(event: Event) {
        const target = event.target as HTMLTextAreaElement;
        value = target.value;
        onchange?.(value);
    }

    // Adjust height when value changes externally
    $effect(() => {
        if (autoResize && textareaEl && value !== undefined) {
            adjustHeight();
        }
    });
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
    style:--textarea-min-height={minHeight}
    style:--textarea-max-height={maxHeight}
    {...props}
>
    <textarea
        bind:this={textareaEl}
        class="textarea-input"
        class:auto-resize={autoResize}
        {placeholder}
        {rows}
        {disabled}
        {readonly}
        {maxlength}
        {name}
        style:resize={computedResize}
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

        &.auto-resize {
            overflow: hidden;
            min-height: var(--textarea-min-height, auto);
            max-height: var(--textarea-max-height, none);
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

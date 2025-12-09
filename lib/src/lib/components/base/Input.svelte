<script lang="ts">
    import { onMount, type Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { Radius, Spacing } from "$package/types/layout.type.js";

    /**
     * Input - Text input field with theme integration
     */
    type InputVariant = "outlined" | "filled" | "underlined";

    interface Props {
        /** Current value (bindable) */
        value?: string;
        /** Placeholder text */
        placeholder?: string;
        /** Input variant style */
        variant?: InputVariant;
        /** Label text */
        label?: string;
        /** Helper text below input */
        helper?: string;
        /** Error message (also sets error state) */
        error?: string;
        /** Color scheme from palette */
        color?: ColorPalette;
        /** Border radius */
        radius?: Radius | string;
        /** Input type */
        type?:
            | "text"
            | "password"
            | "email"
            | "number"
            | "tel"
            | "url"
            | "search";
        /** Disabled state */
        disabled?: boolean;
        /** Read-only state */
        readonly?: boolean;
        /** auto-focus the input*/
        autofocus?: boolean;
        /** Full width */
        fullWidth?: boolean;
        /** Leading icon/content */
        leading?: Snippet;
        /** Trailing icon/content */
        trailing?: Snippet;
        /** Input event handler */
        oninput?: (event: Event & { currentTarget: HTMLInputElement }) => void;
        /** Change event handler */
        onchange?: (event: Event & { currentTarget: HTMLInputElement }) => void;
        /** Focus event handler */
        onfocus?: (event: FocusEvent) => void;
        /** Blur event handler */
        onblur?: (event: FocusEvent) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = $bindable(""),
        placeholder = "",
        variant = "outlined",
        label,
        helper,
        error,
        color = "primary",
        radius,
        type = "text",
        autofocus = false,
        disabled = false,
        readonly = false,
        fullWidth = false,
        leading,
        trailing,
        oninput,
        onchange,
        onfocus,
        onblur,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let el: HTMLInputElement | null = $state(null);

    let isFocused = $state(false);
    const inputId = $state(`input-${Math.random().toString(36).slice(2, 9)}`);

    const hasError = $derived(!!error);
    const activeColor = $derived(
        hasError ? theme.colors.error : theme.colors[color]
    );
    const computedRadius = $derived(
        radius ? (theme.radius[radius as Radius] ?? radius) : theme.radius.s
    );

    function handleFocus(e: FocusEvent) {
        isFocused = true;
        onfocus?.(e);
    }

    function handleBlur(e: FocusEvent) {
        isFocused = false;
        onblur?.(e);
    }

    onMount(() => {
        if (el && autofocus && !disabled) {
            el.focus();
        }
    });
</script>

<div class="input-wrapper" class:fullWidth class:disabled>
    {#if label}
        <label
            class="label"
            for={inputId}
            class:focused={isFocused}
            class:hasValue={!!value}
            class:hasError
        >
            {label}
        </label>
    {/if}

    <div
        class="input-container {variant}"
        class:focused={isFocused}
        class:hasError
        style:--input-color={activeColor}
        style:--input-border-color={hasError
            ? theme.colors.error
            : theme.colors.outline}
        style:--input-bg={variant === "filled"
            ? theme.colors.surfaceVariant
            : "transparent"}
        style:--input-radius={computedRadius}
        style:--input-transition={theme.transitions.fast}
    >
        {#if leading}
            <span class="leading">
                {@render leading()}
            </span>
        {/if}

        <input
            id={inputId}
            {type}
            bind:value
            bind:this={el}
            {placeholder}
            {disabled}
            {readonly}
            onfocus={handleFocus}
            onblur={handleBlur}
            {oninput}
            {onchange}
            {...props}
        />

        {#if trailing}
            <span class="trailing">
                {@render trailing()}
            </span>
        {/if}
    </div>

    {#if error || helper}
        <span class="helper" class:hasError>
            {error || helper}
        </span>
    {/if}
</div>

<style>
    .input-wrapper {
        display: inline-flex;
        flex-direction: column;
        gap: 4px;
        min-width: 200px;
    }

    .fullWidth {
        width: 100%;
    }

    .label {
        font-size: 0.875rem;
        color: var(--input-border-color);
        transition: color var(--input-transition) ease;
    }

    .label.focused,
    .label.hasValue {
        color: var(--input-color);
    }

    .label.hasError {
        color: var(--input-color);
    }

    .input-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 12px 16px;
        transition: all var(--input-transition) ease;
    }

    .input-container.outlined {
        border: 1px solid var(--input-border-color);
        border-radius: var(--input-radius);
        background: transparent;
    }

    .input-container.outlined.focused {
        border-color: var(--input-color);
        box-shadow: 0 0 0 1px var(--input-color);
    }

    .input-container.filled {
        border: none;
        border-bottom: 2px solid var(--input-border-color);
        border-radius: var(--input-radius) var(--input-radius) 0 0;
        background: var(--input-bg);
    }

    .input-container.filled.focused {
        border-bottom-color: var(--input-color);
    }

    .input-container.underlined {
        border: none;
        border-bottom: 1px solid var(--input-border-color);
        border-radius: 0;
        padding-left: 0;
        padding-right: 0;
    }

    .input-container.underlined.focused {
        border-bottom: 2px solid var(--input-color);
    }

    .input-container.hasError {
        border-color: var(--input-color);
    }

    input {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font: inherit;
        color: inherit;
        min-width: 0;
    }

    input::placeholder {
        opacity: 0.5;
    }

    input:disabled {
        cursor: not-allowed;
    }

    .leading,
    .trailing {
        display: flex;
        align-items: center;
        color: var(--input-border-color);
    }

    .helper {
        font-size: 0.75rem;
        color: var(--input-border-color);
        padding-left: 4px;
    }

    .helper.hasError {
        color: var(--input-color);
    }

    .disabled {
        opacity: 0.5;
        pointer-events: none;
    }
</style>

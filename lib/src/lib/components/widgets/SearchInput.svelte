<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveColor, resolveRadius } from "$package/utils/style.js";

    /**
     * SearchInput - An input with search icon and clear button
     */
    type SearchInputSize = "s" | "m" | "l";

    interface Props {
        /** Search query value */
        value?: string;
        /** Placeholder text */
        placeholder?: string;
        /** Input size */
        size?: SearchInputSize;
        /** Color scheme */
        color?: ColorPalette;
        /** Border radius */
        radius?: Radius | string;
        /** Disabled state */
        disabled?: boolean;
        /** Loading state */
        loading?: boolean;
        /** Full width */
        fullWidth?: boolean;
        /** Input handler */
        oninput?: (value: string) => void;
        /** Submit handler (on Enter) */
        onsubmit?: (value: string) => void;
        /** Clear handler */
        onclear?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        value = $bindable(""),
        placeholder = "Search...",
        size = "m",
        color = "primary",
        radius,
        disabled = false,
        loading = false,
        fullWidth = false,
        oninput,
        onsubmit,
        onclear,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: {
            height: "32px",
            padding: "0 0.75rem",
            fontSize: "0.875rem",
            iconSize: "16px",
        },
        m: {
            height: "40px",
            padding: "0 1rem",
            fontSize: "1rem",
            iconSize: "18px",
        },
        l: {
            height: "48px",
            padding: "0 1.25rem",
            fontSize: "1.125rem",
            iconSize: "20px",
        },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedRadius = $derived(
        resolveRadius(radius, theme) ?? theme.radius.full
    );

    function handleInput(event: Event) {
        const target = event.target as HTMLInputElement;
        value = target.value;
        oninput?.(value);
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            event.preventDefault();
            onsubmit?.(value);
        }
    }

    function handleClear() {
        value = "";
        onclear?.();
    }
</script>

<div
    class="search-input"
    class:full-width={fullWidth}
    class:disabled
    style:--search-height={sizeConfig[size].height}
    style:--search-padding={sizeConfig[size].padding}
    style:--search-font-size={sizeConfig[size].fontSize}
    style:--search-icon-size={sizeConfig[size].iconSize}
    style:--search-color={computedColor}
    style:--search-radius={computedRadius}
    style:--search-bg={theme.colors.surfaceVariant}
    style:--search-transition={theme.transitions.fast}
    {...props}
>
    <span class="search-icon">
        {#if loading}
            <svg
                class="loading-spinner"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke-dasharray="60"
                    stroke-dashoffset="0"
                />
            </svg>
        {:else}
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
            </svg>
        {/if}
    </span>

    <input
        type="search"
        class="search-input-field"
        {value}
        {placeholder}
        {disabled}
        oninput={handleInput}
        onkeydown={handleKeydown}
    />

    {#if value}
        <button
            type="button"
            class="clear-button"
            onclick={handleClear}
            aria-label="Clear search"
            {disabled}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
        </button>
    {/if}
</div>

<style>
    .search-input {
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

    .search-icon {
        position: absolute;
        left: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--search-icon-size);
        height: var(--search-icon-size);
        color: inherit;
        opacity: 0.5;
        pointer-events: none;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .loading-spinner {
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }

    .search-input-field {
        width: 100%;
        height: var(--search-height);
        padding: var(--search-padding);
        padding-left: calc(var(--search-icon-size) + 1.25rem);
        padding-right: calc(var(--search-icon-size) + 1.25rem);
        font-size: var(--search-font-size);
        font-family: inherit;
        color: inherit;
        background: var(--search-bg);
        border: none;
        border-radius: var(--search-radius);
        transition: box-shadow var(--search-transition) ease;

        &::placeholder {
            color: inherit;
            opacity: 0.5;
        }

        &:focus {
            outline: none;
            box-shadow: 0 0 0 2px
                color-mix(in srgb, var(--search-color) 30%, transparent);
        }

        &::-webkit-search-cancel-button {
            display: none;
        }
    }

    .clear-button {
        position: absolute;
        right: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: calc(var(--search-icon-size) + 4px);
        height: calc(var(--search-icon-size) + 4px);
        padding: 0;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.5;
        border-radius: 50%;
        transition: opacity var(--search-transition) ease;

        &:hover {
            opacity: 1;
        }

        svg {
            width: var(--search-icon-size);
            height: var(--search-icon-size);
        }
    }
</style>

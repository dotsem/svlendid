<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import {
        resolveColor,
        getOnColor,
        getContainerColor,
        getOnContainerColor,
    } from "$package/utils/style.js";

    /**
     * Chip - A compact labeling element for selections, filters, or tags
     */
    type ChipVariant = "filled" | "tonal" | "outlined";
    type ChipSize = "s" | "m";

    interface Props {
        children?: Snippet;
        /** Chip label text (alternative to children) */
        label?: string;
        /** Color scheme */
        color?: ColorPalette;
        /** Chip variant */
        variant?: ChipVariant;
        /** Chip size */
        size?: ChipSize;
        /** Clickable chip */
        clickable?: boolean;
        /** Selected state (for filter chips) */
        selected?: boolean;
        /** Show remove button */
        removable?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Leading icon slot */
        leadingIcon?: Snippet;
        /** Click handler */
        onclick?: (event: MouseEvent) => void;
        /** Remove handler */
        onremove?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        label,
        color = "primary",
        variant = "tonal",
        size = "m",
        clickable = false,
        selected = false,
        removable = false,
        disabled = false,
        leadingIcon,
        onclick,
        onremove,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: {
            height: "24px",
            padding: "0 0.5rem",
            fontSize: "0.75rem",
            iconSize: "14px",
        },
        m: {
            height: "32px",
            padding: "0 0.75rem",
            fontSize: "0.875rem",
            iconSize: "18px",
        },
    };

    const variantStyles = $derived.by(() => {
        const baseColor = resolveColor(color, theme);
        const onColor = getOnColor(color, theme);
        const containerColor = getContainerColor(color, theme);
        const onContainerColor = getOnContainerColor(color, theme);

        switch (variant) {
            case "filled":
                return {
                    bg: baseColor,
                    color: onColor,
                    border: "none",
                };
            case "tonal":
                return {
                    bg: containerColor,
                    color: onContainerColor,
                    border: "none",
                };
            case "outlined":
                return {
                    bg: "transparent",
                    color: baseColor,
                    border: `1px solid ${baseColor}`,
                };
        }
    });

    function handleRemove(event: MouseEvent) {
        event.stopPropagation();
        onremove?.();
    }
</script>

<svelte:element
    this={clickable ? "button" : "span"}
    class="chip"
    class:clickable
    class:selected
    class:disabled
    style:--chip-height={sizeConfig[size].height}
    style:--chip-padding={sizeConfig[size].padding}
    style:--chip-font-size={sizeConfig[size].fontSize}
    style:--chip-icon-size={sizeConfig[size].iconSize}
    style:--chip-bg={variantStyles.bg}
    style:--chip-color={variantStyles.color}
    style:--chip-border={variantStyles.border}
    style:--chip-radius={theme.radius.full}
    style:--chip-transition={theme.transitions.fast}
    onclick={clickable ? onclick : undefined}
    disabled={clickable ? disabled : undefined}
    {...props}
>
    {#if leadingIcon}
        <span class="chip-icon">{@render leadingIcon()}</span>
    {/if}
    <span class="chip-label">
        {#if children}
            {@render children()}
        {:else}
            {label}
        {/if}
    </span>
    {#if removable}
        <button
            type="button"
            class="chip-remove"
            onclick={handleRemove}
            aria-label="Remove"
            {disabled}
        >
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
        </button>
    {/if}
</svelte:element>

<style>
    .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.25rem;
        height: var(--chip-height);
        padding: var(--chip-padding);
        font-size: var(--chip-font-size);
        font-family: inherit;
        background: var(--chip-bg);
        color: var(--chip-color);
        border: var(--chip-border);
        border-radius: var(--chip-radius);
        transition:
            background var(--chip-transition) ease,
            filter var(--chip-transition) ease;

        &.clickable {
            cursor: pointer;

            &:hover:not(.disabled) {
                filter: brightness(0.95);
            }
        }

        &.selected {
            filter: brightness(0.9);
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .chip-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--chip-icon-size);
        height: var(--chip-icon-size);
    }

    .chip-label {
        white-space: nowrap;
    }

    .chip-remove {
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--chip-icon-size);
        height: var(--chip-icon-size);
        padding: 0;
        margin-left: 0.125rem;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity var(--chip-transition) ease;

        &:hover {
            opacity: 1;
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }
</style>

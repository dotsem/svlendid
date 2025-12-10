<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Menu - A dropdown/context menu list
     */
    interface MenuItem {
        id: string;
        label: string;
        icon?: Snippet;
        disabled?: boolean;
        divider?: boolean;
        href?: string;
        onclick?: () => void;
    }

    interface Props {
        /** Menu items */
        items: MenuItem[];
        /** Color for hover state */
        color?: ColorPalette;
        /** Selected item ID */
        selected?: string;
        /** Compact mode */
        compact?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        items,
        color = "primary",
        selected,
        compact = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    function handleItemClick(item: MenuItem) {
        if (!item.disabled && !item.divider) {
            item.onclick?.();
        }
    }
</script>

<ul
    class="menu"
    class:compact
    style:--menu-color={computedColor}
    style:--menu-radius={theme.radius.m}
    style:--menu-transition={theme.transitions.fast}
    role="menu"
    {...props}
>
    {#each items as item}
        {#if item.divider}
            <li class="menu-divider" role="separator"></li>
        {:else}
            <li role="none">
                <svelte:element
                    this={item.href ? "a" : "button"}
                    class="menu-item"
                    class:disabled={item.disabled}
                    class:selected={item.id === selected}
                    role="menuitem"
                    href={item.href}
                    disabled={item.disabled}
                    tabindex={item.disabled ? -1 : 0}
                    onclick={() => handleItemClick(item)}
                >
                    {#if item.icon}
                        <span class="menu-item-icon">{@render item.icon()}</span
                        >
                    {/if}
                    <span class="menu-item-label">{item.label}</span>
                </svelte:element>
            </li>
        {/if}
    {/each}
</ul>

<style>
    .menu {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        min-width: 180px;
    }

    .menu-item {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.625rem 1rem;
        font-family: inherit;
        font-size: 0.875rem;
        text-align: left;
        text-decoration: none;
        color: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background var(--menu-transition) ease;

        .compact & {
            padding: 0.5rem 0.75rem;
            font-size: 0.8125rem;
        }

        &:hover:not(.disabled) {
            background: color-mix(in srgb, var(--menu-color) 10%, transparent);
        }

        &:focus-visible {
            outline: 2px solid var(--menu-color);
            outline-offset: -2px;
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &.selected {
            background: color-mix(in srgb, var(--menu-color) 10%, transparent);
            color: var(--menu-color);
        }
    }

    .menu-item-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 20px;
        height: 20px;
        flex-shrink: 0;
    }

    .menu-item-label {
        flex: 1;
    }

    .menu-divider {
        height: 1px;
        margin: 0.5rem 0;
        background: currentColor;
        opacity: 0.1;
    }
</style>

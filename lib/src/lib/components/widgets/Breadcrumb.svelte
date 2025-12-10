<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Breadcrumb - Navigation breadcrumb trail
     */
    interface BreadcrumbItem {
        label: string;
        href?: string;
        icon?: Snippet;
    }

    interface Props {
        /** List of breadcrumb items */
        items: BreadcrumbItem[];
        /** Separator between items */
        separator?: string | Snippet;
        /** Color for active/current item */
        color?: ColorPalette;
        /** Maximum items to show (collapsed if exceeded) */
        maxItems?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        items,
        separator = "/",
        color = "primary",
        maxItems,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    const displayItems = $derived.by(() => {
        if (!maxItems || items.length <= maxItems) {
            return items;
        }
        // Show first, ellipsis, and last (maxItems - 1) items
        const lastItems = items.slice(-(maxItems - 1));
        return [
            items[0],
            { label: "...", collapsed: true } as BreadcrumbItem & {
                collapsed?: boolean;
            },
            ...lastItems,
        ];
    });
</script>

<nav
    class="breadcrumb"
    style:--breadcrumb-color={computedColor}
    style:--breadcrumb-transition={theme.transitions.fast}
    aria-label="Breadcrumb"
    {...props}
>
    <ol class="breadcrumb-list">
        {#each displayItems as item, index}
            <li
                class="breadcrumb-item"
                class:current={index === displayItems.length - 1}
            >
                {#if index > 0}
                    <span class="breadcrumb-separator" aria-hidden="true">
                        {#if typeof separator === "string"}
                            {separator}
                        {:else}
                            {@render separator()}
                        {/if}
                    </span>
                {/if}

                {#if item.href && index !== displayItems.length - 1}
                    <a href={item.href} class="breadcrumb-link">
                        {#if item.icon}
                            <span class="breadcrumb-icon"
                                >{@render item.icon()}</span
                            >
                        {/if}
                        {item.label}
                    </a>
                {:else}
                    <span
                        class="breadcrumb-text"
                        aria-current={index === displayItems.length - 1
                            ? "page"
                            : undefined}
                    >
                        {#if item.icon}
                            <span class="breadcrumb-icon"
                                >{@render item.icon()}</span
                            >
                        {/if}
                        {item.label}
                    </span>
                {/if}
            </li>
        {/each}
    </ol>
</nav>

<style>
    .breadcrumb-list {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 0.5rem;
        list-style: none;
        margin: 0;
        padding: 0;
        font-size: 0.875rem;
    }

    .breadcrumb-item {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }

    .breadcrumb-separator {
        color: inherit;
        opacity: 0.4;
        user-select: none;
    }

    .breadcrumb-link {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        color: inherit;
        text-decoration: none;
        opacity: 0.7;
        transition:
            opacity var(--breadcrumb-transition) ease,
            color var(--breadcrumb-transition) ease;

        &:hover {
            opacity: 1;
            color: var(--breadcrumb-color);
        }

        &:focus-visible {
            outline: 2px solid var(--breadcrumb-color);
            outline-offset: 2px;
            border-radius: 2px;
        }
    }

    .breadcrumb-text {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .current .breadcrumb-text {
        color: var(--breadcrumb-color);
        font-weight: 500;
    }

    .breadcrumb-icon {
        display: flex;
        align-items: center;
    }
</style>

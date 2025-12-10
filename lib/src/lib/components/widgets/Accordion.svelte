<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Accordion - Collapsible content sections
     */
    interface AccordionItem {
        id: string;
        title: string;
        content: Snippet;
        disabled?: boolean;
    }

    interface Props {
        /** List of accordion items */
        items: AccordionItem[];
        /** Allow multiple items open */
        multiple?: boolean;
        /** Initially expanded item IDs */
        expanded?: string[];
        /** Color scheme for active state */
        color?: ColorPalette;
        /** Variant style */
        variant?: "default" | "bordered" | "separated";
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        items,
        multiple = false,
        expanded = $bindable([]),
        color = "primary",
        variant = "default",
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    function toggleItem(id: string) {
        if (expanded.includes(id)) {
            expanded = expanded.filter((i) => i !== id);
        } else {
            if (multiple) {
                expanded = [...expanded, id];
            } else {
                expanded = [id];
            }
        }
    }

    function isExpanded(id: string): boolean {
        return expanded.includes(id);
    }
</script>

<div
    class="accordion"
    class:bordered={variant === "bordered"}
    class:separated={variant === "separated"}
    style:--accordion-color={computedColor}
    style:--accordion-transition={theme.transitions.fast}
    style:--accordion-radius={theme.radius.m}
    style:--accordion-border={theme.colors.outline}
    {...props}
>
    {#each items as item}
        {@const itemExpanded = isExpanded(item.id)}
        <div
            class="accordion-item"
            class:expanded={itemExpanded}
            class:disabled={item.disabled}
        >
            <button
                class="accordion-trigger"
                aria-expanded={itemExpanded}
                aria-controls="content-{item.id}"
                disabled={item.disabled}
                onclick={() => toggleItem(item.id)}
            >
                <span class="accordion-title">{item.title}</span>
                <svg
                    class="accordion-icon"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                >
                    <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
            </button>
            <div
                class="accordion-content"
                id="content-{item.id}"
                role="region"
                aria-labelledby="trigger-{item.id}"
                hidden={!itemExpanded}
            >
                <div class="accordion-body">
                    {@render item.content()}
                </div>
            </div>
        </div>
    {/each}
</div>

<style>
    .accordion {
        width: 100%;
    }

    .accordion.bordered {
        border: 1px solid var(--accordion-border);
        border-radius: var(--accordion-radius);
        overflow: hidden;
    }

    .accordion.separated .accordion-item {
        border: 1px solid var(--accordion-border);
        border-radius: var(--accordion-radius);
        margin-bottom: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .accordion-item {
        border-bottom: 1px solid var(--accordion-border);

        &:last-child {
            border-bottom: none;
        }

        &.disabled {
            opacity: 0.5;
        }
    }

    .accordion.separated .accordion-item {
        border-bottom: 1px solid var(--accordion-border);

        &:last-child {
            border-bottom: 1px solid var(--accordion-border);
        }
    }

    .accordion-trigger {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        font-family: inherit;
        font-size: 1rem;
        font-weight: 500;
        text-align: left;
        color: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
        transition: background var(--accordion-transition) ease;

        &:hover:not(:disabled) {
            background: color-mix(
                in srgb,
                var(--accordion-color) 5%,
                transparent
            );
        }

        &:focus-visible {
            outline: 2px solid var(--accordion-color);
            outline-offset: -2px;
        }

        &:disabled {
            cursor: not-allowed;
        }
    }

    .accordion-icon {
        flex-shrink: 0;
        transition: transform var(--accordion-transition) ease;

        .expanded & {
            transform: rotate(180deg);
        }
    }

    .accordion-content {
        display: grid;
        grid-template-rows: 0fr;
        transition: grid-template-rows var(--accordion-transition) ease;

        &:not([hidden]) {
            grid-template-rows: 1fr;
        }
    }

    .accordion-body {
        overflow: hidden;
        padding: 0 1rem;

        .accordion-content:not([hidden]) & {
            padding: 0 1rem 1rem;
        }
    }
</style>

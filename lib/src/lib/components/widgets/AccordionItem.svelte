<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext, getContext } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * AccordionItem - Individual collapsible item for Accordion
     */
    interface Props {
        children: Snippet;
        /** Title displayed in the header */
        title: string;
        /** Whether the item is disabled */
        disabled?: boolean;
        /** Unique identifier (auto-generated if not provided) */
        id?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let { children, title, disabled = false, id, ...props }: Props = $props();

    const context = getContext<{
        expanded: string[];
        toggle: (id: string) => void;
        color: string;
        transition: string;
        radius: string;
        border: string;
    }>("accordion");

    const itemId =
        id ?? `accordion-item-${Math.random().toString(36).slice(2)}`;
    const isExpanded = $derived(context.expanded.includes(itemId));
</script>

<div
    class="accordion-item"
    class:expanded={isExpanded}
    class:disabled
    {...props}
>
    <button
        class="accordion-trigger"
        id="trigger-{itemId}"
        aria-expanded={isExpanded}
        aria-controls="content-{itemId}"
        {disabled}
        onclick={() => context.toggle(itemId)}
        style:--accordion-color={context.color}
        style:--accordion-transition={context.transition}
    >
        <span class="accordion-title">{title}</span>
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
        id="content-{itemId}"
        role="region"
        aria-labelledby="trigger-{itemId}"
        hidden={!isExpanded}
        style:--accordion-transition={context.transition}
    >
        <div class="accordion-body">
            {@render children()}
        </div>
    </div>
</div>

<style>
    .accordion-item {
        border-bottom: 1px solid var(--accordion-border, currentColor);

        &:last-child {
            border-bottom: none;
        }

        &.disabled {
            opacity: 0.5;
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

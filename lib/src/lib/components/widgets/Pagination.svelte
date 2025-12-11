<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Pagination - Page navigation controls
     */
    interface Props {
        /** Current page (1-indexed) */
        page?: number;
        /** Total number of pages */
        totalPages: number;
        /** Number of page buttons to show */
        siblingCount?: number;
        /** Show first/last buttons */
        showEnds?: boolean;
        /** Show prev/next buttons */
        showArrows?: boolean;
        /** Color scheme */
        color?: ColorPalette;
        /** Disabled state */
        disabled?: boolean;
        /** Page change handler */
        onchange?: (page: number) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        page = $bindable(1),
        totalPages,
        siblingCount = 1,
        showEnds = true,
        showArrows = true,
        color = "primary",
        disabled = false,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    const pages = $derived.by(() => {
        const range: (number | "...")[] = [];
        const showSiblings = siblingCount;

        // If we have few enough pages, just show all of them
        // +1 for first, +1 for last, 2*siblingCount for middle, +2 for ellipsis slots
        const maxVisible = 2 + showSiblings * 2 + 2;
        if (totalPages <= maxVisible + 2) {
            for (let i = 1; i <= totalPages; i++) {
                range.push(i);
            }
            return range;
        }

        // Always show first page
        range.push(1);

        // Calculate start and end of middle section
        // We want at least 4 pages visible at the start: 1 2 3 4 ... N
        let start = Math.max(2, page - showSiblings);
        let end = Math.min(totalPages - 1, page + showSiblings);

        // Ensure minimum of 4 pages at start (show 1 2 3 4 ... N)
        if (start <= 3) {
            start = 2;
            end = Math.max(end, 2 + showSiblings * 2 + 1);
            end = Math.min(end, totalPages - 1);
        }
        // Near the end, show more pages
        else if (end >= totalPages - 2) {
            end = totalPages - 1;
            start = Math.min(start, totalPages - 2 - showSiblings * 2);
            start = Math.max(start, 2);
        }

        // Add ellipsis after first if needed
        if (start > 2) {
            range.push("...");
        }

        // Add middle pages
        for (let i = start; i <= end; i++) {
            range.push(i);
        }

        // Add ellipsis before last if needed
        if (end < totalPages - 1) {
            range.push("...");
        }

        // Always show last page
        if (totalPages > 1) {
            range.push(totalPages);
        }

        return range;
    });

    function goToPage(newPage: number) {
        if (newPage >= 1 && newPage <= totalPages && newPage !== page) {
            page = newPage;
            onchange?.(page);
        }
    }
</script>

<nav
    class="pagination"
    class:disabled
    style:--pagination-color={computedColor}
    style:--pagination-transition={theme.transitions.fast}
    style:--pagination-radius={theme.radius.m}
    aria-label="Pagination"
    {...props}
>
    {#if showEnds}
        <button
            class="pagination-btn"
            disabled={page === 1 || disabled}
            onclick={() => goToPage(1)}
            aria-label="First page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="11 17 6 12 11 7"></polyline>
                <polyline points="18 17 13 12 18 7"></polyline>
            </svg>
        </button>
    {/if}

    {#if showArrows}
        <button
            class="pagination-btn"
            disabled={page === 1 || disabled}
            onclick={() => goToPage(page - 1)}
            aria-label="Previous page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
        </button>
    {/if}

    <div class="pagination-pages">
        {#each pages as p}
            {#if p === "..."}
                <span class="pagination-ellipsis">…</span>
            {:else}
                <button
                    class="pagination-page"
                    class:active={p === page}
                    {disabled}
                    onclick={() => goToPage(p)}
                    aria-current={p === page ? "page" : undefined}
                >
                    {p}
                </button>
            {/if}
        {/each}
    </div>

    {#if showArrows}
        <button
            class="pagination-btn"
            disabled={page === totalPages || disabled}
            onclick={() => goToPage(page + 1)}
            aria-label="Next page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
        </button>
    {/if}

    {#if showEnds}
        <button
            class="pagination-btn"
            disabled={page === totalPages || disabled}
            onclick={() => goToPage(totalPages)}
            aria-label="Last page"
        >
            <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
            >
                <polyline points="13 17 18 12 13 7"></polyline>
                <polyline points="6 17 11 12 6 7"></polyline>
            </svg>
        </button>
    {/if}
</nav>

<style>
    .pagination {
        display: flex;
        align-items: center;
        gap: 0.25rem;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .pagination-btn,
    .pagination-page {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        height: 36px;
        padding: 0 0.5rem;
        font-family: inherit;
        font-size: 0.875rem;
        color: inherit;
        background: transparent;
        border: none;
        border-radius: var(--pagination-radius);
        cursor: pointer;
        transition:
            background var(--pagination-transition) ease,
            color var(--pagination-transition) ease;

        &:hover:not(:disabled) {
            background: color-mix(
                in srgb,
                var(--pagination-color) 10%,
                transparent
            );
        }

        &:focus-visible {
            outline: 2px solid var(--pagination-color);
            outline-offset: 2px;
        }

        &:disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }
    }

    .pagination-page.active {
        background: var(--pagination-color);
        color: white;
    }

    .pagination-pages {
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    .pagination-ellipsis {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 36px;
        height: 36px;
        color: inherit;
        opacity: 0.5;
    }
</style>

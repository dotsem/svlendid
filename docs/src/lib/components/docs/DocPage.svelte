<!-- 
    DocPage - Wrapper for documentation pages
    Handles TOC registration and consistent layout
-->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Text, Column, Row, Divider, Box } from 'lib';
    import { tableOfContents, type TocEntry } from '$lib/stores/docs';
    import { getAdjacentItems, findNavItem } from '$lib/data/navigation';
    import { browser } from '$app/environment';

    interface Props {
        title: string;
        description?: string;
        /** Category slug (not title) for navigation */
        categorySlug: string;
        /** Display name for category */
        categoryTitle: string;
        slug: string;
        children: Snippet;
    }

    let { title, description, categorySlug, categoryTitle, slug, children }: Props = $props();

    const adjacent = $derived(getAdjacentItems(categorySlug, slug));

    // Extract headings for TOC - re-runs when slug changes
    $effect(() => {
        // Track slug to re-run on navigation
        const currentSlug = slug;
        
        if (browser) {
            // Small delay to ensure content is rendered
            const timer = setTimeout(() => {
                const headings = document.querySelectorAll('.doc-content h2[id], .doc-content h3[id], .doc-content h4[id]');
                const entries: TocEntry[] = [];

                headings.forEach(heading => {
                    const level = parseInt(heading.tagName[1]);
                    entries.push({
                        id: heading.id,
                        title: heading.textContent || '',
                        level,
                    });
                });

                tableOfContents.set(entries);
            }, 50);

            return () => {
                clearTimeout(timer);
                tableOfContents.set([]);
            };
        }
    });
</script>

<article class="doc-page">
    <header class="doc-header">
        <Text variant="overline" color="primary">{categoryTitle}</Text>
        <Text variant="h2" color="onBg">{title}</Text>
        {#if description}
            <Text variant="body1" color="onSurfaceVariant">{description}</Text>
        {/if}
    </header>

    <div class="doc-content">
        {@render children()}
    </div>

    <Divider margin="xl" />

    <nav class="doc-pagination">
        {#if adjacent.prev}
            <a href="/docs/{adjacent.prev.category.slug}/{adjacent.prev.item.slug}" class="pagination-link prev">
                <Text variant="caption" color="onSurfaceVariant">Previous</Text>
                <Text variant="body2" color="primary">{adjacent.prev.item.title}</Text>
            </a>
        {:else}
            <div></div>
        {/if}
        
        {#if adjacent.next}
            <a href="/docs/{adjacent.next.category.slug}/{adjacent.next.item.slug}" class="pagination-link next">
                <Text variant="caption" color="onSurfaceVariant">Next</Text>
                <Text variant="body2" color="primary">{adjacent.next.item.title}</Text>
            </a>
        {/if}
    </nav>
</article>

<style>
    .doc-page {
        max-width: 800px;
        margin: 0 auto;
        padding: 40px 24px;
    }

    .doc-header {
        margin-bottom: 32px;
    }

    .doc-header :global(p) {
        margin-top: 8px;
    }

    .doc-content {
        line-height: 1.7;
    }

    .doc-content :global(h2) {
        margin-top: 48px;
        margin-bottom: 16px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .doc-content :global(h3) {
        margin-top: 32px;
        margin-bottom: 12px;
    }

    .doc-content :global(h4) {
        margin-top: 24px;
        margin-bottom: 8px;
    }

    .doc-content :global(p) {
        margin: 16px 0;
        color: var(--color-onSurface, #1f2937);
    }

    .doc-content :global(ul), .doc-content :global(ol) {
        margin: 16px 0;
        padding-left: 24px;
    }

    .doc-content :global(li) {
        margin: 8px 0;
        color: var(--color-onSurface, #1f2937);
    }

    .doc-content :global(code:not(pre code)) {
        font-family: 'Fira Code', monospace;
        font-size: 0.9em;
        padding: 2px 6px;
        background: var(--color-surfaceVariant, #f3f4f6);
        border-radius: 4px;
        color: var(--color-primary, #6366f1);
    }

    .doc-pagination {
        display: flex;
        justify-content: space-between;
        gap: 16px;
    }

    .pagination-link {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 16px;
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 8px;
        text-decoration: none;
        transition: border-color 0.15s ease;
    }

    .pagination-link:hover {
        border-color: var(--color-primary, #6366f1);
    }

    .pagination-link.next {
        text-align: right;
        margin-left: auto;
    }
</style>

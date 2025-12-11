<!-- 
    Table of Contents - Right sidebar showing page sections
    Automatically updates on page navigation and tracks scroll position
-->
<script lang="ts">
    import { Box, Center, Drawer, Text, ViewPort } from "lib";
    import { tableOfContents, activeHeading } from "$lib/stores/docs";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import TOCsidebar from "./TOCsidebar.svelte";

    let observer: IntersectionObserver | null = null;
    let scrollHandler: (() => void) | null = null;
    let expanded = $state(false);

    // Re-setup observer when TOC entries change (page navigation)
    $effect(() => {
        // Subscribe to tableOfContents changes
        const entries = $tableOfContents;

        if (browser && entries.length > 0) {
            // Small delay to ensure DOM is updated
            setTimeout(() => setupObserver(), 50);
        }
    });

    function setupObserver() {
        // Cleanup previous observer
        if (observer) {
            observer.disconnect();
        }
        if (scrollHandler) {
            window.removeEventListener("scroll", scrollHandler);
        }

        // Create new intersection observer
        observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        activeHeading.set(entry.target.id);
                    }
                }
            },
            {
                rootMargin: "-80px 0px -80% 0px",
                threshold: 0,
            }
        );

        // Observe all headings
        const headings = document.querySelectorAll("h2[id], h3[id], h4[id]");
        headings.forEach((h) => observer!.observe(h));

        // Handle scroll to bottom - highlight last item
        scrollHandler = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >=
                document.documentElement.scrollHeight - 50;

            if (scrolledToBottom && $tableOfContents.length > 0) {
                const lastEntry = $tableOfContents[$tableOfContents.length - 1];
                activeHeading.set(lastEntry.id);
            }
        };
        window.addEventListener("scroll", scrollHandler, { passive: true });
    }

    onDestroy(() => {
        if (observer) {
            observer.disconnect();
        }
        if (browser && scrollHandler) {
            window.removeEventListener("scroll", scrollHandler);
        }
    });

    function scrollToHeading(id: string) {
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Navbar height
            const y =
                element.getBoundingClientRect().top + window.scrollY - offset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        // Close mobile TOC after clicking
        expanded = false;
    }

    function toggleExpanded() {
        expanded = !expanded;
    }
</script>

{#if $tableOfContents.length > 0}
    <!-- Desktop TOC -->
    <ViewPort visibleWhile="(min-width: 1280px)">
        <TOCsidebar
            {tableOfContents}
            {activeHeading}
            bind:expanded
            mobile={false}
        />
    </ViewPort>

    <!-- Mobile TOC (dot navigation) -->
    <ViewPort visibleWhile="(max-width: 1279px)">
        <aside class="toc-mobile" class:expanded>
            <!-- Dot navigation -->
            <div class="toc-dots">
                {#each $tableOfContents as entry}
                    <button
                        class="toc-dot"
                        class:active={$activeHeading === entry.id}
                        onclick={() => scrollToHeading(entry.id)}
                        title={entry.title}
                        aria-label={entry.title}
                    ></button>
                {/each}
                <button
                    class="toc-expand-btn"
                    onclick={toggleExpanded}
                    aria-label={expanded
                        ? "Collapse table of contents"
                        : "Expand table of contents"}
                >
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        {#if expanded}
                            <polyline points="9 18 15 12 9 6"></polyline>
                        {:else}
                            <polyline points="15 18 9 12 15 6"></polyline>
                        {/if}
                    </svg>
                </button>
            </div>

            <!-- Expanded panel -->
        </aside>

        <Drawer
            placement="right"
            padding="none"
            size="220px"
            bind:open={expanded}
        >
            <TOCsidebar
                {tableOfContents}
                {activeHeading}
                bind:expanded
                mobile={true}
            />
        </Drawer>
    </ViewPort>
{/if}

<style>
    /* Mobile TOC */
    .toc-mobile {
        position: fixed;
        right: 8px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 50;
    }

    .toc-dots {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px;
        padding: 8px;
        background: var(--color-card);
        border-radius: 16px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    }

    .toc-dot {
        width: 8px;
        height: 8px;
        padding: 0;
        border: none;
        border-radius: 50%;
        background: var(--color-outline);
        cursor: pointer;
        transition: all 0.15s ease;

        &:hover {
            background: var(--color-onSurfaceVariant);
            transform: scale(1.2);
        }

        &.active {
            background: var(--color-primary);
            transform: scale(1.4);
        }
    }

    .toc-expand-btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        margin-top: 4px;
        background: transparent;
        border: none;
        color: var(--color-onSurfaceVariant);
        cursor: pointer;
        border-radius: 50%;
        transition: background 0.15s ease;

        &:hover {
            background: var(--color-surfaceVariant);
        }
    }
</style>

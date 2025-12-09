<!-- 
    Table of Contents - Right sidebar showing page sections
    Automatically updates on page navigation and tracks scroll position
-->
<script lang="ts">
    import { Text } from "lib";
    import { tableOfContents, activeHeading } from "$lib/stores/docs";
    import { onDestroy } from "svelte";
    import { browser } from "$app/environment";

    let observer: IntersectionObserver | null = null;
    let scrollHandler: (() => void) | null = null;

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
    }
</script>

{#if $tableOfContents.length > 0}
    <aside class="toc">
        <Text
            variant="overline"
            color="onSurfaceVariant"
            style="padding: 0 16px; margin-bottom: 8px;"
        >
            On This Page
        </Text>
        <nav class="toc-nav">
            {#each $tableOfContents as entry}
                <button
                    class="toc-item level-{entry.level}"
                    class:active={$activeHeading === entry.id}
                    onclick={() => scrollToHeading(entry.id)}
                >
                    {entry.title}
                </button>
            {/each}
        </nav>
    </aside>
{/if}

<style>
    .toc {
        width: 220px;
        height: calc(100vh - 60px);
        position: fixed;
        right: 0;
        top: 60px;
        padding: 24px 0;
        overflow-y: auto;
        border-left: 1px solid var(--color-border);
        background: var(--color-bg);
    }

    .toc-nav {
        display: flex;
        flex-direction: column;
    }

    .toc-item {
        text-align: left;
        padding: 6px 16px;
        font-size: 13px;
        color: var(--color-onSurfaceVariant);
        background: none;
        border: none;
        border-left: 2px solid transparent;
        cursor: pointer;
        transition: all 0.15s ease;
    }

    .toc-item:hover {
        color: var(--color-onSurface);
    }

    .toc-item.active {
        color: var(--color-primary);
        border-left-color: var(--color-primary);
        background: var(--color-primaryContainer);
    }

    .toc-item.level-2 {
        padding-left: 16px;
    }

    .toc-item.level-3 {
        padding-left: 28px;
        font-size: 12px;
    }

    .toc-item.level-4 {
        padding-left: 40px;
        font-size: 12px;
    }

    @media (max-width: 1279px) {
        .toc {
            display: none;
        }
    }
</style>

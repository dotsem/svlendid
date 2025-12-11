<script lang="ts">
    import type { TocEntry } from "$lib/stores/docs";
    import type { Readable } from "svelte/store";
    import { Text } from "lib";

    interface Props {
        tableOfContents: Readable<TocEntry[]>;
        activeHeading: Readable<string | null>;
        expanded?: boolean;
        mobile?: boolean;
    }

    let {
        tableOfContents,
        activeHeading,
        expanded = $bindable(false),
        mobile,
    }: Props = $props();

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
</script>

<aside class="toc desktop" style:--top-offset={mobile ? "0px" : "60px"}>
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

<style>
    .toc.desktop {
        width: 220px;
        height: calc(100vh - var(--top-offset));
        position: fixed;
        right: 0;
        top: var(--top-offset);
        padding: 24px 0;
        overflow-y: auto;
        border-left: 1px solid var(--color-border);
        background: var(--color-bg);

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

            &:hover {
                color: var(--color-onSurface);
            }

            &.active {
                color: var(--color-primary);
                border-left-color: var(--color-primary) !important;
                background: var(--color-primaryContainer);
            }

            &.level-2 {
                padding-left: 16px;
            }

            &.level-3 {
                padding-left: 12px;
                margin-left: 24px;
                font-size: 12px;
                border-left: 2px solid var(--color-border);
            }

            &.level-4 {
                padding-left: 12px;
                margin-left: 36px;
                font-size: 12px;
                border-left: 2px solid var(--color-border);
            }
        }
    }
</style>

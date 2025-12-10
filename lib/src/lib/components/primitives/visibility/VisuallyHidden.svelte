<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";

    /**
     * VisuallyHidden - Hides content visually while keeping it accessible to screen readers
     * Use for accessible labels, skip links, and other screen-reader-only content
     */
    interface Props {
        children: Snippet;
        /** Element tag to render */
        as?: "span" | "div";
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let { children, as = "span", ...props }: Props = $props();
</script>

<svelte:element this={as} class="visually-hidden" {...props}>
    {@render children()}
</svelte:element>

<style>
    .visually-hidden {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border: 0;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte";

    interface Props {
        children: Snippet;
        visibleWhile: string;
    }

    let { children, visibleWhile }: Props = $props();

    let visible = $state(false);

    $effect(() => {
        if (typeof window === "undefined") return;

        const media = window.matchMedia(visibleWhile);
        visible = media.matches;

        const onChange = (e: MediaQueryListEvent) => {
            visible = e.matches;
        };

        media.addEventListener("change", onChange);

        return () => {
            media.removeEventListener("change", onChange);
        };
    });
</script>

{#if visible}
    {@render children()}
{/if}

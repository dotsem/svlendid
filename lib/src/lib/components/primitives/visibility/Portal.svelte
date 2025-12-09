<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    /**
     * Portal - Renders children in a different part of the DOM
     * Useful for modals, tooltips, dropdowns that need to escape overflow
     */
    interface Props {
        children: Snippet;
        /** Target element selector or element */
        target?: string | HTMLElement;
        /** Disable portal (render in place) */
        disabled?: boolean;
    }

    let { children, target = "body", disabled = false }: Props = $props();

    let portalContainer = $state<HTMLElement>();
    let mounted = $state(false);

    onMount(() => {
        if (disabled) {
            mounted = true;
            return;
        }

        const targetEl =
            typeof target === "string"
                ? document.querySelector(target)
                : target;

        if (targetEl) {
            portalContainer = document.createElement("div");
            portalContainer.className = "svlendid-portal";
            targetEl.appendChild(portalContainer);
            mounted = true;
        }
    });

    onDestroy(() => {
        if (portalContainer?.parentNode) {
            portalContainer.parentNode.removeChild(portalContainer);
        }
    });
</script>

{#if disabled}
    {#if mounted}
        {@render children()}
    {/if}
{:else if portalContainer}
    <svelte:element this={"div"} bind:this={portalContainer}>
        {#if mounted}
            {@render children()}
        {/if}
    </svelte:element>
{/if}

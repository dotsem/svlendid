<!-- filepath: /home/sem/prog/html/svlendid/lib/src/lib/components/primitives/interactable/Hoverable.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * Hoverable primitive - tracks hover state and provides callbacks
     */
    interface Props {
        children: Snippet<[{ isHovered: boolean }]>;
        /** Called when mouse enters */
        onenter?: (event: MouseEvent) => void;
        /** Called when mouse leaves */
        onleave?: (event: MouseEvent) => void;
        /** Called when mouse moves within the element */
        onmove?: (event: MouseEvent) => void;
        /** Cursor style when hovering */
        cursor?: string;
        /** Disable hover tracking */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onenter,
        onleave,
        onmove,
        cursor = "default",
        disabled = false,
        ...props
    }: Props = $props();

    let isHovered = $state(false);

    function handleMouseEnter(event: MouseEvent) {
        if (disabled) return;
        isHovered = true;
        onenter?.(event);
    }

    function handleMouseLeave(event: MouseEvent) {
        if (disabled) return;
        isHovered = false;
        onleave?.(event);
    }

    function handleMouseMove(event: MouseEvent) {
        if (disabled) return;
        onmove?.(event);
    }
</script>

<div
    class="hoverable"
    class:disabled
    style:cursor={disabled ? "default" : cursor}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onmousemove={handleMouseMove}
    {...props}
>
    {@render children({ isHovered })}
</div>

<style>
    .hoverable {
        display: contents;
    }

    .disabled {
        pointer-events: none;
    }
</style>

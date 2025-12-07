<!-- filepath: /home/sem/prog/html/svlendid/lib/src/lib/components/primitives/interactable/Draggable.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * Draggable primitive - makes content draggable
     */
    interface Props {
        children: Snippet;
        /** Feedback content shown while dragging (defaults to children) */
        feedback?: Snippet;
        /** Called when drag starts */
        ondragstart?: (data: DragData) => void;
        /** Called during drag */
        ondrag?: (data: DragData) => void;
        /** Called when drag ends */
        ondragend?: (data: DragData) => void;
        /** Data to pass to drop targets */
        data?: unknown;
        /** Axis constraint: 'both' | 'horizontal' | 'vertical' */
        axis?: "both" | "horizontal" | "vertical";
        /** Disable dragging */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    interface DragData {
        x: number;
        y: number;
        deltaX: number;
        deltaY: number;
        startX: number;
        startY: number;
        data: unknown;
    }

    let {
        children,
        feedback,
        ondragstart,
        ondrag,
        ondragend,
        data,
        axis = "both",
        disabled = false,
        ...props
    }: Props = $props();

    let isDragging = $state(false);
    let startX = 0;
    let startY = 0;
    let currentX = $state(0);
    let currentY = $state(0);

    function handlePointerDown(event: PointerEvent) {
        if (disabled) return;

        isDragging = true;
        startX = event.clientX;
        startY = event.clientY;
        currentX = 0;
        currentY = 0;

        const target = event.currentTarget as HTMLElement;
        target.setPointerCapture(event.pointerId);

        ondragstart?.({
            x: event.clientX,
            y: event.clientY,
            deltaX: 0,
            deltaY: 0,
            startX,
            startY,
            data,
        });
    }

    function handlePointerMove(event: PointerEvent) {
        if (!isDragging) return;

        const deltaX = axis === "vertical" ? 0 : event.clientX - startX;
        const deltaY = axis === "horizontal" ? 0 : event.clientY - startY;

        currentX = deltaX;
        currentY = deltaY;

        ondrag?.({
            x: event.clientX,
            y: event.clientY,
            deltaX,
            deltaY,
            startX,
            startY,
            data,
        });
    }

    function handlePointerUp(event: PointerEvent) {
        if (!isDragging) return;

        isDragging = false;

        const deltaX = axis === "vertical" ? 0 : event.clientX - startX;
        const deltaY = axis === "horizontal" ? 0 : event.clientY - startY;

        ondragend?.({
            x: event.clientX,
            y: event.clientY,
            deltaX,
            deltaY,
            startX,
            startY,
            data,
        });

        currentX = 0;
        currentY = 0;
    }
</script>

<div
    class="draggable"
    class:dragging={isDragging}
    class:disabled
    style:cursor={disabled ? "not-allowed" : isDragging ? "grabbing" : "grab"}
    style:--drag-x="{currentX}px"
    style:--drag-y="{currentY}px"
    onpointerdown={handlePointerDown}
    onpointermove={handlePointerMove}
    onpointerup={handlePointerUp}
    onpointercancel={handlePointerUp}
    {...props}
>
    <div class="content" class:dragging={isDragging}>
        {@render children()}
    </div>
    {#if isDragging && feedback}
        <div class="feedback" style:transform="translate({currentX}px, {currentY}px)">
            {@render feedback()}
        </div>
    {/if}
</div>

<style>
    .draggable {
        display: contents;
        touch-action: none;
        user-select: none;
    }

    .content {
        transition: opacity 0.15s ease;
        will-change: opacity;
    }

    .content.dragging {
        opacity: 0.5;
    }

    .feedback {
        position: fixed;
        pointer-events: none;
        z-index: 9999;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>

<!-- filepath: /home/sem/prog/html/svlendid/lib/src/lib/components/primitives/interactable/Followable.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * Followable primitive - element that follows the mouse cursor
     * Useful for tooltips, cursor effects, and custom cursor implementations
     */
    interface Props {
        children: Snippet<[{ x: number; y: number; isActive: boolean }]>;
        /** Offset from cursor position */
        offset?: { x: number; y: number };
        /** Only follow when active (e.g., during drag or hover) */
        activeWhen?: "always" | "hover" | "drag";
        /** Smoothing factor (0 = instant, 1 = very smooth) */
        smoothing?: number;
        /** Constrain to parent bounds */
        constrainToParent?: boolean;
        /** Disable following */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        offset = { x: 10, y: 10 },
        activeWhen = "hover",
        smoothing = 0,
        constrainToParent = false,
        disabled = false,
        ...props
    }: Props = $props();

    let x = $state(0);
    let y = $state(0);
    let targetX = 0;
    let targetY = 0;
    let isHovering = $state(false);
    let isDragging = $state(false);
    let containerEl: HTMLElement;
    let animationFrame: number;

    const isActive = $derived(
        !disabled && (
            activeWhen === "always" ||
            (activeWhen === "hover" && isHovering) ||
            (activeWhen === "drag" && isDragging)
        )
    );

    function updatePosition() {
        if (smoothing > 0) {
            const factor = 1 - smoothing * 0.9;
            x = x + (targetX - x) * factor;
            y = y + (targetY - y) * factor;

            if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
                animationFrame = requestAnimationFrame(updatePosition);
            }
        } else {
            x = targetX;
            y = targetY;
        }
    }

    function handleMouseMove(event: MouseEvent) {
        if (disabled) return;

        let newX = event.clientX + offset.x;
        let newY = event.clientY + offset.y;

        if (constrainToParent && containerEl) {
            const rect = containerEl.getBoundingClientRect();
            newX = Math.max(rect.left, Math.min(newX, rect.right));
            newY = Math.max(rect.top, Math.min(newY, rect.bottom));
        }

        targetX = newX;
        targetY = newY;

        if (smoothing > 0) {
            cancelAnimationFrame(animationFrame);
            animationFrame = requestAnimationFrame(updatePosition);
        } else {
            updatePosition();
        }
    }

    function handleMouseEnter() {
        if (disabled) return;
        isHovering = true;
    }

    function handleMouseLeave() {
        isHovering = false;
    }

    function handleMouseDown() {
        if (disabled) return;
        isDragging = true;
    }

    function handleMouseUp() {
        isDragging = false;
    }
</script>

<div
    class="followable-container"
    bind:this={containerEl}
    onmousemove={handleMouseMove}
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onmousedown={handleMouseDown}
    onmouseup={handleMouseUp}
    {...props}
>
    {@render children({ x, y, isActive })}
</div>

<style>
    .followable-container {
        display: contents;
    }
</style>

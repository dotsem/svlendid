<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveRadius } from "$package/utils/style.js";
    import Portal from "$package/components/primitives/visibility/Portal.svelte";

    /**
     * Popup - A floating positioned container for dropdowns, tooltips, etc.
     */
    type PopupPlacement =
        | "top"
        | "top-start"
        | "top-end"
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "left"
        | "left-start"
        | "left-end"
        | "right"
        | "right-start"
        | "right-end";

    interface Props {
        children: Snippet;
        /** Whether the popup is visible */
        open?: boolean;
        /** Reference element to position against */
        anchor?: HTMLElement;
        /** Placement relative to anchor */
        placement?: PopupPlacement;
        /** Offset from anchor in pixels */
        offset?: number;
        /** Border radius */
        radius?: Radius | string;
        /** Close handler */
        onclose?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        open = false,
        anchor,
        placement = "bottom",
        offset = 8,
        radius,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedRadius = $derived(
        resolveRadius(radius, theme) ?? theme.radius.m
    );

    let popupEl = $state<HTMLElement>();
    let position = $state({ top: 0, left: 0 });

    function calculatePosition() {
        if (!anchor || !popupEl) return;

        const anchorRect = anchor.getBoundingClientRect();
        const popupRect = popupEl.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // Base positions
        const positions = {
            top: anchorRect.top - popupRect.height - offset,
            bottom: anchorRect.bottom + offset,
            left: anchorRect.left - popupRect.width - offset,
            right: anchorRect.right + offset,
            centerX: anchorRect.left + (anchorRect.width - popupRect.width) / 2,
            centerY:
                anchorRect.top + (anchorRect.height - popupRect.height) / 2,
            startX: anchorRect.left,
            endX: anchorRect.right - popupRect.width,
            startY: anchorRect.top,
            endY: anchorRect.bottom - popupRect.height,
        };

        switch (placement) {
            case "top":
                top = positions.top;
                left = positions.centerX;
                break;
            case "top-start":
                top = positions.top;
                left = positions.startX;
                break;
            case "top-end":
                top = positions.top;
                left = positions.endX;
                break;
            case "bottom":
                top = positions.bottom;
                left = positions.centerX;
                break;
            case "bottom-start":
                top = positions.bottom;
                left = positions.startX;
                break;
            case "bottom-end":
                top = positions.bottom;
                left = positions.endX;
                break;
            case "left":
                top = positions.centerY;
                left = positions.left;
                break;
            case "left-start":
                top = positions.startY;
                left = positions.left;
                break;
            case "left-end":
                top = positions.endY;
                left = positions.left;
                break;
            case "right":
                top = positions.centerY;
                left = positions.right;
                break;
            case "right-start":
                top = positions.startY;
                left = positions.right;
                break;
            case "right-end":
                top = positions.endY;
                left = positions.right;
                break;
        }

        // Add scroll offset
        top += window.scrollY;
        left += window.scrollX;

        position = { top, left };
    }

    $effect(() => {
        if (open && anchor) {
            // Use requestAnimationFrame to ensure popup is rendered
            requestAnimationFrame(calculatePosition);
            window.addEventListener("resize", calculatePosition);
            window.addEventListener("scroll", calculatePosition, true);
        }

        return () => {
            window.removeEventListener("resize", calculatePosition);
            window.removeEventListener("scroll", calculatePosition, true);
        };
    });
</script>

{#if open}
    <Portal>
        <div
            bind:this={popupEl}
            class="popup"
            style:top="{position.top}px"
            style:left="{position.left}px"
            style:--popup-radius={computedRadius}
            style:--popup-bg={theme.colors.card}
            style:--popup-shadow={theme.boxShadow.l}
            style:--popup-z-index={theme.zIndex.popover}
            {...props}
        >
            {@render children()}
        </div>
    </Portal>
{/if}

<style>
    .popup {
        position: absolute;
        background: var(--popup-bg);
        border-radius: var(--popup-radius);
        box-shadow: var(--popup-shadow);
        z-index: var(--popup-z-index);
        animation: popup-enter 0.15s ease-out;
    }

    @keyframes popup-enter {
        from {
            opacity: 0;
            transform: scale(0.95);
        }
        to {
            opacity: 1;
            transform: scale(1);
        }
    }
</style>

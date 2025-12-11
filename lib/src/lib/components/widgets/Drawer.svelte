<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import Portal from "$package/components/primitives/visibility/Portal.svelte";
    import Overlay from "$package/components/primitives/visibility/Overlay.svelte";

    /**
     * Drawer - A slide-in panel from screen edge
     */
    type DrawerPlacement = "left" | "right" | "top" | "bottom";

    interface Props {
        children: Snippet;
        /** Whether the drawer is visible */
        open?: boolean;
        /** Drawer placement */
        placement?: DrawerPlacement;
        /** Drawer size */
        size?: string;
        /** Content padding */
        padding?: string;
        /** Close when clicking overlay */
        closeOnOverlay?: boolean;
        /** Close when pressing Escape */
        closeOnEscape?: boolean;
        /** Close handler */
        onclose?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        open = $bindable(false),
        placement = "left",
        size = "320px",
        padding = "1.5rem",
        closeOnOverlay = true,
        closeOnEscape = true,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let isClosing = $state(false);
    let isVisible = $state(false);

    const isHorizontal = $derived(
        placement === "left" || placement === "right"
    );

    function handleClose() {
        if (isClosing) return;
        isClosing = true;
    }

    function handleAnimationEnd() {
        if (isClosing) {
            isClosing = false;
            isVisible = false;
            open = false;
            onclose?.();
        }
    }

    function handleOverlayClick() {
        if (closeOnOverlay) {
            handleClose();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && closeOnEscape) {
            handleClose();
        }
    }

    // Track open state changes
    $effect(() => {
        if (open && !isVisible) {
            isVisible = true;
            isClosing = false;
        } else if (!open && isVisible && !isClosing) {
            handleClose();
        }
    });

    $effect(() => {
        if (isVisible) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeydown);
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

{#if isVisible}
    <Portal>
        <Overlay onclick={handleOverlayClick} closing={isClosing} />
        <div
            class="drawer"
            class:horizontal={isHorizontal}
            class:left={placement === "left"}
            class:right={placement === "right"}
            class:top={placement === "top"}
            class:bottom={placement === "bottom"}
            class:closing={isClosing}
            style:--drawer-size={size}
            style:--drawer-padding={padding}
            style:--drawer-bg={theme.colors.card}
            style:--drawer-shadow={theme.boxShadow.l}
            style:--drawer-z-index={theme.zIndex.modal}
            role="dialog"
            aria-modal="true"
            onanimationend={handleAnimationEnd}
            {...props}
        >
            {@render children()}
        </div>
    </Portal>
{/if}

<style>
    .drawer {
        position: fixed;
        background: var(--drawer-bg);
        box-shadow: var(--drawer-shadow);
        z-index: var(--drawer-z-index);
        padding: var(--drawer-padding);
        overflow-y: auto;
    }

    .drawer.horizontal {
        top: 0;
        bottom: 0;
        width: var(--drawer-size);
        max-width: 100%;
    }

    .drawer.left {
        left: 0;
        animation: slide-in-left 0.25s ease-out;

        &.closing {
            animation: slide-out-left 0.2s ease-in forwards;
        }
    }

    .drawer.right {
        right: 0;
        animation: slide-in-right 0.25s ease-out;

        &.closing {
            animation: slide-out-right 0.2s ease-in forwards;
        }
    }

    .drawer:not(.horizontal) {
        left: 0;
        right: 0;
        height: var(--drawer-size);
        max-height: 100%;
    }

    .drawer.top {
        top: 0;
        animation: slide-in-top 0.25s ease-out;

        &.closing {
            animation: slide-out-top 0.2s ease-in forwards;
        }
    }

    .drawer.bottom {
        bottom: 0;
        animation: slide-in-bottom 0.25s ease-out;

        &.closing {
            animation: slide-out-bottom 0.2s ease-in forwards;
        }
    }

    /* Slide-in animations */
    @keyframes slide-in-left {
        from {
            transform: translateX(-100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slide-in-right {
        from {
            transform: translateX(100%);
        }
        to {
            transform: translateX(0);
        }
    }

    @keyframes slide-in-top {
        from {
            transform: translateY(-100%);
        }
        to {
            transform: translateY(0);
        }
    }

    @keyframes slide-in-bottom {
        from {
            transform: translateY(100%);
        }
        to {
            transform: translateY(0);
        }
    }

    /* Slide-out animations */
    @keyframes slide-out-left {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(-100%);
        }
    }

    @keyframes slide-out-right {
        from {
            transform: translateX(0);
        }
        to {
            transform: translateX(100%);
        }
    }

    @keyframes slide-out-top {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(-100%);
        }
    }

    @keyframes slide-out-bottom {
        from {
            transform: translateY(0);
        }
        to {
            transform: translateY(100%);
        }
    }
</style>

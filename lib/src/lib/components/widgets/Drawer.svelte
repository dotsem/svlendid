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
        closeOnOverlay = true,
        closeOnEscape = true,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const isHorizontal = $derived(
        placement === "left" || placement === "right"
    );

    function handleClose() {
        open = false;
        onclose?.();
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

    $effect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
            window.addEventListener("keydown", handleKeydown);
        }

        return () => {
            document.body.style.overflow = "";
            window.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

{#if open}
    <Portal>
        <Overlay onclick={handleOverlayClick} />
        <div
            class="drawer"
            class:horizontal={isHorizontal}
            class:left={placement === "left"}
            class:right={placement === "right"}
            class:top={placement === "top"}
            class:bottom={placement === "bottom"}
            style:--drawer-size={size}
            style:--drawer-bg={theme.colors.card}
            style:--drawer-shadow={theme.boxShadow.l}
            style:--drawer-z-index={theme.zIndex.modal}
            role="dialog"
            aria-modal="true"
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
    }

    .drawer.right {
        right: 0;
        animation: slide-in-right 0.25s ease-out;
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
    }

    .drawer.bottom {
        bottom: 0;
        animation: slide-in-bottom 0.25s ease-out;
    }

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
</style>

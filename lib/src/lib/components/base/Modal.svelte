<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveRadius } from "$package/utils/style.js";
    import Portal from "$package/components/primitives/visibility/Portal.svelte";
    import Overlay from "$package/components/primitives/visibility/Overlay.svelte";

    /**
     * Modal - A modal dialog container
     */
    type ModalSize = "s" | "m" | "l" | "xl" | "full";

    interface Props {
        children: Snippet;
        /** Whether the modal is visible */
        open?: boolean;
        /** Modal size preset */
        size?: ModalSize;
        /** Custom max width */
        maxWidth?: string;
        /** Border radius */
        radius?: Radius | string;
        /** Content padding */
        padding?: string;
        /** Close when clicking overlay */
        closeOnOverlay?: boolean;
        /** Close when pressing Escape */
        closeOnEscape?: boolean;
        /** Center the modal vertically */
        centered?: boolean;
        /** Close handler */
        onclose?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        open = $bindable(false),
        size = "m",
        maxWidth,
        radius,
        padding = "1.5rem",
        closeOnOverlay = true,
        closeOnEscape = true,
        centered = true,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: "400px",
        m: "560px",
        l: "720px",
        xl: "960px",
        full: "100%",
    };

    const computedMaxWidth = $derived(maxWidth ?? sizeConfig[size]);
    const computedRadius = $derived(
        resolveRadius(radius, theme) ?? theme.radius.l
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
            class="modal-container"
            class:centered
            style:--modal-z-index={theme.zIndex.modal}
        >
            <div
                class="modal"
                style:--modal-max-width={computedMaxWidth}
                style:--modal-radius={computedRadius}
                style:--modal-bg={theme.colors.card}
                style:--modal-shadow={theme.boxShadow.l}
                style:--modal-padding={padding}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                {@render children()}
            </div>
        </div>
    </Portal>
{/if}

<style>
    .modal-container {
        position: fixed;
        inset: 0;
        z-index: var(--modal-z-index);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding: 2rem;
        overflow-y: auto;

        &.centered {
            align-items: center;
        }
    }

    .modal {
        position: relative;
        width: 100%;
        max-width: var(--modal-max-width);
        background: var(--modal-bg);
        border-radius: var(--modal-radius);
        box-shadow: var(--modal-shadow);
        padding: var(--modal-padding);
        animation: modal-enter 0.2s ease-out;
    }

    @keyframes modal-enter {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }
</style>

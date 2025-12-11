<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveRadius } from "$package/utils/style.js";
    import Portal from "$package/components/primitives/visibility/Portal.svelte";
    import Overlay from "$package/components/primitives/visibility/Overlay.svelte";

    /**
     * Popup - A fullscreen dialog with dismissal options
     * Displays content centered in the viewport with overlay backdrop
     */
    type PopupSize = "s" | "m" | "l" | "xl" | "full";

    interface Props {
        children: Snippet;
        /** Whether the popup is visible */
        open?: boolean;
        /** Size preset */
        size?: PopupSize;
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
        /** Show close button in corner */
        showCloseButton?: boolean;
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
        showCloseButton = true,
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

    let isVisible = $state(false);
    let isAnimating = $state(false);

    function handleClose() {
        if (isAnimating) return;
        isAnimating = true;
        isVisible = false;
        setTimeout(() => {
            open = false;
            isAnimating = false;
            onclose?.();
        }, 150);
    }

    function handleOverlayClick() {
        if (closeOnOverlay) {
            handleClose();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape" && closeOnEscape) {
            event.preventDefault();
            handleClose();
        }
    }

    $effect(() => {
        if (open) {
            isVisible = true;
            // Get scrollbar width before hiding
            const scrollbarWidth =
                window.innerWidth - document.documentElement.clientWidth;
            document.body.style.overflow = "hidden";
            document.body.style.paddingRight = `${scrollbarWidth}px`;
            window.addEventListener("keydown", handleKeydown);
        }

        return () => {
            document.body.style.overflow = "";
            document.body.style.paddingRight = "";
            window.removeEventListener("keydown", handleKeydown);
        };
    });
</script>

{#if open}
    <Portal>
        <Overlay closing={!isVisible} />
        <div
            class="popup-container"
            class:closing={!isVisible}
            style:--popup-z-index={theme.zIndex.modal}
            onclick={handleOverlayClick}
            onkeydown={(e) =>
                e.key === "Escape" && closeOnEscape && handleClose()}
            role="presentation"
        >
            <div
                class="popup"
                class:closing={!isVisible}
                style:--popup-max-width={computedMaxWidth}
                style:--popup-radius={computedRadius}
                style:--popup-bg={theme.colors.card}
                style:--popup-shadow={theme.boxShadow.l}
                style:--popup-padding={padding}
                onclick={(e) => e.stopPropagation()}
                onkeydown={(e) => e.stopPropagation()}
                role="dialog"
                aria-modal="true"
                {...props}
            >
                {#if showCloseButton}
                    <button
                        class="popup-close"
                        onclick={handleClose}
                        type="button"
                        aria-label="Close"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                        >
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                {/if}
                {@render children()}
            </div>
        </div>
    </Portal>
{/if}

<style>
    .popup-container {
        position: fixed;
        inset: 0;
        z-index: var(--popup-z-index);
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 2rem;
        overflow-y: auto;
    }

    .popup {
        position: relative;
        width: 100%;
        max-width: var(--popup-max-width);
        background: var(--popup-bg);
        border-radius: var(--popup-radius);
        box-shadow: var(--popup-shadow);
        padding: var(--popup-padding);
        animation: popup-enter 0.2s ease-out forwards;

        &.closing {
            animation: popup-exit 0.15s ease-in forwards;
        }
    }

    .popup-close {
        position: absolute;
        top: 0.75rem;
        right: 0.75rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        color: inherit;
        background: transparent;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0.6;
        transition:
            opacity 0.15s ease,
            background 0.15s ease;

        &:hover {
            opacity: 1;
            background: rgba(0, 0, 0, 0.1);
        }

        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
    }

    @keyframes popup-enter {
        from {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
        to {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
    }

    @keyframes popup-exit {
        from {
            opacity: 1;
            transform: scale(1) translateY(0);
        }
        to {
            opacity: 0;
            transform: scale(0.95) translateY(-10px);
        }
    }
</style>

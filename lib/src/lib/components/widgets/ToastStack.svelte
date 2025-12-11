<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import { toastStore, type ToastMessage } from "$package/stores/toast.js";
    import Toast from "./Toast.svelte";

    /**
     * ToastStack - Global container for toast notifications
     * Place this component once in your app layout to display toasts from the store
     */
    type ToastPosition =
        | "top"
        | "top-left"
        | "top-right"
        | "bottom"
        | "bottom-left"
        | "bottom-right";

    interface PositionStyles {
        top?: string;
        right?: string;
        bottom?: string;
        left?: string;
        transform?: string;
    }

    interface Props {
        /** Position of the toast stack */
        position?: ToastPosition;
        /** Gap between toasts */
        gap?: string;
        /** Maximum number of visible toasts */
        maxVisible?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        position = "top-right",
        gap = "0.5rem",
        maxVisible = 5,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const positionStyles = $derived.by((): PositionStyles => {
        switch (position) {
            case "top":
                return {
                    top: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                };
            case "top-left":
                return { top: "1rem", left: "1rem" };
            case "top-right":
                return { top: "1rem", right: "1rem" };
            case "bottom":
                return {
                    bottom: "1rem",
                    left: "50%",
                    transform: "translateX(-50%)",
                };
            case "bottom-left":
                return { bottom: "1rem", left: "1rem" };
            case "bottom-right":
                return { bottom: "1rem", right: "1rem" };
            default:
                return { top: "1rem", right: "1rem" };
        }
    });

    const visibleToasts = $derived($toastStore.toasts.slice(-maxVisible));

    function handleClose(id: string) {
        toastStore.remove(id);
    }

    function handleMouseEnter(id: string) {
        toastStore.pauseTimer(id);
    }

    function handleMouseLeave(id: string) {
        toastStore.resumeTimer(id);
    }
</script>

{#if visibleToasts.length > 0}
    <div
        class="toast-stack"
        class:bottom={position.startsWith("bottom")}
        style:--stack-gap={gap}
        style:--stack-z-index={(theme.zIndex?.modal ?? 1000) + 10}
        style:top={positionStyles.top}
        style:right={positionStyles.right}
        style:bottom={positionStyles.bottom}
        style:left={positionStyles.left}
        style:transform={positionStyles.transform}
        aria-live="polite"
        aria-atomic="false"
        {...props}
    >
        {#each visibleToasts as toast (toast.id)}
            <div
                class="toast-wrapper"
                onmouseenter={() => handleMouseEnter(toast.id)}
                onmouseleave={() => handleMouseLeave(toast.id)}
            >
                <Toast
                    color={toast.color}
                    variant={toast.variant}
                    closable={toast.closable}
                    onclose={() => handleClose(toast.id)}
                >
                    {toast.message}
                </Toast>
            </div>
        {/each}
    </div>
{/if}

<style>
    .toast-stack {
        position: fixed;
        z-index: var(--stack-z-index);
        display: flex;
        flex-direction: column;
        gap: var(--stack-gap);
        pointer-events: none;

        &.bottom {
            flex-direction: column-reverse;
        }
    }

    .toast-wrapper {
        pointer-events: auto;
        animation: toast-slide-in 0.25s ease-out;
    }

    @keyframes toast-slide-in {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
</style>

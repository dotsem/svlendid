<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import Modal from "$package/components/base/Modal.svelte";

    /**
     * Dialog - A composed modal dialog with header, content, and actions
     */
    type DialogSize = "s" | "m" | "l";

    interface Props {
        /** Whether the dialog is visible */
        open?: boolean;
        /** Dialog title */
        title?: string;
        /** Dialog content */
        children?: Snippet;
        /** Footer/actions slot */
        actions?: Snippet;
        /** Dialog size */
        size?: DialogSize;
        /** Show close button in header */
        showClose?: boolean;
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
        open = $bindable(false),
        title,
        children,
        actions,
        size = "m",
        showClose = true,
        closeOnOverlay = true,
        closeOnEscape = true,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function handleClose() {
        open = false;
        onclose?.();
    }
</script>

<Modal
    bind:open
    {size}
    {closeOnOverlay}
    {closeOnEscape}
    onclose={handleClose}
    {...props}
>
    <div class="dialog" style:--dialog-border={theme.colors.outline}>
        {#if title || showClose}
            <header class="dialog-header">
                {#if title}
                    <h2 class="dialog-title">{title}</h2>
                {/if}
                {#if showClose}
                    <button
                        class="dialog-close"
                        onclick={handleClose}
                        aria-label="Close dialog"
                    >
                        <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            stroke-width="2"
                        >
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                    </button>
                {/if}
            </header>
        {/if}

        {#if children}
            <div class="dialog-content">
                {@render children()}
            </div>
        {/if}

        {#if actions}
            <footer class="dialog-actions">
                {@render actions()}
            </footer>
        {/if}
    </div>
</Modal>

<style>
    .dialog {
        display: flex;
        flex-direction: column;
    }

    .dialog-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 1.5rem;
        border-bottom: 1px solid var(--dialog-border);
    }

    .dialog-title {
        margin: 0;
        font-size: 1.25rem;
        font-weight: 600;
        line-height: 1.4;
    }

    .dialog-close {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        margin-left: auto;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.6;
        border-radius: 50%;
        transition: opacity 0.15s ease;

        &:hover {
            opacity: 1;
        }

        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
    }

    .dialog-content {
        padding: 1.5rem;
        overflow-y: auto;
    }

    .dialog-actions {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 0.75rem;
        padding: 1rem 1.5rem;
        border-top: 1px solid var(--dialog-border);
    }
</style>

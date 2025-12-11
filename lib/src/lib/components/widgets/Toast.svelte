<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * Toast - A notification message
     */
    type ToastVariant = "filled" | "tonal";
    type ToastPosition =
        | "top"
        | "top-left"
        | "top-right"
        | "bottom"
        | "bottom-left"
        | "bottom-right";

    interface Props {
        children: Snippet;
        /** Toast color/type */
        color?: ColorPalette;
        /** Visual variant */
        variant?: ToastVariant;
        /** Show close button */
        closable?: boolean;
        /** Icon slot */
        icon?: Snippet;
        /** Action slot */
        action?: Snippet;
        /** Close handler */
        onclose?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        color = "primary",
        variant = "filled",
        closable = true,
        icon,
        action,
        onclose,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const baseColor = $derived(resolveColor(color, theme));
    const onColor = $derived(getOnColor(color, theme));

    const variantStyles = $derived.by(() => {
        switch (variant) {
            case "filled":
                return { bg: baseColor, color: onColor };
            case "tonal":
                return { bg: theme.colors.card, color: "inherit" };
        }
    });

    function handleClose() {
        onclose?.();
    }
</script>

<div
    class="toast"
    role="button"
    style:--toast-bg={variantStyles.bg}
    style:--toast-color={variantStyles.color}
    style:--toast-radius={theme.radius.m}
    style:--toast-shadow={theme.boxShadow.l}
    onclick={handleClose}
    onkeydown={(e) => e.key === "Enter" && handleClose()}
    tabindex="0"
    {...props}
>
    {#if icon}
        <span class="toast-icon">{@render icon()}</span>
    {/if}

    <div class="toast-content">
        {@render children()}
    </div>

    {#if action}
        <div class="toast-action">
            {@render action()}
        </div>
    {/if}

    {#if closable}
        <button class="toast-close" onclick={handleClose} aria-label="Close">
            <svg
                width="16"
                height="16"
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
</div>

<style>
    .toast {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.75rem 1rem;
        background: var(--toast-bg);
        color: var(--toast-color);
        border-radius: var(--toast-radius);
        box-shadow: var(--toast-shadow);
        min-width: 280px;
        max-width: 420px;
        animation: toast-enter 0.2s ease-out;
        cursor: pointer;
        transition:
            opacity 0.15s ease,
            transform 0.15s ease;

        &:hover {
            opacity: 0.95;
        }

        &:active {
            transform: scale(0.98);
        }
    }

    @keyframes toast-enter {
        from {
            opacity: 0;
            transform: translateY(-8px) scale(0.95);
        }
        to {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
    }

    .toast-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    .toast-content {
        flex: 1;
        font-size: 0.875rem;
    }

    .toast-action {
        flex-shrink: 0;
    }

    .toast-close {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        padding: 0;
        background: none;
        border: none;
        color: inherit;
        cursor: pointer;
        opacity: 0.7;
        transition: opacity 0.15s ease;
        border-radius: 50%;

        &:hover {
            opacity: 1;
        }
    }
</style>

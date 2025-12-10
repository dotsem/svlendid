<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import {
        resolveColor,
        getContainerColor,
        getOnContainerColor,
    } from "$package/utils/style.js";

    /**
     * Alert - An informational message box
     */
    type AlertVariant = "filled" | "tonal" | "outlined";
    type AlertSeverity = "info" | "success" | "warning" | "error";

    interface Props {
        children: Snippet;
        /** Alert severity/type */
        severity?: AlertSeverity;
        /** Visual variant */
        variant?: AlertVariant;
        /** Optional title */
        title?: string;
        /** Show icon for severity */
        showIcon?: boolean;
        /** Dismissible alert */
        dismissible?: boolean;
        /** Custom icon slot */
        icon?: Snippet;
        /** Action slot */
        action?: Snippet;
        /** Dismiss handler */
        ondismiss?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        severity = "info",
        variant = "tonal",
        title,
        showIcon = true,
        dismissible = false,
        icon,
        action,
        ondismiss,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const severityColors: Record<AlertSeverity, ColorPalette> = {
        info: "primary",
        success: "success",
        warning: "warning",
        error: "error",
    };

    const severityIcons = {
        info: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z",
        success:
            "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z",
        warning: "M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z",
        error: "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z",
    };

    const color = $derived(severityColors[severity]);
    const baseColor = $derived(resolveColor(color, theme));
    const containerColor = $derived(getContainerColor(color, theme));
    const onContainerColor = $derived(getOnContainerColor(color, theme));

    const variantStyles = $derived.by(() => {
        switch (variant) {
            case "filled":
                return { bg: baseColor, color: "white", border: "none" };
            case "tonal":
                return {
                    bg: containerColor,
                    color: onContainerColor,
                    border: "none",
                };
            case "outlined":
                return {
                    bg: "transparent",
                    color: baseColor,
                    border: `1px solid ${baseColor}`,
                };
        }
    });

    let visible = $state(true);

    function handleDismiss() {
        visible = false;
        ondismiss?.();
    }
</script>

{#if visible}
    <div
        class="alert"
        role="alert"
        style:--alert-bg={variantStyles.bg}
        style:--alert-color={variantStyles.color}
        style:--alert-border={variantStyles.border}
        style:--alert-radius={theme.radius.m}
        {...props}
    >
        {#if showIcon}
            <span class="alert-icon">
                {#if icon}
                    {@render icon()}
                {:else}
                    <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d={severityIcons[severity]} />
                    </svg>
                {/if}
            </span>
        {/if}

        <div class="alert-content">
            {#if title}
                <div class="alert-title">{title}</div>
            {/if}
            <div class="alert-message">
                {@render children()}
            </div>
        </div>

        {#if action}
            <div class="alert-action">
                {@render action()}
            </div>
        {/if}

        {#if dismissible}
            <button
                class="alert-dismiss"
                onclick={handleDismiss}
                aria-label="Dismiss"
            >
                <svg
                    width="18"
                    height="18"
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
{/if}

<style>
    .alert {
        display: flex;
        align-items: flex-start;
        gap: 0.75rem;
        padding: 1rem;
        background: var(--alert-bg);
        color: var(--alert-color);
        border: var(--alert-border);
        border-radius: var(--alert-radius);
    }

    .alert-icon {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
            width: 20px;
            height: 20px;
        }
    }

    .alert-content {
        flex: 1;
        min-width: 0;
    }

    .alert-title {
        font-weight: 600;
        margin-bottom: 0.25rem;
    }

    .alert-message {
        font-size: 0.875rem;
        opacity: 0.9;
    }

    .alert-action {
        flex-shrink: 0;
    }

    .alert-dismiss {
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

        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
        }
    }
</style>

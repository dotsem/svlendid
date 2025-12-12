<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorProp } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Link - A styled anchor element
     */
    type LinkUnderline = "always" | "hover" | "none";

    interface Props {
        children: Snippet;
        /** Link URL */
        href: string;
        /** Color scheme */
        color?: ColorProp;
        /** Underline behavior */
        underline?: LinkUnderline;
        /** Open in new tab */
        external?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        href,
        color = "primary",
        underline = "always",
        external = false,
        disabled = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));
    const computedUnderline = $derived(
        underline === "always" ? "underline" : "none"
    );
    const computedHoverUnderline = $derived(
        underline === "none" ? "none" : "underline"
    );
</script>

<a
    class="link"
    class:disabled
    {href}
    target={external ? "_blank" : undefined}
    rel={external ? "noopener noreferrer" : undefined}
    style:--link-color={computedColor}
    style:--link-underline={computedUnderline}
    style:--link-hover-underline={computedHoverUnderline}
    style:--link-transition={theme.transitions.fast}
    aria-disabled={disabled}
    {...props}
>
    {@render children()}
    {#if external}
        <svg
            class="external-icon"
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path
                d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"
            />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
    {/if}
</a>

<style>
    .link {
        display: inline-flex;
        align-items: center;
        gap: 0.25em;
        color: var(--link-color);
        text-decoration: var(--link-underline);
        transition:
            color var(--link-transition) ease,
            text-decoration var(--link-transition) ease;

        &:hover:not(.disabled) {
            text-decoration: var(--link-hover-underline);
            filter: brightness(1.1);
        }

        &:focus-visible {
            outline: 2px solid var(--link-color);
            outline-offset: 2px;
            border-radius: 2px;
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
            pointer-events: none;
        }
    }

    .external-icon {
        flex-shrink: 0;
    }
</style>

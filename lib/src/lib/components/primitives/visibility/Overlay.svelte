<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import Portal from "./Portal.svelte";

    /**
     * Overlay - Backdrop component for modals, drawers, and dialogs
     * Renders a semi-transparent backdrop that covers the viewport
     */
    interface Props {
        children?: Snippet;
        /** Whether the overlay is visible */
        visible?: boolean;
        /** Whether the overlay is closing (for animation) */
        closing?: boolean;
        /** Background color */
        color?: string;
        /** Background opacity (0-1) */
        opacity?: number;
        /** Apply backdrop blur effect */
        blur?: string;
        /** Click handler for the overlay */
        onclick?: (event: MouseEvent) => void;
        /** Z-index level */
        zIndex?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        visible = true,
        closing = false,
        color = "black",
        opacity = 0.5,
        blur,
        onclick,
        zIndex,
        ...props
    }: Props = $props();

    const theme = getTheme();
    const computedZIndex = $derived(zIndex ?? theme.zIndex.overlay);
</script>

{#if visible}
    <Portal>
        <div
            class="overlay"
            class:closing
            style:--overlay-color={color}
            style:--overlay-opacity={opacity}
            style:--overlay-blur={blur ?? "none"}
            style:--overlay-z-index={computedZIndex}
            style:--overlay-transition={theme.transitions.fast}
            {onclick}
            role="presentation"
            {...props}
        >
            {#if children}
                {@render children()}
            {/if}
        </div>
    </Portal>
{/if}

<style>
    .overlay {
        position: fixed;
        inset: 0;
        background: var(--overlay-color);
        opacity: var(--overlay-opacity);
        backdrop-filter: blur(var(--overlay-blur));
        z-index: var(--overlay-z-index);
        transition: opacity var(--overlay-transition) ease;
        animation: overlay-fade-in 0.2s ease-out;

        &.closing {
            animation: overlay-fade-out 0.2s ease-in forwards;
        }
    }

    @keyframes overlay-fade-in {
        from {
            opacity: 0;
        }
        to {
            opacity: var(--overlay-opacity);
        }
    }

    @keyframes overlay-fade-out {
        from {
            opacity: var(--overlay-opacity);
        }
        to {
            opacity: 0;
        }
    }
</style>

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
    }
</style>

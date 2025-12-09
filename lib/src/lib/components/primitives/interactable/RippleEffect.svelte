<script lang="ts">
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";
    import type { Radius } from "$lib/types/layout.type.js";

    interface Props {
        /** Ripple color */
        color?: ColorPalette | string;
        /** Ripple opacity */
        opacity?: number;
        /** Duration in ms */
        duration?: number;
        /** Center ripple instead of from click point */
        center?: boolean;
        /** Border radius (uses theme radius keys or custom value) */
        radius?: Radius | string;
    }

    let {
        color,
        opacity = 0.3,
        duration = 400,
        center = false,
        radius,
    }: Props = $props();

    const theme = getTheme();

    interface RippleItem {
        id: number;
        x: number;
        y: number;
        size: number;
    }

    let ripples = $state<RippleItem[]>([]);
    let nextId = 0;
    let containerEl: HTMLElement;

    function resolveColor(c: ColorPalette | string | undefined): string {
        if (!c) return theme.colors.onSurface ?? "#000";
        const paletteColor = theme.colors[c as ColorPalette];
        return paletteColor ?? c;
    }

    const computedColor = $derived(resolveColor(color));

    // Resolve radius from theme or use custom value
    function resolveRadius(r: Radius | string | undefined): string | undefined {
        if (!r) return undefined;
        const themeRadius = theme.radius[r as Radius];
        return themeRadius ?? r;
    }

    const computedRadius = $derived(resolveRadius(radius));

    export function trigger(event: MouseEvent) {
        if (!containerEl) return;

        const rect = containerEl.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height) * 2;

        let x: number, y: number;
        if (center) {
            x = rect.width / 2 - size / 2;
            y = rect.height / 2 - size / 2;
        } else {
            x = event.clientX - rect.left - size / 2;
            y = event.clientY - rect.top - size / 2;
        }

        const ripple: RippleItem = {
            id: nextId++,
            x,
            y,
            size,
        };

        ripples = [...ripples, ripple];

        setTimeout(() => {
            ripples = ripples.filter((r) => r.id !== ripple.id);
        }, duration);
    }
</script>

<span
    class="ripple-wrapper"
    bind:this={containerEl}
    style:--ripple-color={computedColor}
    style:--ripple-opacity={opacity}
    style:--ripple-duration="{duration}ms"
    style:border-radius={computedRadius}
    aria-hidden="true"
>
    {#each ripples as ripple (ripple.id)}
        <span
            class="ripple"
            style:left="{ripple.x}px"
            style:top="{ripple.y}px"
            style:width="{ripple.size}px"
            style:height="{ripple.size}px"
        ></span>
    {/each}
</span>

<style>
    .ripple-wrapper {
        position: absolute;
        inset: 0;
        pointer-events: none;
        overflow: hidden;
        /* Inherit border-radius to clip ripple correctly */
        border-radius: inherit;
        z-index: 0;
    }

    /* z-index 0 ensures it is behind content if parent establishes stacking context, 
       but Button usually puts content in span with z-index? 
       Actually Button content has no z-index. 
       If we want ripple on top of background but behind text, we need stacking.
       But standard Material ripple is often an overlay.
    */

    .ripple {
        position: absolute;
        border-radius: 50%;
        background: var(--ripple-color);
        opacity: var(--ripple-opacity);
        transform: scale(0);
        animation: ripple-animation var(--ripple-duration) ease-out forwards;
    }

    @keyframes ripple-animation {
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
</style>

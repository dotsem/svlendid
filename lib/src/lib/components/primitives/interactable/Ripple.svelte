<script lang="ts">
    import type { Snippet } from "svelte";
    import RippleEffect from "./RippleEffect.svelte";
    import type { ColorProp } from "$package/types/colorPalette.type.js";
    import type { Radius } from "$package/types/layout.type.js";

    /**
     * @component Ripple
     * Material Design ripple effect wrapper
     */
    interface Props {
        children: Snippet;
        /** Ripple color */
        color?: ColorProp;
        /** Ripple opacity */
        opacity?: number;
        /** Duration in ms */
        duration?: number;
        /** Disable ripple */
        disabled?: boolean;
        /** Center ripple instead of from click point */
        center?: boolean;
        /** Border radius (uses theme radius keys or custom value) */
        radius?: Radius | string;
        /** Click handler */
        onclick?: (event: MouseEvent) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        color,
        opacity = 0.3,
        duration = 400,
        disabled = false,
        center = false,
        radius,
        onclick,
        ...props
    }: Props = $props();

    let rippleEffect: RippleEffect;

    function handleClick(event: MouseEvent) {
        if (disabled) return;
        rippleEffect.trigger(event);
        onclick?.(event);
    }
</script>

<div
    class="ripple-container"
    onclick={handleClick}
    role="button"
    tabindex={disabled ? -1 : 0}
    {...props}
>
    {@render children()}

    <RippleEffect
        bind:this={rippleEffect}
        {color}
        {opacity}
        {duration}
        {center}
        {radius}
    />
</div>

<style>
    .ripple-container {
        position: relative;
        overflow: hidden;
        cursor: pointer;
        display: inline-block;
        /* Inherit border-radius from parent or from style attribute */
        border-radius: inherit;
    }
</style>

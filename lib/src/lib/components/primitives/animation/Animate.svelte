<script lang="ts">
    import type { Snippet } from "svelte";
    import { onDestroy } from "svelte";
    import type {
        AnimationPreset,
        AnimationEasing,
    } from "$package/types/animation.type.js";
    import { resolveEasing } from "./easing.js";
    import "./animations.css";

    /**
     * @component Animate
     * Powerful entry/exit animation component using IntersectionObserver.
     * Animate elements when they enter or leave the viewport with preset or custom animations.
     *
     * @example
     * <Animate animation="fadeUp" duration={500}>
     *   <Card>Animated content</Card>
     * </Animate>
     *
     * @example
     * <Animate animation="scale" once>
     *   <Text>Animates only once</Text>
     * </Animate>
     */
    interface Props {
        children: Snippet;
        /** Animation preset or custom animation name */
        animation?: AnimationPreset | string;
        /** Animation duration in ms */
        duration?: number;
        /** Delay before animation starts (ms) */
        delay?: number;
        /** Animation timing function */
        easing?: AnimationEasing | string;
        /** Distance for directional animations */
        distance?: string;
        /** Scale factor for scale animations (0-1 for shrink, >1 for grow) */
        scale?: number;
        /** Rotation angle */
        angle?: string;
        /** Exit animation (defaults to reverse of entry) */
        exitAnimation?: AnimationPreset | string;
        /** Threshold for triggering animation (0-1) */
        threshold?: number;
        /** Root margin for early/late triggering */
        rootMargin?: string;
        /** Only animate once (won't re-animate when scrolling back) */
        once?: boolean;
        /** Start with element visible (animates out on scroll) */
        startVisible?: boolean;
        /** Disable animation */
        disabled?: boolean;
        /** Called when animation starts */
        onanimationstart?: () => void;
        /** Called when animation ends */
        onanimationend?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        animation = "fadeUp",
        duration = 600,
        delay = 0,
        easing = "ease-out",
        distance = "30px",
        scale = 0.9,
        angle = "15deg",
        exitAnimation,
        threshold = 0.1,
        rootMargin = "0px",
        once = false,
        startVisible = false,
        disabled = false,
        onanimationstart,
        onanimationend,
        ...props
    }: Props = $props();

    let element: HTMLElement | undefined = $state();
    let isVisible = $state(false);
    let hasAnimated = $state(false);

    // Initialize visibility based on startVisible prop
    $effect(() => {
        if (startVisible && !hasAnimated) {
            isVisible = true;
        }
    });
    let observer: IntersectionObserver | undefined;

    const computedEasing = $derived(resolveEasing(easing));

    // Generate CSS variables for animation
    const cssVars = $derived({
        "--animate-duration": `${duration}ms`,
        "--animate-delay": `${delay}ms`,
        "--animate-easing": computedEasing,
        "--animate-distance": distance,
        "--animate-scale": String(scale),
        "--animate-angle": angle,
    });

    // Compute the current animation class
    const animationClass = $derived.by(() => {
        if (disabled || animation === "none") return "";
        const currentAnim = isVisible
            ? animation
            : (exitAnimation ?? animation);
        return `animate-${currentAnim}`;
    });

    // Set up IntersectionObserver
    $effect(() => {
        if (!element || disabled) return;

        observer?.disconnect();

        observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                const newIsVisible = entry.isIntersecting;

                // Skip if once mode and already animated
                if (once && hasAnimated && newIsVisible) return;

                if (newIsVisible !== isVisible) {
                    if (newIsVisible) {
                        onanimationstart?.();
                    }

                    isVisible = newIsVisible;

                    if (newIsVisible) {
                        hasAnimated = true;
                        // Fire end callback after animation completes
                        setTimeout(() => {
                            onanimationend?.();
                        }, duration + delay);
                    }
                }

                // Disconnect if once mode after first visibility
                if (once && hasAnimated) {
                    observer?.disconnect();
                }
            },
            {
                threshold,
                rootMargin,
            }
        );

        observer.observe(element);

        return () => {
            observer?.disconnect();
        };
    });

    onDestroy(() => {
        observer?.disconnect();
    });
</script>

<div
    class="animate-wrapper {animationClass}"
    class:animate-visible={isVisible}
    class:animate-hidden={!isVisible && !disabled}
    bind:this={element}
    style:--animate-duration={cssVars["--animate-duration"]}
    style:--animate-delay={cssVars["--animate-delay"]}
    style:--animate-easing={cssVars["--animate-easing"]}
    style:--animate-distance={cssVars["--animate-distance"]}
    style:--animate-scale={cssVars["--animate-scale"]}
    style:--animate-angle={cssVars["--animate-angle"]}
    {...props}
>
    {@render children()}
</div>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    /**
     * @component Visible
     * Detects when element enters/leaves the viewport using IntersectionObserver.
     * Useful for lazy loading, animations on scroll, and tracking visibility.
     * 
     * @example
     * <Visible threshold={0.5} onenter={() => console.log('visible!')}>
     *   {#snippet children({ isVisible, ratio })}
     *     <div>{isVisible ? 'In view!' : 'Scroll to see me'}</div>
     *   {/snippet}
     * </Visible>
     */
    interface Props {
        children: Snippet<[{ isVisible: boolean; ratio: number }]>;
        /** Called when visibility changes */
        onvisibilitychange?: (isVisible: boolean, ratio: number) => void;
        /** Called when element becomes visible */
        onenter?: () => void;
        /** Called when element leaves viewport */
        onleave?: () => void;
        /** Threshold ratio (0-1) to trigger visibility. Can be array for multiple thresholds. */
        threshold?: number | number[];
        /** Root margin for intersection observer (e.g., "100px" to trigger 100px before entering) */
        rootMargin?: string;
        /** Only trigger once (useful for one-time animations) */
        once?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onvisibilitychange,
        onenter,
        onleave,
        threshold = 0,
        rootMargin = "0px",
        once = false,
        ...props
    }: Props = $props();

    let isVisible = $state(false);
    let ratio = $state(0);
    let element: HTMLElement | undefined = $state();
    let observer: IntersectionObserver | undefined;
    let hasTriggered = false;

    // Create observer when element is available
    $effect(() => {
        if (!element) return;

        // Cleanup previous observer
        observer?.disconnect();

        observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                if (!entry) return;

                const newIsVisible = entry.isIntersecting;
                const newRatio = entry.intersectionRatio;

                if (once && hasTriggered && newIsVisible) {
                    return;
                }

                const wasVisible = isVisible;
                isVisible = newIsVisible;
                ratio = newRatio;

                onvisibilitychange?.(newIsVisible, newRatio);

                if (newIsVisible && !wasVisible) {
                    onenter?.();
                    if (once) {
                        hasTriggered = true;
                        observer?.disconnect();
                    }
                } else if (!newIsVisible && wasVisible) {
                    onleave?.();
                }
            },
            {
                threshold: Array.isArray(threshold) ? threshold : [threshold],
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

<!-- 
    Important: We use a real element with display:block because IntersectionObserver 
    cannot observe elements with display:contents (they don't generate a box)
-->
<div class="visible-detector" bind:this={element} {...props}>
    {@render children({ isVisible, ratio })}
</div>

<style>
    .visible-detector {
        /* Use display:block to ensure the element generates a box for IntersectionObserver */
        display: block;
    }
</style>

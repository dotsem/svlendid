<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    /**
     * Visible - Detects when element enters/leaves viewport
     */
    interface Props {
        children: Snippet<[{ isVisible: boolean; ratio: number }]>;
        /** Called when visibility changes */
        onvisibilitychange?: (isVisible: boolean, ratio: number) => void;
        /** Called when element becomes visible */
        onenter?: () => void;
        /** Called when element leaves viewport */
        onleave?: () => void;
        /** Threshold ratio (0-1) to trigger visibility */
        threshold?: number | number[];
        /** Root margin for intersection observer */
        rootMargin?: string;
        /** Only trigger once */
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
    let element: HTMLElement;
    let observer: IntersectionObserver;
    let hasTriggered = false;

    onMount(() => {
        observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0];
                const newIsVisible = entry.isIntersecting;
                const newRatio = entry.intersectionRatio;

                if (once && hasTriggered && newIsVisible) {
                    return;
                }

                const wasVisible = isVisible;
                isVisible = newIsVisible;
                ratio = newRatio;

                onvisibilitychange?.(isVisible, ratio);

                if (newIsVisible && !wasVisible) {
                    onenter?.();
                    if (once) {
                        hasTriggered = true;
                        observer.disconnect();
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
    });

    onDestroy(() => {
        observer?.disconnect();
    });
</script>

<div class="visible-detector" bind:this={element} {...props}>
    {@render children({ isVisible, ratio })}
</div>

<style>
    .visible-detector {
        display: contents;
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * @component Stack
     * Positions children on top of each other (z-axis stacking).
     * All children are positioned absolutely within the stack.
     * 
     * @example
     * <Stack>
     *   <img src="background.jpg" alt="" />
     *   <div>Overlay content</div>
     * </Stack>
     */
    interface Props {
        children?: Snippet;
        /** Width of the stack container */
        width?: string;
        /** Height of the stack container */
        height?: string;
        /** Alignment of children within the stack */
        align?: "start" | "center" | "end" | "stretch";
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        width = "100%",
        height = "auto",
        align = "stretch",
        ...props
    }: Props = $props();

    const alignMap = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        stretch: "stretch",
    };
</script>

<div
    class="stack"
    style:width={width}
    style:height={height}
    style:--stack-align={alignMap[align]}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .stack {
        display: grid;
        grid-template-areas: "stack";
        place-items: var(--stack-align);
        box-sizing: border-box;

        & > :global(*) {
            grid-area: stack;
        }
    }
</style>

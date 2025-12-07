<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * Center - Centers its child both horizontally and vertically
     */
    interface Props {
        children?: Snippet;
        /** Width of the container */
        width?: string;
        /** Height of the container */
        height?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        width = "100%",
        height = "100%",
        ...props
    }: Props = $props();
</script>

<div
    class="center"
    style:width={width}
    style:height={height}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .center {
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
</style>

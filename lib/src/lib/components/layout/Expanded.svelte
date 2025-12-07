<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * @component Expanded
     * A widget that expands to fill available space in a Row or Column.
     * Similar to flex-grow in CSS.
     * 
     * @example
     * <Row>
     *   <Button>Fixed</Button>
     *   <Expanded>
     *     <Input placeholder="Takes remaining space" />
     *   </Expanded>
     * </Row>
     */
    interface Props {
        children?: Snippet;
        /** Flex grow factor (default: 1) */
        flex?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        flex = 1,
        ...props
    }: Props = $props();
</script>

<div
    class="expanded"
    style:flex-grow={flex}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .expanded {
        flex-shrink: 1;
        min-width: 0;
        min-height: 0;
        box-sizing: border-box;
    }
</style>

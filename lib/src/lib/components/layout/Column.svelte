<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$lib/config/theme.js";
    import type { Spacing } from "$lib/types/layout.type.js";

    /**
     * @component Column
     * Vertical layout container that arranges children in a column.
     * 
     * @example
     * <Column gap="m" align="center">
     *   <Text>Item 1</Text>
     *   <Text>Item 2</Text>
     * </Column>
     */
    interface Props {
        children?: Snippet;
        /** Align items on horizontal axis */
        align?: "start" | "center" | "end" | "stretch";
        /** Justify content on vertical axis */
        justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
        /** Gap between children */
        gap?: Spacing | string;
        /** Reverse the order of children */
        reverse?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        align = "stretch",
        justify = "start",
        gap,
        reverse = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveSpacing(value: Spacing | string | undefined): string | undefined {
        if (!value) return undefined;
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    const alignMap = { 
        start: "flex-start", 
        center: "center", 
        end: "flex-end", 
        stretch: "stretch" 
    };
    
    const justifyMap = { 
        start: "flex-start", 
        center: "center", 
        end: "flex-end", 
        between: "space-between", 
        around: "space-around", 
        evenly: "space-evenly" 
    };

    const computedGap = $derived(resolveSpacing(gap));
</script>

<div
    class="column"
    style:align-items={alignMap[align]}
    style:justify-content={justifyMap[justify]}
    style:gap={computedGap}
    style:flex-direction={reverse ? "column-reverse" : "column"}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .column {
        display: flex;
        box-sizing: border-box;
    }
</style>

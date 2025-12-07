<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$lib/config/theme.js";
    import type { Spacing } from "$lib/types/layout.type.js";

    /**
     * Flex - Flexbox layout container
     */
    interface Props {
        children?: Snippet;
        /** Flex direction */
        direction?: "row" | "column" | "row-reverse" | "column-reverse";
        /** Align items on cross axis */
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        /** Justify content on main axis */
        justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
        /** Gap between children */
        gap?: Spacing | string;
        /** Flex wrap */
        wrap?: "nowrap" | "wrap" | "wrap-reverse";
        /** Make flex container inline */
        inline?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        direction = "row",
        align = "stretch",
        justify = "start",
        gap,
        wrap = "nowrap",
        inline = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveSpacing(value: Spacing | string | undefined): string | undefined {
        if (!value) return undefined;
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    const alignMap = { start: "flex-start", center: "center", end: "flex-end", stretch: "stretch", baseline: "baseline" };
    const justifyMap = { start: "flex-start", center: "center", end: "flex-end", between: "space-between", around: "space-around", evenly: "space-evenly" };

    const computedGap = $derived(resolveSpacing(gap));
</script>

<div
    class="flex"
    style:display={inline ? "inline-flex" : "flex"}
    style:flex-direction={direction}
    style:align-items={alignMap[align]}
    style:justify-content={justifyMap[justify]}
    style:gap={computedGap}
    style:flex-wrap={wrap}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .flex {
        box-sizing: border-box;
    }
</style>

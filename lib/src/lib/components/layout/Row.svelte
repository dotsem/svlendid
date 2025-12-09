<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing } from "$package/types/layout.type.js";

    /**
     * Row - Horizontal layout container (Row in Flutter)
     */
    interface Props {
        children?: Snippet;
        /** Align items on vertical axis */
        align?: "start" | "center" | "end" | "stretch" | "baseline";
        /** Justify content on horizontal axis */
        justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
        /** Gap between children */
        gap?: Spacing | string;
        /** Wrap items */
        wrap?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        align = "center",
        justify = "start",
        gap,
        wrap = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveSpacing(
        value: Spacing | string | undefined
    ): string | undefined {
        if (!value) return undefined;
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    const alignMap = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        stretch: "stretch",
        baseline: "baseline",
    };
    const justifyMap = {
        start: "flex-start",
        center: "center",
        end: "flex-end",
        between: "space-between",
        around: "space-around",
        evenly: "space-evenly",
    };

    const computedGap = $derived(resolveSpacing(gap));
</script>

<div
    class="row"
    style:align-items={alignMap[align]}
    style:justify-content={justifyMap[justify]}
    style:gap={computedGap}
    style:flex-wrap={wrap ? "wrap" : "nowrap"}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .row {
        display: flex;
        flex-direction: row;
        box-sizing: border-box;

        /* Children inherit box-sizing */
        & > :global(*) {
            box-sizing: border-box;
        }
    }
</style>

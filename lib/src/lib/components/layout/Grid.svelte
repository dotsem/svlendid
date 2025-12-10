<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing } from "$package/types/layout.type.js";

    /**
     * Grid - CSS Grid layout container with theme-aware gaps
     * Provides a flexible grid system for arranging content
     */
    interface Props {
        children: Snippet;
        /** Number of columns or grid-template-columns value */
        columns?: number | string;
        /** Number of rows or grid-template-rows value */
        rows?: number | string;
        /** Gap between grid items (uses theme spacing) */
        gap?: Spacing | string;
        /** Column gap (overrides gap for columns) */
        columnGap?: Spacing | string;
        /** Row gap (overrides gap for rows) */
        rowGap?: Spacing | string;
        /** Grid auto flow direction */
        autoFlow?: "row" | "column" | "row dense" | "column dense";
        /** Align items along the block axis */
        alignItems?: "start" | "end" | "center" | "stretch" | "baseline";
        /** Justify items along the inline axis */
        justifyItems?: "start" | "end" | "center" | "stretch";
        /** Align the grid within the container */
        alignContent?:
            | "start"
            | "end"
            | "center"
            | "stretch"
            | "space-between"
            | "space-around"
            | "space-evenly";
        /** Justify the grid within the container */
        justifyContent?:
            | "start"
            | "end"
            | "center"
            | "stretch"
            | "space-between"
            | "space-around"
            | "space-evenly";
        /** Minimum item width for auto-fit/auto-fill columns */
        minItemWidth?: string;
        /** Use auto-fill instead of auto-fit for responsive columns */
        autoFill?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        columns,
        rows,
        gap,
        columnGap,
        rowGap,
        autoFlow,
        alignItems,
        justifyItems,
        alignContent,
        justifyContent,
        minItemWidth,
        autoFill = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const resolveSpacing = (
        value: Spacing | string | undefined
    ): string | undefined => {
        if (!value) return undefined;
        return theme.spacing[value as Spacing] ?? value;
    };

    const computedColumns = $derived.by(() => {
        if (minItemWidth) {
            const method = autoFill ? "auto-fill" : "auto-fit";
            return `repeat(${method}, minmax(${minItemWidth}, 1fr))`;
        }
        if (typeof columns === "number") {
            return `repeat(${columns}, 1fr)`;
        }
        return columns;
    });

    const computedRows = $derived.by(() => {
        if (typeof rows === "number") {
            return `repeat(${rows}, 1fr)`;
        }
        return rows;
    });

    const computedGap = $derived(resolveSpacing(gap) ?? theme.spacing.m);
    const computedColumnGap = $derived(resolveSpacing(columnGap));
    const computedRowGap = $derived(resolveSpacing(rowGap));
</script>

<div
    class="grid"
    style:display="grid"
    style:grid-template-columns={computedColumns}
    style:grid-template-rows={computedRows}
    style:gap={computedGap}
    style:column-gap={computedColumnGap}
    style:row-gap={computedRowGap}
    style:grid-auto-flow={autoFlow}
    style:align-items={alignItems}
    style:justify-items={justifyItems}
    style:align-content={alignContent}
    style:justify-content={justifyContent}
    {...props}
>
    {@render children()}
</div>

<style>
    .grid {
        width: 100%;
    }
</style>

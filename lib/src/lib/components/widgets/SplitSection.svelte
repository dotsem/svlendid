<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing } from "$package/types/layout.type.js";
    import { resolveSpacing } from "$package/utils/style.js";

    /**
     * SplitSection - A two-pane layout section
     */
    type SplitLayout = "left" | "right";
    type SplitRatio = "1:1" | "1:2" | "2:1" | "1:3" | "3:1";

    interface Props {
        /** Left/start content */
        start: Snippet;
        /** Right/end content */
        end: Snippet;
        /** Which side has the primary content */
        layout?: SplitLayout;
        /** Split ratio */
        ratio?: SplitRatio;
        /** Gap between columns */
        gap?: Spacing | string;
        /** Vertical alignment */
        alignItems?: "start" | "center" | "end" | "stretch";
        /** Stack on mobile */
        stackOnMobile?: boolean;
        /** Reverse stack order on mobile */
        reverseOnMobile?: boolean;
        /** Minimum height */
        minHeight?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        start,
        end,
        layout = "left",
        ratio = "1:1",
        gap = "xl",
        alignItems = "center",
        stackOnMobile = true,
        reverseOnMobile = false,
        minHeight,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const ratioValues: Record<SplitRatio, [string, string]> = {
        "1:1": ["1fr", "1fr"],
        "1:2": ["1fr", "2fr"],
        "2:1": ["2fr", "1fr"],
        "1:3": ["1fr", "3fr"],
        "3:1": ["3fr", "1fr"],
    };

    const computedGap = $derived(resolveSpacing(gap, theme));
    const [startFlex, endFlex] = $derived(ratioValues[ratio]);
    const gridColumns = $derived(
        layout === "left"
            ? `${startFlex} ${endFlex}`
            : `${endFlex} ${startFlex}`
    );
</script>

<section
    class="split-section"
    class:stack-mobile={stackOnMobile}
    class:reverse-mobile={reverseOnMobile}
    style:--split-gap={computedGap}
    style:--split-columns={gridColumns}
    style:--split-align={alignItems}
    style:min-height={minHeight}
    {...props}
>
    <div class="split-start">
        {#if layout === "left"}
            {@render start()}
        {:else}
            {@render end()}
        {/if}
    </div>
    <div class="split-end">
        {#if layout === "left"}
            {@render end()}
        {:else}
            {@render start()}
        {/if}
    </div>
</section>

<style>
    .split-section {
        display: grid;
        grid-template-columns: var(--split-columns);
        gap: var(--split-gap);
        align-items: var(--split-align);
        width: 100%;
    }

    .split-start,
    .split-end {
        min-width: 0;
    }

    @media (max-width: 768px) {
        .stack-mobile {
            grid-template-columns: 1fr;
        }

        .stack-mobile.reverse-mobile {
            .split-end {
                order: -1;
            }
        }
    }
</style>

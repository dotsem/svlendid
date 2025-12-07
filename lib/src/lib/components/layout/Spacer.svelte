<script lang="ts">
    import { getTheme } from "$lib/config/theme.js";
    import type { Spacing } from "$lib/types/layout.type.js";

    /**
     * Spacer - Creates empty space in a flex container
     */
    interface Props {
        /** Fixed width */
        width?: Spacing | string;
        /** Fixed height */
        height?: Spacing | string;
        /** Flex grow factor (use in Flex/Row/Stack) */
        flex?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        width,
        height,
        flex,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveSpacing(value: Spacing | string | undefined): string | undefined {
        if (!value) return undefined;
        const themeSpacing = theme.spacing[value as Spacing];
        return themeSpacing ?? value;
    }

    const computedWidth = $derived(resolveSpacing(width));
    const computedHeight = $derived(resolveSpacing(height));
</script>

<div
    class="spacer"
    style:width={computedWidth}
    style:height={computedHeight}
    style:flex-grow={flex}
    {...props}
></div>

<style>
    .spacer {
        flex-shrink: 0;
    }
</style>

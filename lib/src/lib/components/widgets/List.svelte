<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing } from "$package/types/layout.type.js";
    import { resolveSpacing } from "$package/utils/style.js";

    /**
     * List - A styled list container
     */
    type ListVariant = "default" | "bordered" | "divided";

    interface Props {
        children: Snippet;
        /** List variant */
        variant?: ListVariant;
        /** Gap between items (for default variant) */
        gap?: Spacing | string;
        /** Disable padding */
        noPadding?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        variant = "default",
        gap = "none",
        noPadding = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedGap = $derived(resolveSpacing(gap, theme));
</script>

<ul
    class="list"
    class:bordered={variant === "bordered"}
    class:divided={variant === "divided"}
    class:no-padding={noPadding}
    style:--list-gap={computedGap}
    style:--list-border={theme.colors.outline}
    style:--list-radius={theme.radius.m}
    role="list"
    {...props}
>
    {@render children()}
</ul>

<style>
    .list {
        list-style: none;
        margin: 0;
        padding: 0.5rem 0;
        display: flex;
        flex-direction: column;
        gap: var(--list-gap);

        &.no-padding {
            padding: 0;
        }

        &.bordered {
            border: 1px solid var(--list-border);
            border-radius: var(--list-radius);
            overflow: hidden;
        }

        &.divided > :global(li:not(:last-child)) {
            border-bottom: 1px solid var(--list-border);
        }
    }
</style>

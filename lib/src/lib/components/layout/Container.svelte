<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type {
        Container as ContainerSize,
        Spacing,
    } from "$package/types/layout.type.js";

    /**
     * Container - Responsive max-width container
     */
    interface Props {
        children?: Snippet;
        /** Max width preset from theme */
        size?: ContainerSize | "full";
        /** Custom max width */
        maxWidth?: string;
        /** Center the container */
        center?: boolean;
        /** Horizontal padding */
        padding?: Spacing | string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        size = "l",
        maxWidth,
        center = true,
        padding = "m",
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

    const computedMaxWidth = $derived(
        maxWidth ??
            (size === "full" ? "100%" : theme.container[size as ContainerSize])
    );
    const computedPadding = $derived(resolveSpacing(padding));
</script>

<div
    class="container"
    class:center
    style:max-width={computedMaxWidth}
    style:padding-left={computedPadding}
    style:padding-right={computedPadding}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</div>

<style>
    .container {
        width: 100%;
        box-sizing: border-box;
    }

    .center {
        margin-left: auto;
        margin-right: auto;
    }
</style>

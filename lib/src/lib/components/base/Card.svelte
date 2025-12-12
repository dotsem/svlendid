<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorProp } from "$package/types/colorPalette.type.js";
    import type { Radius, Spacing } from "$package/types/layout.type.js";

    /**
     * Card - A surface container with elevation
     */
    type CardVariant = "elevated" | "filled" | "outlined";

    interface Props {
        children?: Snippet;
        /** Card style variant */
        variant?: CardVariant;
        /** Background color */
        bg?: ColorProp;
        /** Border radius */
        radius?: Radius | string;
        /** Padding */
        padding?: Spacing | string;
        /** Make card clickable */
        clickable?: boolean;
        /** Click handler (only if clickable) */
        onclick?: (event: MouseEvent) => void;
        /** Width */
        width?: string;
        /** Height */
        height?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        variant = "elevated",
        bg,
        radius,
        padding,
        clickable = false,
        onclick,
        width,
        height,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveColor(
        color: ColorProp | undefined
    ): string | undefined {
        if (!color) return undefined;
        const paletteColor = theme.colors[color as ColorPalette];
        return paletteColor ?? color;
    }

    const computedBg = $derived(resolveColor(bg) ?? theme.colors.card);
    const computedRadius = $derived(
        radius ? (theme.radius[radius as Radius] ?? radius) : theme.radius.m
    );
    const computedPadding = $derived(
        padding
            ? (theme.spacing[padding as Spacing] ?? padding)
            : theme.spacing.m
    );

    const variantStyles = $derived.by(() => {
        switch (variant) {
            case "elevated":
                return {
                    boxShadow: theme.boxShadow.m,
                    border: "none",
                };
            case "filled":
                return {
                    boxShadow: "none",
                    border: "none",
                };
            case "outlined":
                return {
                    boxShadow: "none",
                    border: `1px solid ${theme.colors.outline}`,
                };
        }
    });
</script>

<svelte:element
    this={clickable ? "button" : "div"}
    class="card"
    class:clickable
    style:background={computedBg}
    style:border-radius={computedRadius}
    style:padding={computedPadding}
    style:box-shadow={variantStyles.boxShadow}
    style:border={variantStyles.border}
    style:width
    style:height
    style:--transition={theme.transitions.fast}
    onclick={clickable ? onclick : undefined}
    {...props}
>
    {#if children}
        {@render children()}
    {/if}
</svelte:element>

<style>
    .card {
        display: block;
        box-sizing: border-box;
        color: inherit;
        text-align: inherit;
        font: inherit;
    }

    .clickable {
        cursor: pointer;
        transition:
            transform var(--transition) ease,
            box-shadow var(--transition) ease;
    }

    .clickable:hover {
        transform: translateY(-2px);
    }

    .clickable:active {
        transform: translateY(0);
    }

    .clickable:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }
</style>

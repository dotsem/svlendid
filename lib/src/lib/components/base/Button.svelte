<script lang="ts">
    import { palette } from "$lib/config/colorPalette.default.js";
    import {
        defaultBoxShadow,
        defaultRadius,
    } from "$lib/config/layout.default.js";
    import type { Color } from "$lib/types/colorPalette.type.js";
    import type { BoxShadow, Radius, Spacing } from "$lib/types/layout.type.js";
    import type { Snippet } from "svelte";

    type ButtonVariant = "filled" | "filled-tonal" | "outline" | "text";

    interface Props {
        children: Snippet;
        onClick?: () => void;
        color?: Color;
        width?: string;
        height?: string;
        minWidth?: string;
        minHeight?: string;
        maxWidth?: string;
        maxHeight?: string;
        padding?: Spacing[];
        elevation?: BoxShadow;
        variant?: ButtonVariant;
        radius?: Radius;
        disabled?: boolean;
        [key: string]: any;
    }

    let {
        children,
        onClick,
        color = palette.primary,
        width = "auto",
        height = "auto",
        minWidth = "auto",
        minHeight = "auto",
        maxWidth = "auto",
        maxHeight = "auto",
        padding = [],
        elevation = defaultBoxShadow.m,
        variant = "filled",
        radius = defaultRadius.m,
        disabled = false,
        ...props
    }: Props = $props();
</script>

<button
    class="button {variant} {color}"
    style="width: {width}; height: {height}; min-width: {minWidth}; min-height: {minHeight}; max-width: {maxWidth}; max-height: {maxHeight}; padding: {padding.join(
        ' '
    )}; box-shadow: {elevation}; border-radius: {radius};"
    {disabled}
    {...props}
    onclick={onClick}
>
    {@render children()}
</button>

<style lang="postcss">
</style>

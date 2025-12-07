<script lang="ts">
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";
    import type { Component } from "svelte";
    import * as lucideIcons from "lucide-svelte";

    // Get all exports from lucide-svelte
    type LucideExport = keyof typeof lucideIcons;
    
    // Non-icon exports to exclude
    const nonIconExports = new Set(["icons", "defaultAttributes", "Icon", "createIcons"]);
    
    // Filter to only icon components (those starting with uppercase that aren't in the exclusion list)
    type IconOnly<T extends string> = T extends `${Uppercase<string>}${string}` 
        ? T extends "Icon" ? never : T 
        : never;
    
    /**
     * All available Lucide icon names
     */
    export type IconName = IconOnly<LucideExport>;

    /**
     * @component Icon
     * Renders icons from the Lucide icon library with theme integration.
     * 
     * @example
     * <Icon name="Home" />
     * <Icon name="Settings" size="24px" color="primary" />
     */
    interface Props {
        /** Icon name from Lucide icons */
        name: string; // Use string for prop, IconName for intellisense hints
        /** Icon size (default: 24px) */
        size?: string | number;
        /** Color from palette or custom CSS color */
        color?: ColorPalette | string;
        /** Stroke width */
        strokeWidth?: number;
        /** Accessible label for screen readers */
        label?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        name,
        size = 24,
        color,
        strokeWidth = 2,
        label,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function resolveColor(c: ColorPalette | string | undefined): string {
        if (!c) return "currentColor";
        const paletteColor = theme.colors[c as ColorPalette];
        return paletteColor ?? c;
    }

    const computedColor = $derived(resolveColor(color));
    const computedSize = $derived(typeof size === "number" ? `${size}px` : size);
    
    // Get the icon component dynamically
    const IconComponent = $derived.by(() => {
        const icon = lucideIcons[name as LucideExport];
        if (!icon || nonIconExports.has(name)) return null;
        return icon as Component<{
            size?: number | string;
            color?: string;
            strokeWidth?: number;
        }>;
    });
</script>

{#if IconComponent}
    <IconComponent
        size={computedSize}
        color={computedColor}
        {strokeWidth}
        {...props}
    />
{/if}

<style>
    :global(.lucide) {
        display: inline-flex;
        flex-shrink: 0;
        vertical-align: middle;
    }
</style>

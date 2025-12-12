<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorProp } from "$package/types/colorPalette.type.js";

    /**
     * Tooltip - Shows a tooltip on hover
     */
    type TooltipPosition = "top" | "bottom" | "left" | "right";

    interface Props {
        children: Snippet;
        /** Tooltip text or content */
        content: string | Snippet;
        /** Position relative to trigger */
        position?: TooltipPosition;
        /** Background color */
        bg?: ColorProp;
        /** Text color */
        color?: ColorProp;
        /** Delay before showing (ms) */
        delay?: number;
        /** Disable tooltip */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        content,
        position = "top",
        bg,
        color,
        delay = 200,
        disabled = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let isVisible = $state(false);
    let showTimeout: ReturnType<typeof setTimeout>;

    function resolveColor(
        c: ColorProp | undefined,
        fallback: string
    ): string {
        if (!c) return fallback;
        const paletteColor = theme.colors[c as ColorPalette];
        return paletteColor ?? c;
    }

    const computedBg = $derived(
        resolveColor(bg, theme.colors.surface ?? "#333")
    );
    const computedColor = $derived(
        resolveColor(color, theme.colors.onSurface ?? "#fff")
    );

    function handleMouseEnter() {
        if (disabled) return;
        showTimeout = setTimeout(() => {
            isVisible = true;
        }, delay);
    }

    function handleMouseLeave() {
        clearTimeout(showTimeout);
        isVisible = false;
    }
</script>

<div
    class="tooltip-wrapper"
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    onfocus={handleMouseEnter}
    onblur={handleMouseLeave}
    {...props}
>
    {@render children()}

    {#if isVisible}
        <div
            class="tooltip {position}"
            style:background={computedBg}
            style:color={computedColor}
            style:--tooltip-radius={theme.radius.s}
            style:--tooltip-shadow={theme.boxShadow.m}
            role="tooltip"
        >
            {#if typeof content === "string"}
                {content}
            {:else}
                {@render content()}
            {/if}
        </div>
    {/if}
</div>

<style>
    .tooltip-wrapper {
        position: relative;
        display: inline-block;
    }

    .tooltip {
        position: absolute;
        z-index: 1000;
        padding: 6px 12px;
        font-size: 0.875rem;
        white-space: nowrap;
        border-radius: var(--tooltip-radius);
        box-shadow: var(--tooltip-shadow);
        pointer-events: none;
        animation: fadeIn 0.15s ease;
    }

    .tooltip.top {
        bottom: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-bottom: 8px;
    }

    .tooltip.bottom {
        top: 100%;
        left: 50%;
        transform: translateX(-50%);
        margin-top: 8px;
    }

    .tooltip.left {
        right: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-right: 8px;
    }

    .tooltip.right {
        left: 100%;
        top: 50%;
        transform: translateY(-50%);
        margin-left: 8px;
    }

    @keyframes fadeIn {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(4px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }

    .tooltip.left,
    .tooltip.right {
        animation: fadeInHorizontal 0.15s ease;
    }

    @keyframes fadeInHorizontal {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>

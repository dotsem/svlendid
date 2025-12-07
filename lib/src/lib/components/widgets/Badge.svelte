<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";

    /**
     * Badge - Small status indicator
     */
    type BadgePosition = "top-right" | "top-left" | "bottom-right" | "bottom-left";

    interface Props {
        children: Snippet;
        /** Badge content (number or text) */
        content?: string | number;
        /** Badge color */
        color?: ColorPalette;
        /** Position when used as overlay */
        position?: BadgePosition;
        /** Show as dot without content */
        dot?: boolean;
        /** Maximum number to show (shows "99+" if exceeded) */
        max?: number;
        /** Hide badge when content is 0 or empty */
        hideWhenEmpty?: boolean;
        /** Show badge (can be used to conditionally hide) */
        show?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        content,
        color = "error",
        position = "top-right",
        dot = false,
        max = 99,
        hideWhenEmpty = true,
        show = true,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const bgColor = $derived(theme.colors[color] ?? theme.colors.error);
    const textColor = $derived(() => {
        const onKey = `on${color.charAt(0).toUpperCase()}${color.slice(1)}` as keyof typeof theme.colors;
        return theme.colors[onKey] ?? "#fff";
    });

    const displayContent = $derived.by(() => {
        if (dot) return "";
        if (typeof content === "number" && content > max) {
            return `${max}+`;
        }
        return String(content ?? "");
    });

    const shouldShow = $derived.by(() => {
        if (!show) return false;
        if (dot) return true;
        if (hideWhenEmpty) {
            if (content === undefined || content === "" || content === 0) return false;
        }
        return true;
    });
</script>

<div class="badge-wrapper" {...props}>
    {@render children()}
    
    {#if shouldShow}
        <span 
            class="badge {position}"
            class:dot
            style:background={bgColor}
            style:color={textColor()}
            style:--badge-radius={theme.radius.full}
        >
            {displayContent}
        </span>
    {/if}
</div>

<style>
    .badge-wrapper {
        position: relative;
        display: inline-flex;
    }

    .badge {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 20px;
        height: 20px;
        padding: 0 6px;
        font-size: 0.75rem;
        font-weight: 500;
        border-radius: var(--badge-radius);
        line-height: 1;
    }

    .badge.dot {
        min-width: 8px;
        width: 8px;
        height: 8px;
        padding: 0;
    }

    .badge.top-right {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }

    .badge.top-left {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .badge.bottom-right {
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
    }

    .badge.bottom-left {
        bottom: 0;
        left: 0;
        transform: translate(-50%, 50%);
    }
</style>

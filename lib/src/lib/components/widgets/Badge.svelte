<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * @component Badge
     * Small status indicator that can display counts or dots.
     * Supports both theme palette colors and custom colors.
     *
     * @example
     * <Badge content={5} color="error">
     *   <Icon name="Bell" />
     * </Badge>
     *
     * <Badge dot color="#00ff00">
     *   <Avatar />
     * </Badge>
     *
     * <Badge inline content="New" color="primary" />
     */
    type BadgePosition =
        | "top-right"
        | "top-left"
        | "bottom-right"
        | "bottom-left";

    interface Props {
        children?: Snippet;
        /** Badge content (number or text) */
        content?: string | number;
        /** Badge color (palette key or custom CSS color) */
        color?: ColorPalette | string;
        /** Text color (auto-calculated if not provided) */
        textColor?: string;
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
        /** Use inline positioning instead of overlay */
        inline?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        content,
        color = "error",
        textColor,
        position = "top-right",
        dot = false,
        max = 99,
        hideWhenEmpty = true,
        show = true,
        inline = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    // Resolve background color - supports both palette and custom colors
    const bgColor = $derived(resolveColor(color, theme) ?? theme.colors.error);

    // Resolve text color - auto-calculate or use provided
    const computedTextColor = $derived.by(() => {
        if (textColor) return textColor;
        return getOnColor(color, theme);
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
        if (hideWhenEmpty && !inline) {
            if (content === undefined || content === "" || content === 0)
                return false;
        }
        return true;
    });
</script>

<div class="badge-wrapper" {...props}>
    {@render children?.()}

    {#if shouldShow}
        <span
            class="badge {position}"
            class:dot
            class:inline
            style:background={bgColor}
            style:color={computedTextColor}
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
        align-items: center;
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
        white-space: nowrap;
    }

    .badge.inline {
        position: static;
        transform: none;
        margin-left: 8px;
    }

    .badge.dot {
        min-width: 8px;
        width: 8px;
        height: 8px;
        padding: 0;
    }

    .badge.top-right:not(.inline) {
        top: 0;
        right: 0;
        transform: translate(50%, -50%);
    }

    .badge.top-left:not(.inline) {
        top: 0;
        left: 0;
        transform: translate(-50%, -50%);
    }

    .badge.bottom-right:not(.inline) {
        bottom: 0;
        right: 0;
        transform: translate(50%, 50%);
    }

    .badge.bottom-left:not(.inline) {
        bottom: 0;
        left: 0;
        transform: translate(-50%, 50%);
    }
</style>

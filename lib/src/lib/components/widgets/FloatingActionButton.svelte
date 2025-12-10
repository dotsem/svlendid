<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * FloatingActionButton - A floating action button (FAB)
     */
    type FABSize = "s" | "m" | "l";
    type FABPosition =
        | "bottom-right"
        | "bottom-left"
        | "bottom-center"
        | "top-right"
        | "top-left";

    interface Props {
        children: Snippet;
        /** Color scheme */
        color?: ColorPalette;
        /** FAB size */
        size?: FABSize;
        /** Fixed position on screen */
        position?: FABPosition;
        /** Offset from edge */
        offset?: string;
        /** Extended FAB with label */
        extended?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Click handler */
        onclick?: (event: MouseEvent) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        color = "primary",
        size = "m",
        position = "bottom-right",
        offset = "1.5rem",
        extended = false,
        disabled = false,
        onclick,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { size: "40px", iconSize: "20px", padding: "0.75rem 1rem" },
        m: { size: "56px", iconSize: "24px", padding: "1rem 1.5rem" },
        l: { size: "72px", iconSize: "32px", padding: "1.25rem 2rem" },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedOnColor = $derived(getOnColor(color, theme));

    const positionStyles = $derived.by(() => {
        const styles: Record<string, string> = { position: "fixed" };

        switch (position) {
            case "bottom-right":
                styles.bottom = offset;
                styles.right = offset;
                break;
            case "bottom-left":
                styles.bottom = offset;
                styles.left = offset;
                break;
            case "bottom-center":
                styles.bottom = offset;
                styles.left = "50%";
                styles.transform = "translateX(-50%)";
                break;
            case "top-right":
                styles.top = offset;
                styles.right = offset;
                break;
            case "top-left":
                styles.top = offset;
                styles.left = offset;
                break;
        }

        return styles;
    });
</script>

<button
    class="fab"
    class:extended
    class:disabled
    style:--fab-size={sizeConfig[size].size}
    style:--fab-icon-size={sizeConfig[size].iconSize}
    style:--fab-padding={sizeConfig[size].padding}
    style:--fab-bg={computedColor}
    style:--fab-color={computedOnColor}
    style:--fab-shadow={theme.boxShadow.l}
    style:--fab-transition={theme.transitions.fast}
    style:--fab-z-index={theme.zIndex.fixed}
    style:position={positionStyles.position}
    style:top={positionStyles.top}
    style:bottom={positionStyles.bottom}
    style:left={positionStyles.left}
    style:right={positionStyles.right}
    style:transform={positionStyles.transform}
    {disabled}
    {onclick}
    {...props}
>
    {@render children()}
</button>

<style>
    .fab {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: var(--fab-size);
        height: var(--fab-size);
        padding: 0;
        background: var(--fab-bg);
        color: var(--fab-color);
        border: none;
        border-radius: 50%;
        box-shadow: var(--fab-shadow);
        cursor: pointer;
        z-index: var(--fab-z-index);
        transition:
            transform var(--fab-transition) ease,
            box-shadow var(--fab-transition) ease;

        &:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow:
                var(--fab-shadow),
                0 4px 12px rgba(0, 0, 0, 0.15);
        }

        &:active:not(:disabled) {
            transform: translateY(0);
        }

        &:focus-visible {
            outline: 2px solid var(--fab-bg);
            outline-offset: 2px;
        }

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }

        &.extended {
            width: auto;
            height: auto;
            padding: var(--fab-padding);
            border-radius: 9999px;
            font-weight: 500;
        }
    }
</style>

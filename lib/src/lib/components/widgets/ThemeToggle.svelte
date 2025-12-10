<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * ThemeToggle - A dark/light mode toggle switch
     */
    type ThemeToggleSize = "s" | "m" | "l";

    interface Props {
        /** Current dark mode state */
        dark?: boolean;
        /** Size preset */
        size?: ThemeToggleSize;
        /** Color scheme */
        color?: ColorPalette;
        /** Toggle handler */
        ontoggle?: (dark: boolean) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        dark = $bindable(false),
        size = "m",
        color = "primary",
        ontoggle,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { size: "32px", iconSize: "16px" },
        m: { size: "40px", iconSize: "20px" },
        l: { size: "48px", iconSize: "24px" },
    };

    const computedColor = $derived(resolveColor(color, theme));

    function handleToggle() {
        dark = !dark;
        ontoggle?.(dark);
    }
</script>

<button
    class="theme-toggle"
    class:dark
    style:--toggle-size={sizeConfig[size].size}
    style:--toggle-icon-size={sizeConfig[size].iconSize}
    style:--toggle-color={computedColor}
    style:--toggle-transition={theme.transitions.fast}
    onclick={handleToggle}
    aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
    aria-pressed={dark}
    {...props}
>
    <span class="toggle-icon sun">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    </span>
    <span class="toggle-icon moon">
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    </span>
</button>

<style>
    .theme-toggle {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--toggle-size);
        height: var(--toggle-size);
        padding: 0;
        background: transparent;
        border: none;
        color: inherit;
        cursor: pointer;
        border-radius: 50%;
        overflow: hidden;
        transition:
            background var(--toggle-transition) ease,
            color var(--toggle-transition) ease;

        &:hover {
            background: color-mix(
                in srgb,
                var(--toggle-color) 10%,
                transparent
            );
        }

        &:focus-visible {
            outline: 2px solid var(--toggle-color);
            outline-offset: 2px;
        }
    }

    .toggle-icon {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--toggle-icon-size);
        height: var(--toggle-icon-size);
        transition:
            transform var(--toggle-transition) ease,
            opacity var(--toggle-transition) ease;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    .sun {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }

    .moon {
        opacity: 0;
        transform: rotate(-90deg) scale(0.5);
    }

    .dark .sun {
        opacity: 0;
        transform: rotate(90deg) scale(0.5);
    }

    .dark .moon {
        opacity: 1;
        transform: rotate(0deg) scale(1);
    }
</style>

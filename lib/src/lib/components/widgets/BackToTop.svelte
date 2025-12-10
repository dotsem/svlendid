<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * BackToTop - Scroll to top button
     */
    type BackToTopSize = "s" | "m" | "l";

    interface Props {
        /** Show after scrolling this many pixels */
        showAfter?: number;
        /** Color scheme */
        color?: ColorPalette;
        /** Size preset */
        size?: BackToTopSize;
        /** Smooth scroll behavior */
        smooth?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        showAfter = 300,
        color = "primary",
        size = "m",
        smooth = true,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: { size: "36px", iconSize: "18px" },
        m: { size: "44px", iconSize: "22px" },
        l: { size: "52px", iconSize: "26px" },
    };

    const computedColor = $derived(resolveColor(color, theme));
    const computedOnColor = $derived(getOnColor(color, theme));

    let visible = $state(false);

    function handleScroll() {
        visible = window.scrollY > showAfter;
    }

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: smooth ? "smooth" : "auto",
        });
    }

    $effect(() => {
        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    });
</script>

{#if visible}
    <button
        class="back-to-top"
        style:--btt-size={sizeConfig[size].size}
        style:--btt-icon-size={sizeConfig[size].iconSize}
        style:--btt-bg={computedColor}
        style:--btt-color={computedOnColor}
        style:--btt-shadow={theme.boxShadow.m}
        style:--btt-transition={theme.transitions.fast}
        style:--btt-z-index={theme.zIndex.fixed}
        onclick={scrollToTop}
        aria-label="Back to top"
        {...props}
    >
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
        >
            <polyline points="18 15 12 9 6 15" />
        </svg>
    </button>
{/if}

<style>
    .back-to-top {
        position: fixed;
        right: 1.5rem;
        bottom: 1.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        width: var(--btt-size);
        height: var(--btt-size);
        padding: 0;
        background: var(--btt-bg);
        color: var(--btt-color);
        border: none;
        border-radius: 50%;
        box-shadow: var(--btt-shadow);
        cursor: pointer;
        z-index: var(--btt-z-index);
        animation: fade-in 0.2s ease-out;
        transition:
            transform var(--btt-transition) ease,
            box-shadow var(--btt-transition) ease;

        &:hover {
            transform: translateY(-2px);
            box-shadow:
                var(--btt-shadow),
                0 4px 8px rgba(0, 0, 0, 0.1);
        }

        &:active {
            transform: translateY(0);
        }

        &:focus-visible {
            outline: 2px solid var(--btt-bg);
            outline-offset: 2px;
        }

        svg {
            width: var(--btt-icon-size);
            height: var(--btt-icon-size);
        }
    }

    @keyframes fade-in {
        from {
            opacity: 0;
            transform: translateY(10px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

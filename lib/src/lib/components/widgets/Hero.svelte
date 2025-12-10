<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing } from "$package/types/layout.type.js";
    import { resolveSpacing } from "$package/utils/style.js";

    /**
     * Hero - A landing page hero section
     */
    type HeroAlign = "left" | "center" | "right";
    type HeroSize = "s" | "m" | "l" | "full";

    interface Props {
        children: Snippet;
        /** Hero height */
        size?: HeroSize;
        /** Custom min height */
        minHeight?: string;
        /** Content alignment */
        align?: HeroAlign;
        /** Background color or gradient */
        background?: string;
        /** Background image URL */
        backgroundImage?: string;
        /** Overlay color for background images */
        overlay?: string;
        /** Vertical padding */
        paddingY?: Spacing | string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        size = "m",
        minHeight,
        align = "center",
        background,
        backgroundImage,
        overlay,
        paddingY = "3xl",
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeHeights = {
        s: "40vh",
        m: "60vh",
        l: "80vh",
        full: "100vh",
    };

    const computedHeight = $derived(minHeight ?? sizeHeights[size]);
    const computedPadding = $derived(resolveSpacing(paddingY, theme));
</script>

<section
    class="hero"
    class:has-bg-image={!!backgroundImage}
    style:--hero-height={computedHeight}
    style:--hero-padding={computedPadding}
    style:--hero-bg={background}
    style:--hero-bg-image={backgroundImage ? `url(${backgroundImage})` : "none"}
    style:--hero-overlay={overlay ?? "transparent"}
    style:--hero-align={align}
    {...props}
>
    {#if backgroundImage && overlay}
        <div class="hero-overlay"></div>
    {/if}
    <div class="hero-content">
        {@render children()}
    </div>
</section>

<style>
    .hero {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: var(--hero-height);
        padding: var(--hero-padding) 1.5rem;
        background: var(--hero-bg);
        overflow: hidden;

        &.has-bg-image {
            background-image: var(--hero-bg-image);
            background-size: cover;
            background-position: center;
        }
    }

    .hero-overlay {
        position: absolute;
        inset: 0;
        background: var(--hero-overlay);
        pointer-events: none;
    }

    .hero-content {
        position: relative;
        z-index: 1;
        width: 100%;
        max-width: 1200px;
        text-align: var(--hero-align);

        &:has(> *) {
            display: flex;
            flex-direction: column;
            align-items: var(--hero-align);
            gap: 1.5rem;
        }
    }
</style>

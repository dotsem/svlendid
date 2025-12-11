<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { Radius } from "$package/types/layout.type.js";
    import { resolveRadius } from "$package/utils/style.js";

    /**
     * Image - Enhanced image component with loading states and fallback
     */
    type ImageFit = "cover" | "contain" | "fill" | "none" | "scale-down";
    type ImageLoading = "lazy" | "eager";

    interface Props {
        /** Image source URL */
        src: string;
        /** Alt text (required for accessibility) */
        alt: string;
        /** Fallback image URL */
        fallback?: string;
        /** Image width */
        width?: string;
        /** Image height */
        height?: string;
        /** Aspect ratio (e.g., "16/9", "1/1") */
        aspectRatio?: string;
        /** Object fit behavior */
        fit?: ImageFit;
        /** Border radius */
        radius?: Radius | string;
        /** Loading strategy */
        loading?: ImageLoading;
        /** Show skeleton while loading */
        showSkeleton?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        src,
        alt,
        fallback,
        width,
        height,
        aspectRatio,
        fit = "cover",
        radius,
        loading = "lazy",
        showSkeleton = true,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedRadius = $derived(resolveRadius(radius, theme));

    let isLoading = $state(true);
    let hasError = $state(false);
    let fallbackFailed = $state(false);

    function handleLoad() {
        isLoading = false;
    }

    function handleError() {
        isLoading = false;
        if (hasError) {
            fallbackFailed = true;
        }
        hasError = true;
    }

    const displaySrc = $derived(hasError && fallback ? fallback : src);
    const showBrokenPlaceholder = $derived(
        hasError && (!fallback || fallbackFailed)
    );
</script>

<div
    class="image-wrapper"
    style:width
    style:height
    style:aspect-ratio={aspectRatio}
    style:--image-radius={computedRadius}
    style:--image-bg={theme.colors.surfaceVariant}
    style:--image-text={theme.colors.outline}
    {...props}
>
    {#if showSkeleton && isLoading}
        <div class="image-skeleton"></div>
    {/if}

    {#if showBrokenPlaceholder}
        <div class="image-broken">
            <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="1.5"
                stroke-linecap="round"
                stroke-linejoin="round"
            >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
                <line x1="2" y1="2" x2="22" y2="22" />
            </svg>
            <span class="image-broken-text">Image not found</span>
        </div>
    {:else}
        <img
            src={displaySrc}
            {alt}
            {loading}
            class="image"
            class:loading={isLoading}
            style:object-fit={fit}
            onload={handleLoad}
            onerror={handleError}
        />
    {/if}
</div>

<style>
    .image-wrapper {
        position: relative;
        display: inline-block;
        overflow: hidden;
        border-radius: var(--image-radius);
        background: var(--image-bg);
    }

    .image {
        display: block;
        width: 100%;
        height: 100%;
        transition: opacity 0.3s ease;

        &.loading {
            opacity: 0;
        }
    }

    .image-skeleton {
        position: absolute;
        inset: 0;
        background: linear-gradient(
            90deg,
            var(--image-bg) 0%,
            color-mix(in srgb, var(--image-bg) 80%, white) 50%,
            var(--image-bg) 100%
        );
        background-size: 200% 100%;
        animation: shimmer 1.5s infinite;
    }

    .image-broken {
        position: absolute;
        inset: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        color: var(--image-text);
        padding: 1rem;
        text-align: center;

        svg {
            width: 48px;
            height: 48px;
            opacity: 0.5;
        }
    }

    .image-broken-text {
        font-size: 0.75rem;
        opacity: 0.7;
    }

    @keyframes shimmer {
        0% {
            background-position: 200% 0;
        }
        100% {
            background-position: -200% 0;
        }
    }
</style>

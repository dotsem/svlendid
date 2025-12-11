<script lang="ts">
    import { getTheme } from "$package/config/theme.js";

    /**
     * Skeleton - Loading placeholder with shimmer effect
     */
    type SkeletonVariant = "text" | "circular" | "rectangular" | "rounded";

    interface Props {
        /** Skeleton variant */
        variant?: SkeletonVariant;
        /** Width (default: 100%) */
        width?: string;
        /** Height (default: based on variant) */
        height?: string;
        /** Animation type */
        animation?: "pulse" | "shimmer" | "none";
        /** Number of lines for text variant */
        lines?: number;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        variant = "text",
        width = "100%",
        height,
        animation = "shimmer",
        lines = 1,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const defaultHeights = {
        text: "1em",
        circular: "40px",
        rectangular: "120px",
        rounded: "120px",
    };

    const computedHeight = $derived(height ?? defaultHeights[variant]);
    const computedWidth = $derived(
        variant === "circular" ? computedHeight : width
    );
    const computedRadius = $derived.by(() => {
        switch (variant) {
            case "circular":
                return "50%";
            case "rounded":
                return theme.radius.m;
            case "text":
                return theme.radius.xs;
            default:
                return "0";
        }
    });
</script>

<div
    class="skeleton-wrapper"
    class:multi-line={variant === "text" && lines > 1}
    {...props}
>
    {#each Array(variant === "text" ? lines : 1) as _, i}
        <span
            class="skeleton"
            class:pulse={animation === "pulse"}
            class:shimmer={animation === "shimmer"}
            style:width={i === lines - 1 && lines > 1 ? "80%" : computedWidth}
            style:height={computedHeight}
            style:--skeleton-radius={computedRadius}
            style:--skeleton-bg={theme.colors.outline}
            style:--skeleton-highlight="rgba(255, 255, 255, 0.4)"
        ></span>
    {/each}
</div>

<style>
    .skeleton-wrapper {
        display: contents;

        &.multi-line {
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        }
    }

    .skeleton {
        display: block;
        background: var(--skeleton-bg);
        border-radius: var(--skeleton-radius);
        opacity: 0.3;
    }

    .skeleton.pulse {
        animation: pulse 1.5s ease-in-out infinite;
    }

    .skeleton.shimmer {
        position: relative;
        overflow: hidden;
        opacity: 0.4;

        &::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(
                90deg,
                transparent 0%,
                var(--skeleton-highlight) 50%,
                transparent 100%
            );
            animation: shimmer 1.5s infinite;
        }
    }

    @keyframes pulse {
        0%,
        100% {
            opacity: 0.4;
        }
        50% {
            opacity: 0.2;
        }
    }

    @keyframes shimmer {
        0% {
            transform: translateX(-100%);
        }
        100% {
            transform: translateX(100%);
        }
    }
</style>

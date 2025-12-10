<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor, getOnColor } from "$package/utils/style.js";

    /**
     * Avatar - Displays a user image or initials fallback
     */
    type AvatarSize = "xs" | "s" | "m" | "l" | "xl";
    type AvatarVariant = "circle" | "square";

    interface Props {
        /** Image source URL */
        src?: string;
        /** Alt text for image */
        alt?: string;
        /** User name for initials fallback */
        name?: string;
        /** Size preset */
        size?: AvatarSize;
        /** Shape variant */
        variant?: AvatarVariant;
        /** Background color for initials */
        color?: ColorPalette;
        /** Custom size override */
        customSize?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        src,
        alt = "",
        name,
        size = "m",
        variant = "circle",
        color = "primary",
        customSize,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        xs: { size: "24px", fontSize: "0.625rem" },
        s: { size: "32px", fontSize: "0.75rem" },
        m: { size: "40px", fontSize: "1rem" },
        l: { size: "56px", fontSize: "1.25rem" },
        xl: { size: "80px", fontSize: "1.5rem" },
    };

    const computedBg = $derived(resolveColor(color, theme));
    const computedColor = $derived(getOnColor(color, theme));
    const computedSize = $derived(customSize ?? sizeConfig[size].size);
    const computedRadius = $derived(
        variant === "circle" ? "50%" : theme.radius.m
    );

    const initials = $derived.by(() => {
        if (!name) return "";
        const parts = name.trim().split(/\s+/);
        if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
        return (
            parts[0].charAt(0) + parts[parts.length - 1].charAt(0)
        ).toUpperCase();
    });

    let imageError = $state(false);

    function handleImageError() {
        imageError = true;
    }
</script>

<div
    class="avatar"
    style:--avatar-size={computedSize}
    style:--avatar-bg={computedBg}
    style:--avatar-color={computedColor}
    style:--avatar-radius={computedRadius}
    style:--avatar-font-size={sizeConfig[size].fontSize}
    role="img"
    aria-label={alt || name || "Avatar"}
    {...props}
>
    {#if src && !imageError}
        <img {src} {alt} class="avatar-image" onerror={handleImageError} />
    {:else if initials}
        <span class="avatar-initials">{initials}</span>
    {:else}
        <svg class="avatar-placeholder" viewBox="0 0 24 24" fill="currentColor">
            <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
            />
        </svg>
    {/if}
</div>

<style>
    .avatar {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: var(--avatar-size);
        height: var(--avatar-size);
        background: var(--avatar-bg);
        color: var(--avatar-color);
        border-radius: var(--avatar-radius);
        font-size: var(--avatar-font-size);
        font-weight: 600;
        overflow: hidden;
        flex-shrink: 0;
    }

    .avatar-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    .avatar-initials {
        text-transform: uppercase;
        user-select: none;
    }

    .avatar-placeholder {
        width: 60%;
        height: 60%;
        opacity: 0.8;
    }
</style>

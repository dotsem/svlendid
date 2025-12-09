<script lang="ts">
    import { getTheme } from "$lib/config/theme.js";
    import type { ColorPalette } from "$lib/types/colorPalette.type.js";
    import type { Radius, Spacing } from "$lib/types/layout.type.js";
    import type { Snippet } from "svelte";

    /**
     * Button variants:
     * - filled: Primary action button with solid background
     * - tonal: Softer button using container colors
     * - outlined: Border button with transparent background
     * - text: Minimal button with no border/background
     */
    type ButtonVariant = "filled" | "tonal" | "outlined" | "text";

    /**
     * Button sizes for quick sizing
     */
    type ButtonSize = "s" | "m" | "l";

    /**
     * @component Button
     * A versatile button component with multiple variants and sizes.
     *
     * @example
     * <Button onclick={() => console.log('clicked')}>Click me</Button>
     * <Button variant="outlined" color="secondary">Outlined</Button>
     */
    interface Props {
        children: Snippet;
        /** Click handler */
        onclick?: (event: MouseEvent) => void;
        /** Color scheme from the palette */
        color?: ColorPalette;
        /** Button style variant */
        variant?: ButtonVariant;
        /** Predefined size */
        size?: ButtonSize;
        /** Fixed width (prevents layout shift during loading) */
        width?: string;
        /** Border radius (uses theme radius keys or custom value) */
        radius?: Radius | string;
        /** Show elevation shadow */
        elevated?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Make button take full width of container */
        expandedWidth?: boolean;
        /** Custom padding override */
        padding?: Spacing | string;
        /** Loading state - button maintains its width */
        loading?: boolean;
        /** Icon to show before text */
        leadingIcon?: Snippet;
        /** Icon to show after text */
        trailingIcon?: Snippet;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onclick,
        color = "primary",
        variant = "filled",
        size = "m",
        width,
        radius,
        elevated = false,
        disabled = false,
        expandedWidth = false,
        padding,
        loading = false,
        leadingIcon,
        trailingIcon,
        ...props
    }: Props = $props();

    const theme = getTheme();

    // Track button width before loading
    let buttonEl: HTMLButtonElement;
    let frozenWidth = $state<string | undefined>(undefined);

    // When loading starts, freeze the current width
    $effect(() => {
        if (loading && buttonEl && !frozenWidth) {
            frozenWidth = `${buttonEl.offsetWidth}px`;
        } else if (!loading) {
            frozenWidth = undefined;
        }
    });

    // Get color values from theme based on color prop
    const getColorValue = (colorKey: ColorPalette) => theme.colors[colorKey];
    const getOnColorValue = (colorKey: ColorPalette) => {
        const onKey =
            `on${colorKey.charAt(0).toUpperCase()}${colorKey.slice(1)}` as keyof typeof theme.colors;
        return theme.colors[onKey] ?? theme.colors.onBg;
    };
    const getContainerColor = (colorKey: ColorPalette) => {
        const containerKey =
            `${colorKey}Container` as keyof typeof theme.colors;
        return theme.colors[containerKey] ?? getColorValue(colorKey);
    };
    const getOnContainerColor = (colorKey: ColorPalette) => {
        const onContainerKey =
            `on${colorKey.charAt(0).toUpperCase()}${colorKey.slice(1)}Container` as keyof typeof theme.colors;
        return theme.colors[onContainerKey] ?? getOnColorValue(colorKey);
    };

    // Size presets with min-width for consistent sizing
    const sizeConfig = {
        s: {
            padding: `${theme.spacing.xs} ${theme.spacing.s}`,
            fontSize: "0.875rem",
            minHeight: "32px",
            minWidth: "64px",
        },
        m: {
            padding: `${theme.spacing.s} ${theme.spacing.m}`,
            fontSize: "1rem",
            minHeight: "40px",
            minWidth: "80px",
        },
        l: {
            padding: `${theme.spacing.m} ${theme.spacing.l}`,
            fontSize: "1.125rem",
            minHeight: "48px",
            minWidth: "96px",
        },
    };

    // Computed styles based on variant
    const variantStyles = $derived.by(() => {
        const baseColor = getColorValue(color);
        const onColor = getOnColorValue(color);
        const containerColor = getContainerColor(color);
        const onContainerColor = getOnContainerColor(color);

        switch (variant) {
            case "filled":
                return {
                    background: baseColor,
                    color: onColor,
                    border: "none",
                    hoverBackground: baseColor,
                    hoverFilter: "brightness(1.1)",
                };
            case "tonal":
                return {
                    background: containerColor,
                    color: onContainerColor,
                    border: "none",
                    hoverBackground: containerColor,
                    hoverFilter: "brightness(0.95)",
                };
            case "outlined":
                return {
                    background: "transparent",
                    color: baseColor,
                    border: `1px solid ${baseColor}`,
                    hoverBackground: `${baseColor}10`,
                    hoverFilter: "none",
                };
            case "text":
                return {
                    background: "transparent",
                    color: baseColor,
                    border: "none",
                    hoverBackground: `${baseColor}10`,
                    hoverFilter: "none",
                };
        }
    });

    const computedRadius = $derived(radius ?? theme.radius.m);
    const computedPadding = $derived(padding ?? sizeConfig[size].padding);
    const computedShadow = $derived(
        elevated && variant === "filled" ? theme.boxShadow.m : "none"
    );
    const computedWidth = $derived(
        expandedWidth ? "100%" : (frozenWidth ?? width ?? "auto")
    );

    // Click effect class
    const clickEffectClass = $derived(`click-effect-${theme.clickEffect}`);

    import RippleEffect from "$lib/components/primitives/interactable/RippleEffect.svelte";
    let rippleEffect: RippleEffect;

    function handleClick(event: MouseEvent) {
        if (!disabled && !loading) {
            if (theme.clickEffect === "ripple") {
                rippleEffect?.trigger(event);
            }
            onclick?.(event);
        }
    }
</script>

<button
    bind:this={buttonEl}
    class="svlendid-button {clickEffectClass}"
    style:--btn-bg={variantStyles.background}
    style:--btn-color={variantStyles.color}
    style:--btn-border={variantStyles.border}
    style:--btn-hover-bg={variantStyles.hoverBackground}
    style:--btn-hover-filter={variantStyles.hoverFilter}
    style:--btn-radius={computedRadius}
    style:--btn-padding={computedPadding}
    style:--btn-shadow={computedShadow}
    style:--btn-font-size={sizeConfig[size].fontSize}
    style:--btn-min-height={sizeConfig[size].minHeight}
    style:--btn-min-width={sizeConfig[size].minWidth}
    style:--btn-transition={theme.transitions.fast}
    style:width={computedWidth}
    disabled={disabled || loading}
    onclick={handleClick}
    {...props}
>
    {#if theme.clickEffect === "ripple" && !disabled && !loading}
        <RippleEffect
            bind:this={rippleEffect}
            color={variantStyles.color}
            radius={computedRadius}
        />
    {/if}

    {#if loading}
        <span class="loader"></span>
    {:else}
        {#if leadingIcon}
            <span class="icon leading">{@render leadingIcon()}</span>
        {/if}
        <span class="content">{@render children()}</span>
        {#if trailingIcon}
            <span class="icon trailing">{@render trailingIcon()}</span>
        {/if}
    {/if}
</button>

<style>
    .svlendid-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        background: var(--btn-bg);
        color: var(--btn-color);
        border: var(--btn-border);
        border-radius: var(--btn-radius);
        padding: var(--btn-padding);
        box-shadow: var(--btn-shadow);
        font-size: var(--btn-font-size);
        min-height: var(--btn-min-height);
        min-width: var(--btn-min-width);
        font-family: inherit;
        font-weight: 500;
        cursor: pointer;
        /* Be specific about what transitions to avoid disabled twitching */
        transition:
            background var(--btn-transition) ease,
            filter var(--btn-transition) ease,
            transform var(--btn-transition) ease,
            box-shadow var(--btn-transition) ease;
        outline: none;
        position: relative;
        overflow: hidden;

        &:hover:not(:disabled) {
            background: var(--btn-hover-bg);
            filter: var(--btn-hover-filter);
        }

        &:focus-visible {
            outline: 2px solid var(--btn-color);
            outline-offset: 2px;
        }

        &:disabled {
            opacity: 0.5;
            cursor: not-allowed;
            /* Reset any hover effects immediately for disabled */
            filter: none !important;
            transform: none !important;
            background: var(--btn-bg) !important;
            box-shadow: var(--btn-shadow) !important;
        }
    }

    /* Click effect: scale (default) */
    .click-effect-scale:active:not(:disabled) {
        transform: scale(0.98);
    }

    /* Click effect: lift */
    .click-effect-lift {
        &:hover:not(:disabled) {
            transform: translateY(-1px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
        }

        &:active:not(:disabled) {
            transform: translateY(1px);
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
        }
    }

    /* Click effect: none */
    .click-effect-none {
        &:active:not(:disabled) {
            transform: none;
        }
    }

    .icon {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        position: relative;
        z-index: 1;
    }

    .content {
        display: inline-flex;
        align-items: center;
        position: relative;
        z-index: 1;
    }

    .loader {
        width: 1em;
        height: 1em;
        border: 2px solid currentColor;
        border-bottom-color: transparent;
        border-radius: 50%;
        animation: spin 0.75s linear infinite;
    }

    @keyframes spin {
        to {
            transform: rotate(360deg);
        }
    }
</style>

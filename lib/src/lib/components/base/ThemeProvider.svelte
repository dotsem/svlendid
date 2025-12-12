<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";
    import {
        createTheme,
        type ThemeConfig,
        type Theme,
    } from "$package/config/theme.js";

    /**
     * @component ThemeProvider
     * Provides theme context to all child components.
     * Wrap your app with this component to enable theming.
     * Also generates CSS custom properties for all theme colors.
     */
    interface Props {
        /** Child content */
        children: Snippet;
        /** Theme configuration - only override what you need */
        config?: ThemeConfig;
    }

    let { children, config = {} }: Props = $props();

    // Generate CSS variables string from theme
    function generateCssVars(themeObj: Theme): string {
        const vars: string[] = [];

        // Color palette
        for (const [key, value] of Object.entries(themeObj.colors)) {
            vars.push(`--color-${key}: ${value}`);
        }

        // Spacing
        for (const [key, value] of Object.entries(themeObj.spacing)) {
            vars.push(`--spacing-${key}: ${value}`);
        }

        // Radius
        for (const [key, value] of Object.entries(themeObj.radius)) {
            vars.push(`--radius-${key}: ${value}`);
        }

        // Box shadows
        for (const [key, value] of Object.entries(themeObj.boxShadow)) {
            vars.push(`--shadow-${key}: ${value}`);
        }

        // Transitions
        for (const [key, value] of Object.entries(themeObj.transitions)) {
            vars.push(`--transition-${key}: ${value}`);
        }

        return vars.join("; ");
    }

    // Create theme synchronously - use $derived to track config changes locally
    const theme = $derived(createTheme(config));

    // Generate CSS vars synchronously (same on server and client)
    const cssVars = $derived(generateCssVars(theme));

    // Set context synchronously - must happen during component init, not in $effect
    const THEME_CONTEXT_KEY = Symbol.for("svlendid-theme");
    setContext(THEME_CONTEXT_KEY, theme);
</script>

<div class="svlendid-theme-root" style={cssVars}>
    {@render children()}
</div>

<style>
    /* Global CSS reset */
    :global(*),
    :global(*::before),
    :global(*::after) {
        box-sizing: border-box;
    }

    .svlendid-theme-root {
        /* Ensure theme root takes full space and inherits properly */
        display: contents;
    }
</style>

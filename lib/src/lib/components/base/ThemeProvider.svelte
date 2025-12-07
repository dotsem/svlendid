<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";
    import { createTheme, type ThemeConfig, type Theme } from "$lib/config/theme.js";

    /**
     * @component ThemeProvider
     * Provides theme context to all child components.
     * Wrap your app with this component to enable theming.
     */
    interface Props {
        /** Child content */
        children: Snippet;
        /** Theme configuration - only override what you need */
        config?: ThemeConfig;
    }

    let { children, config = {} }: Props = $props();

    // Create theme synchronously during component initialization
    // This ensures theme is available before any child renders (including SSR)
    const theme: Theme = createTheme(config);
    
    // Set context synchronously - this happens during component init
    const THEME_CONTEXT_KEY = Symbol.for("svlendid-theme");
    setContext(THEME_CONTEXT_KEY, theme);
</script>

{@render children()}

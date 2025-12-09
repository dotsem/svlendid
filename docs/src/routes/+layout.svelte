<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import { ThemeProvider, type ThemeConfig } from "lib";

    let { children } = $props();

    const theme: ThemeConfig = {
        clickEffect: "ripple",
    };
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<ThemeProvider config={theme}>
    {@render children()}
</ThemeProvider>

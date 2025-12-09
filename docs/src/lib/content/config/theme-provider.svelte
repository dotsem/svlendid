<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        CustomTheme,
        CustomThemeCode,
    } from "./theme-provider/index";

    // ThemeProvider might not be easily analyzable by getComponentProps if it exports complex types
    // But we'll try. If it fails, we might need manual props.
    // Assuming 'ThemeProvider' is the exported name in the library.
    const themeProviderProps = getComponentProps("ThemeProvider");
</script>

<h2 id="overview">Overview</h2>

<p>
    The ThemeProvider component is the core of the Svelte 5 UI library's theming
    system. It provides design tokens (colors, spacing, radius, etc.) to all
    child components via Svelte Context and CSS Custom Properties.
</p>

<p>
    You should wrap your application's root component (or specific sections)
    with ThemeProvider to ensure proper styling and theming support.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Wrap your app with ThemeProvider"
    code={BasicUsageCode}
>
    <!-- Note: We don't render BasicUsage directly because it nests a provider. 
         But typically you wrap your whole app. 
         The demo component itself renders isolated children. -->
    <BasicUsage />
</Demo>

<h2 id="customization">Custom Configuration</h2>

<p>
    You can customize any part of the theme by passing a <code>config</code> prop.
    The config object is deeply merged with the default theme, so you only need to
    provide the values you want to override.
</p>

<Demo
    title="Custom Theme"
    description="Overriding theme colors and radius"
    code={CustomThemeCode}
>
    <CustomTheme />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={themeProviderProps} />

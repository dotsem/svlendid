<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./themetoggle/index";

    const themeToggleProps = getComponentProps("ThemeToggle");
</script>

<h2 id="overview">Overview</h2>

<p>ThemeToggle provides a button to switch between light and dark modes.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Toggle between light and dark mode"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={themeToggleProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./head/index";

    const headProps = getComponentProps("Head");
</script>

<h2 id="overview">Overview</h2>

<p>Head manages SEO meta tags including Open Graph and Twitter cards.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Injects meta tags into document head"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={headProps} />

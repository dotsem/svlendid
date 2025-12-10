<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./link/index";

    const linkProps = getComponentProps("Link");
</script>

<h2 id="overview">Overview</h2>

<p>Link component for styled anchor elements with underline control.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Links with different underline styles and external indicator"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={linkProps} />

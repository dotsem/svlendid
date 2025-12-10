<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./breadcrumb/index";

    const breadcrumbProps = getComponentProps("Breadcrumb");
</script>

<h2 id="overview">Overview</h2>

<p>Breadcrumb shows the navigation trail to the current page.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Navigation trail with clickable links"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={breadcrumbProps} />

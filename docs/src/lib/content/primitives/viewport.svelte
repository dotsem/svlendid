<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./viewport/index";

    const componentProps = getComponentProps("ViewPort");
</script>

<h2 id="overview">Overview</h2>

<p>
    The <code>ViewPort</code> component allows you to conditionally render content
    based on viewport size using CSS media queries. Unlike CSS media queries which
    just hide the element (display: none), this component physically removes the
    content from the DOM when the condition is not met.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Show content based on viewport width"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={componentProps} />

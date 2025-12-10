<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./spinner/index";

    const spinnerProps = getComponentProps("Spinner");
</script>

<h2 id="overview">Overview</h2>

<p>Spinner is a simple loading indicator.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Different sizes and colors"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={spinnerProps} />

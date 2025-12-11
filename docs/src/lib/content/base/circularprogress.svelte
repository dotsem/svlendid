<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Interactive,
        InteractiveCode,
    } from "./circularprogress/index";

    const circularProgressProps = getComponentProps("CircularProgress");
</script>

<h2 id="overview">Overview</h2>

<p>CircularProgress displays progress in a circular indicator.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Determinate with label and indeterminate states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="interactive">Interactive Control</h2>

<p>Control the progress value with a slider:</p>

<Demo
    title="Interactive Progress"
    description="Adjust the progress value dynamically"
    code={InteractiveCode}
>
    <Interactive />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={circularProgressProps} />

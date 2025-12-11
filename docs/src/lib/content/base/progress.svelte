<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Increment,
        IncrementCode,
    } from "./progress/index";

    const progressProps = getComponentProps("Progress");
</script>

<h2 id="overview">Overview</h2>

<p>Progress shows the completion status of an operation.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Determinate and indeterminate progress bars"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<Demo
    title="Increment"
    description="Increment progress bar"
    code={IncrementCode}
>
    <Increment />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={progressProps} />

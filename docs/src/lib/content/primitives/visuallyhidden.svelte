<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./visuallyhidden/index";

    const visuallyHiddenProps = getComponentProps("VisuallyHidden");
</script>

<h2 id="overview">Overview</h2>

<p>
    VisuallyHidden hides content visually while keeping it accessible to screen
    readers.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Hidden text visible only to screen readers"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={visuallyHiddenProps} />

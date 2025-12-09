<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./center/index";

    const centerProps = getComponentProps("Center");
</script>

<h2 id="overview">Overview</h2>

<p>
    Center is a layout component that centers its child within itself both
    horizontally and vertically.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Center"
    description="Centering content within a parent"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={centerProps} />

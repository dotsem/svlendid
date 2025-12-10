<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./floatingactionbutton/index";

    const fabProps = getComponentProps("FloatingActionButton");
</script>

<h2 id="overview">Overview</h2>

<p>FloatingActionButton provides a prominent floating action button (FAB).</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Standard and extended FAB"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={fabProps} />

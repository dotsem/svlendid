<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./list/index";

    const listProps = getComponentProps("List");
</script>

<h2 id="overview">Overview</h2>

<p>List displays a collection of items in a vertical layout.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="List with divided items"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={listProps} />

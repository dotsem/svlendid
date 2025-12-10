<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./listitem/index";

    const listItemProps = getComponentProps("ListItem");
</script>

<h2 id="overview">Overview</h2>

<p>ListItem represents a single item within a List.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="ListItem with leading avatar and trailing text"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={listItemProps} />

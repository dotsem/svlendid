<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./menu/index";

    const menuProps = getComponentProps("Menu");
</script>

<h2 id="overview">Overview</h2>

<p>Menu displays a list of actions or options.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Menu with items and divider"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={menuProps} />

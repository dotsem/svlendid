<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./drawer/index";

    const drawerProps = getComponentProps("Drawer");
</script>

<h2 id="overview">Overview</h2>

<p>Drawer is a slide-in panel from any screen edge.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Drawer sliding in from left"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={drawerProps} />

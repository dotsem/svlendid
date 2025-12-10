<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./dialog/index";

    const dialogProps = getComponentProps("Dialog");
</script>

<h2 id="overview">Overview</h2>

<p>Dialog is a modal with header, content, and action areas.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Dialog with title and action buttons"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={dialogProps} />

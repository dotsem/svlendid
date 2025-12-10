<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./overlay/index";

    const overlayProps = getComponentProps("Overlay");
</script>

<h2 id="overview">Overview</h2>

<p>Overlay creates a backdrop layer for modals, drawers, and popups.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Click button to show overlay"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={overlayProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./dropdown/index";

    const dropdownProps = getComponentProps("Dropdown");
</script>

<h2 id="overview">Overview</h2>

<p>Dropdown combines a trigger element with a popup menu.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Dropdown with menu items"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={dropdownProps} />

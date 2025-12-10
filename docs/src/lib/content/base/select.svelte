<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
    } from "./select/index";

    const selectProps = getComponentProps("Select");
</script>

<h2 id="overview">Overview</h2>

<p>Select provides a dropdown menu for choosing from a list of options.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Select with placeholder, value, and disabled states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<Demo
    title="Select Variants"
    description="Outlined and filled styles"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={selectProps} />

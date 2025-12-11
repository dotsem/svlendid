<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
        ValueBinding,
        ValueBindingCode,
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

<h2 id="value-binding">Value Binding</h2>

<p>Use <code>bind:value</code> to track the selected option:</p>

<Demo
    title="Reactive Selection"
    description="Track and display the selected value"
    code={ValueBindingCode}
>
    <ValueBinding />
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

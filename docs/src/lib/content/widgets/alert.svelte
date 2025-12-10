<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
    } from "./alert/index";

    const alertProps = getComponentProps("Alert");
</script>

<h2 id="overview">Overview</h2>

<p>Alert displays important messages with different severity levels.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Different severity levels"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<Demo
    title="Alert Variants"
    description="Filled, tonal, and outlined styles"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={alertProps} />

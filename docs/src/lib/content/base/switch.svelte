<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Sizes,
        SizesCode,
    } from "./switch/index";

    const switchProps = getComponentProps("Switch");
</script>

<h2 id="overview">Overview</h2>

<p>Switch is a toggle control that allows users to turn an option on or off.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Switch with label, on/off, and disabled states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="sizes">Sizes</h2>

<Demo
    title="Switch Sizes"
    description="Small, medium, and large switches"
    code={SizesCode}
>
    <Sizes />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={switchProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
        Interactive,
        InteractiveCode,
    } from "./chip/index";

    const chipProps = getComponentProps("Chip");
</script>

<h2 id="overview">Overview</h2>

<p>Chips are compact elements that represent an input, attribute, or action.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Chip with different colors"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<Demo
    title="Chip Variants"
    description="Filled, tonal, and outlined styles"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="interactive">Interactive</h2>

<Demo
    title="Interactive Chips"
    description="Removable and clickable chips"
    code={InteractiveCode}
>
    <Interactive />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={chipProps} />

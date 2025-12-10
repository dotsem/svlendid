<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Colors,
        ColorsCode,
        Sizes,
        SizesCode,
    } from "./checkbox/index";

    const checkboxProps = getComponentProps("Checkbox");
</script>

<h2 id="overview">Overview</h2>

<p>
    Checkbox allows users to select one or more items from a set, or toggle an
    option on/off.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Checkbox with label, checked, and disabled states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="colors">Colors</h2>

<p>Use the <code>color</code> prop to change the checkbox color:</p>

<Demo
    title="Checkbox Colors"
    description="Different color schemes from the theme"
    code={ColorsCode}
>
    <Colors />
</Demo>

<h2 id="sizes">Sizes</h2>

<p>Three sizes are available: s, m (default), and l:</p>

<Demo
    title="Checkbox Sizes"
    description="Small, medium, and large checkboxes"
    code={SizesCode}
>
    <Sizes />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={checkboxProps} />

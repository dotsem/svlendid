<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
        Colors,
        ColorsCode,
    } from "./text/index";

    const textProps = getComponentProps("Text");
</script>

<h2 id="overview">Overview</h2>

<p>
    The Text component nests your typography within the theme system. It
    provides consistent styling across your application using defined theme
    variants.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Displaying text with default settings"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<p>
    Text supports the Material Design 3 type scale. Use the <code>variant</code>
    prop to apply these styles.
</p>

<Demo
    title="Typography Variants"
    description="Standard theme variants"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="colors">Colors</h2>

<p>
    Apply theme colors or custom colors using the <code>color</code> prop.
</p>

<Demo
    title="Text Colors"
    description="Theme and custom colors"
    code={ColorsCode}
>
    <Colors />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={textProps} />

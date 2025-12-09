<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Sizes,
        SizesCode,
        Colors,
        ColorsCode,
    } from "./icon/index";

    const iconProps = getComponentProps("Icon");
</script>

<h2 id="overview">Overview</h2>

<p>
    The Icon component provides a simple way to use Lucide icons in your
    application. It supports all standard Lucide icons and integrates with the
    theme system for colors.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Render any Lucide icon by name"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="sizes">Sizes</h2>

<p>
    Use the <code>size</code> prop to set the icon size in pixels (number) or string
    values. Default size is 24px.
</p>

<Demo title="Icon Sizes" description="Different icon sizes" code={SizesCode}>
    <Sizes />
</Demo>

<h2 id="colors">Colors</h2>

<p>
    Use the <code>color</code> prop to apply theme colors or custom CSS values.
</p>

<Demo
    title="Icon Colors"
    description="Theme and custom colors"
    code={ColorsCode}
>
    <Colors />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={iconProps} />

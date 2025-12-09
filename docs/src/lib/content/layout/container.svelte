<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Sizes,
        SizesCode,
    } from "./container/index";

    const containerProps = getComponentProps("Container");
</script>

<h2 id="overview">Overview</h2>

<p>
    Container constrains the content's width to breakpoints defined in the
    theme. It is commonly used to center content on the page.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Container"
    description="Centered container with default size"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="sizes">Sizes</h2>

<p>
    Use the <code>size</code> prop to set the max-width based on theme breakpoints
    (xs, s, m, l, xl, full).
</p>

<Demo
    title="Container Sizes"
    description="Different max-width presets"
    code={SizesCode}
>
    <Sizes />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={containerProps} />

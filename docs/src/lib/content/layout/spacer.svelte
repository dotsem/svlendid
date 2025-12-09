<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Dimensions,
        DimensionsCode,
    } from "./spacer/index";

    const spacerProps = getComponentProps("Spacer");
</script>

<h2 id="overview">Overview</h2>

<p>
    Spacer creates empty space between components. It can have a fixed size or
    expand to fill available space (like a spring).
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Flexible Spacer"
    description="Pushing content apart"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="dimensions">Dimensions</h2>

<p>
    Set fixed <code>width</code> or <code>height</code> using theme spacing tokens
    or CSS values.
</p>

<Demo
    title="Fixed Spacer"
    description="Using fixed dimensions"
    code={DimensionsCode}
>
    <Dimensions />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={spacerProps} />

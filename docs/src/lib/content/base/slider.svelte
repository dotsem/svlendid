<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Colors,
        ColorsCode,
    } from "./slider/index";

    const sliderProps = getComponentProps("Slider");
</script>

<h2 id="overview">Overview</h2>

<p>
    Slider allows users to select a value from a range by moving a thumb along a
    track.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Slider with label, value display, and disabled states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="colors">Colors</h2>

<Demo
    title="Slider Colors"
    description="Different color schemes from the theme"
    code={ColorsCode}
>
    <Colors />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={sliderProps} />

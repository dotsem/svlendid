<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Presets,
        PresetsCode,
    } from "./animate/index";

    const animateProps = getComponentProps("Animate");
</script>

<h2 id="overview">Overview</h2>

<p>
    Animate triggers CSS animations when elements enter the viewport using
    IntersectionObserver. It supports various presets and custom timing
    functions.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Animation"
    description="Fade up on entry"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="presets">Presets</h2>

<p>
    Available animation presets include fade, slide, scale, and blur variants.
</p>

<Demo
    title="Animation Presets"
    description="Different animation styles"
    code={PresetsCode}
>
    <Presets />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={animateProps} />

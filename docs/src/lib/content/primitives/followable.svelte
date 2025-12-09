<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Smoothing,
        SmoothingCode,
    } from "./followable/index";

    const followableProps = getComponentProps("Followable");
</script>

<h2 id="overview">Overview</h2>

<p>
    Followable renders content that follows the mouse cursor. It's useful for
    custom cursors, tooltips, or interactive effects.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Followable"
    description="Following the cursor within a container"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="smoothing">Smoothing</h2>

<p>
    Use the <code>smoothing</code> prop to add a delay effect to the movement, making
    it feel more organic.
</p>

<Demo
    title="Smooth Following"
    description="Lagging effect with smoothing"
    code={SmoothingCode}
>
    <Smoothing />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={followableProps} />

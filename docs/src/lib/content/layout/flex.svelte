<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Direction,
        DirectionCode,
        Alignment,
        AlignmentCode,
    } from "./flex/index";

    const flexProps = getComponentProps("Flex");
</script>

<h2 id="overview">Overview</h2>

<p>
    Flex is a layout container that provides a shorthand for CSS flexbox
    properties. It simplifies alignment, direction, and spacing of child
    elements.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Flex container with gap"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="direction">Direction</h2>

<p>
    Use the <code>direction</code> prop to switch between row and column layouts.
</p>

<Demo title="Flex Direction" description="Row vs Column" code={DirectionCode}>
    <Direction />
</Demo>

<h2 id="alignment">Alignment</h2>

<p>
    Control cross-axis alignment with <code>align</code> and main-axis alignment
    with <code>justify</code>.
</p>

<Demo
    title="Flex Alignment"
    description="Justify content and align items"
    code={AlignmentCode}
>
    <Alignment />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={flexProps} />

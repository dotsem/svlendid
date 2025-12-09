<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        AxisConstraint,
        AxisConstraintCode,
    } from "./draggable/index";

    const draggableProps = getComponentProps("Draggable");
</script>

<h2 id="overview">Overview</h2>

<p>
    Draggable makes any element draggable/swipable. It provides drag events with
    delta values that can be used to transform the element or trigger actions.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Draggable"
    description="Drag the box around"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="constraints">Axis Constraints</h2>

<p>
    Restrict dragging to horizontal or vertical axes using the <code>axis</code>
    prop.
</p>

<Demo
    title="Axis Constraints"
    description="Horizontal and vertical locking"
    code={AxisConstraintCode}
>
    <AxisConstraint />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={draggableProps} />

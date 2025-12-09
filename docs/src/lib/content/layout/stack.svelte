<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Alignment,
        AlignmentCode,
    } from "./stack/index";

    const stackProps = getComponentProps("Stack");
</script>

<h2 id="overview">Overview</h2>

<p>
    Stack places components on top of each other (z-axis). It's useful for
    overlays, backgrounds, and positioning elements relative to each other.
</p>

<h2 id="usage">Usage</h2>

<Demo title="Basic Stack" description="Layering content" code={BasicUsageCode}>
    <BasicUsage />
</Demo>

<h2 id="alignment">Alignment</h2>

<p>
    Use the <code>align</code> prop to set the default alignment of all children.
    Individual children can override this using CSS grid properties (justify-self,
    align-self).
</p>

<Demo
    title="Stack Alignment"
    description="Aligning stacked items"
    code={AlignmentCode}
>
    <Alignment />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={stackProps} />

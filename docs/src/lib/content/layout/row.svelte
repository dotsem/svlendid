<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Alignment,
        AlignmentCode,
    } from "./row/index";

    const rowProps = getComponentProps("Row");
</script>

<h2 id="overview">Overview</h2>

<p>
    Row is a convenience component for horizontal flex layouts. It is equivalent
    to
    <code>Flex</code> with <code>direction="row"</code>.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Row"
    description="Horizontal layout with gap"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="alignment">Alignment</h2>

<p>
    Align items horizontally with <code>justify</code> and vertically with
    <code>align</code>.
</p>

<Demo
    title="Row Alignment"
    description="Control distribution and alignment"
    code={AlignmentCode}
>
    <Alignment />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={rowProps} />

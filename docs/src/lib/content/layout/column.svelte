<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Alignment,
        AlignmentCode,
    } from "./column/index";

    const columnProps = getComponentProps("Column");
</script>

<h2 id="overview">Overview</h2>

<p>
    Column is a convenience component for vertical flex layouts. It is
    equivalent to
    <code>Flex</code> with <code>direction="column"</code>.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Column"
    description="Vertical layout with gap"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="alignment">Alignment</h2>

<p>
    Align items horizontally with <code>align</code> and vertically with
    <code>justify</code>.
</p>

<Demo
    title="Column Alignment"
    description="Control distribution and alignment"
    code={AlignmentCode}
>
    <Alignment />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={columnProps} />

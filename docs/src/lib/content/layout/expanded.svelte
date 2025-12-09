<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        FlexGrow,
        FlexGrowCode,
    } from "./expanded/index";

    const expandedProps = getComponentProps("Expanded");
</script>

<h2 id="overview">Overview</h2>

<p>
    Expanded is a shorthand for <code>flex-grow: 1</code> (or other values). It is
    used inside Flex, Row, or Column to make a child fill available space.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Expanded"
    description="Filling remaining space"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="flex-grow">Flex Grow</h2>

<p>
    Use the <code>flex</code> prop to control the proportion of space taken.
</p>

<Demo
    title="Flex Grow Factors"
    description="Using different flex values"
    code={FlexGrowCode}
>
    <FlexGrow />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={expandedProps} />

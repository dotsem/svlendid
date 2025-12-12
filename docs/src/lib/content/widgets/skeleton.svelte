<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        AnimationsCode,
        Animations,
        BasicUsage,
        BasicUsageCode,
        TextLines,
        TextLinesCode,
    } from "./skeleton/index";

    const skeletonProps = getComponentProps("Skeleton");
</script>

<h2 id="overview">Overview</h2>

<p>Skeleton shows loading placeholders with shimmer animation.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Text, circular, and rectangular variants"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="animations">Animations</h2>

<Demo
    title="Animations"
    description="Shimmer and pulse animations"
    code={AnimationsCode}
>
    <Animations />
</Demo>

<h2 id="text-lines">Text Lines</h2>

<Demo
    title="Text Lines"
    description="Text lines placeholder"
    code={TextLinesCode}
>
    <TextLines />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={skeletonProps} />

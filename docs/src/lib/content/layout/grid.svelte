<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        AutoFit,
        AutoFitCode,
    } from "./grid/index";

    const gridProps = getComponentProps("Grid");
</script>

<h2 id="overview">Overview</h2>

<p>Grid provides CSS Grid layout with responsive column handling.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Fixed 3-column grid"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="autofit">Auto-fit Layout</h2>

<p>
    Use <code>autoFit</code> with <code>minColumnWidth</code> for responsive grids:
</p>

<Demo
    title="Auto-fit Grid"
    description="Columns automatically adjust based on available space"
    code={AutoFitCode}
>
    <AutoFit />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={gridProps} />

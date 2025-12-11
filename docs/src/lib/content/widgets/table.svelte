<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Sortable,
        SortableCode,
    } from "./table/index";

    const tableProps = getComponentProps("Table");
</script>

<h2 id="overview">Overview</h2>

<p>Table displays data in rows and columns with sorting support.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Table with striped rows and hover effect"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="sorting">Column Sorting</h2>

<p>Click column headers to sort data:</p>

<Demo
    title="Sortable Table"
    description="Click on column headers to sort ascending/descending"
    code={SortableCode}
>
    <Sortable />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={tableProps} />

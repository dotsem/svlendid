<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        PropExamples,
        PropExamplesCode,
    } from "./pagination/index";

    const paginationProps = getComponentProps("Pagination");
</script>

<h2 id="overview">Overview</h2>

<p>
    Pagination provides page navigation controls with first/last and prev/next
    buttons.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Interactive pagination"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="properties">Properties</h2>

<p>Customize sibling and boundary counts:</p>

<Demo
    title="Pagination Options"
    description="Adjust total pages and see different configurations"
    code={PropExamplesCode}
>
    <PropExamples />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={paginationProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./accordion/index";

    const accordionProps = getComponentProps("Accordion");
</script>

<h2 id="overview">Overview</h2>

<p>Accordion organizes content into collapsible sections.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Expandable content sections"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={accordionProps} />

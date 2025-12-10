<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./splitsection/index";

    const splitSectionProps = getComponentProps("SplitSection");
</script>

<h2 id="overview">Overview</h2>

<p>SplitSection creates a two-pane layout with configurable ratio.</p>

<h2 id="usage">Usage</h2>

<Demo title="Basic Usage" description="Two-column layout" code={BasicUsageCode}>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={splitSectionProps} />

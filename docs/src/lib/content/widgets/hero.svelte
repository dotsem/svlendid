<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./hero/index";

    const heroProps = getComponentProps("Hero");
</script>

<h2 id="overview">Overview</h2>

<p>Hero creates a prominent landing page section with background support.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Hero with gradient background"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={heroProps} />

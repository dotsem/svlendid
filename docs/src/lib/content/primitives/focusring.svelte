<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./focusring/index";

    const focusRingProps = getComponentProps("FocusRing");
</script>

<h2 id="overview">Overview</h2>

<p>
    FocusRing provides a consistent focus indicator around interactive elements.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Wrap an element to add focus ring"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={focusRingProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./portal/index";

    const portalProps = getComponentProps("Portal");
</script>

<h2 id="overview">Overview</h2>

<p>
    Portal renders its children into a different part of the DOM (defaults to <code
        >document.body</code
    >). This is essential for creating overlays, modals, and tooltips that need
    to escape their parent's stacking context or overflow clipping.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Portal"
    description="Rendering content outside the current container"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={portalProps} />

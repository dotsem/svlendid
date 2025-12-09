<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./hoverable/index";

    const hoverableProps = getComponentProps("Hoverable");
</script>

<h2 id="overview">Overview</h2>

<p>
    Hoverable tracks the hover state of its children and exposes it via a
    snippet prop. It also provides callbacks for enter, leave, and move events.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Hoverable"
    description="Responding to hover state"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={hoverableProps} />

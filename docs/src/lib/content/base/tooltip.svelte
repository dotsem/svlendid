<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Positions,
        PositionsCode,
        CustomContent,
        CustomContentCode,
    } from "./tooltip/index";

    const tooltipProps = getComponentProps("Tooltip");
</script>

<h2 id="overview">Overview</h2>

<p>
    Tooltips display informative text when users hover over, focus on, or tap an
    element.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Simple text tooltip"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="positions">Positions</h2>

<p>
    Tooltips can be positioned top, bottom, left, or right relative to the
    trigger element.
</p>

<Demo
    title="Tooltip Positions"
    description="Different positioning options"
    code={PositionsCode}
>
    <Positions />
</Demo>

<h2 id="custom-content">Custom Content</h2>

<p>Use a snippet to render rich content inside the tooltip.</p>

<Demo
    title="Custom Content"
    description="Tooltip with custom snippet content"
    code={CustomContentCode}
>
    <CustomContent />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={tooltipProps} />

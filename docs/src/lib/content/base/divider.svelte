<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Vertical,
        VerticalCode,
    } from "./divider/index";

    const dividerProps = getComponentProps("Divider");
</script>

<h2 id="overview">Overview</h2>

<p>
    Dividers are visual separators that group related content or separate
    unrelated content.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Horizontal dividers with customization"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="vertical">Vertical</h2>

<p>
    Use <code>direction="vertical"</code> to create a vertical separator. Ensure
    the parent container has a defined height.
</p>

<Demo
    title="Vertical Dividers"
    description="Vertical orientation"
    code={VerticalCode}
>
    <Vertical />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={dividerProps} />

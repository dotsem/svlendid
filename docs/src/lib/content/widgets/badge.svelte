<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
    } from "./badge/index";

    const badgeProps = getComponentProps("Badge");
</script>

<h2 id="overview">Overview</h2>

<p>
    Badge displays a small status indicator, such as a number or dot, on top of
    its child element. It's commonly used for notifications, counts, or status
    updates.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Badge"
    description="Numeric count on an icon"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<p>
    Badges can be dots, limit the maximum count (e.g. 99+), or show text. You
    can also customize the position and color.
</p>

<Demo
    title="Badge Variants"
    description="Dots, max count, and positions"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={badgeProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
        Interactive,
        InteractiveCode,
    } from "./card/index";

    const cardProps = getComponentProps("Card");
</script>

<h2 id="overview">Overview</h2>

<p>
    Cards contain content and actions about a single subject. They are versatile
    containers that can be used for grouping related information.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="A simple card with content"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<p>Cards come in three variants: elevated, filled, and outlined.</p>

<Demo
    title="Card Variants"
    description="elevated (default), filled, and outlined"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="interactive">Interactive</h2>

<p>
    Cards can be made clickable using the <code>clickable</code> prop. This adds
    hover effects and keyboard accessibility.
</p>

<Demo
    title="Interactive Card"
    description="Clickable card with hover state"
    code={InteractiveCode}
>
    <Interactive />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={cardProps} />

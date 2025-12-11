<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Colors,
        ColorsCode,
        ValueBinding,
        ValueBindingCode,
    } from "./radio/index";

    const radioProps = getComponentProps("Radio");
</script>

<h2 id="overview">Overview</h2>

<p>
    Radio buttons allow users to select a single option from a set of mutually
    exclusive choices.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Radio group with name attribute for grouping"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="value-binding">Value Binding</h2>

<p>Track the selected radio value with reactive state:</p>

<Demo
    title="Reactive Group Selection"
    description="Track and display the selected radio option"
    code={ValueBindingCode}
>
    <ValueBinding />
</Demo>

<h2 id="colors">Colors</h2>

<Demo
    title="Radio Colors"
    description="Different color schemes from the theme"
    code={ColorsCode}
>
    <Colors />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={radioProps} />

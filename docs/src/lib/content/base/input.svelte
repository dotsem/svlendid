<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Variants,
        VariantsCode,
        States,
        StatesCode,
        WithIcons,
        WithIconsCode,
    } from "./input/index";

    const inputProps = getComponentProps("Input");
</script>

<h2 id="overview">Overview</h2>

<p>
    Input components allow users to provide input with single-line text fields.
    They support different variants, states, and icon decorations.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Simple input with label and binding"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<p>
    Inputs come in three variants: outlined (default), filled, and underlined.
</p>

<Demo
    title="Input Variants"
    description="Different style variants"
    code={VariantsCode}
>
    <Variants />
</Demo>

<h2 id="states">States</h2>

<p>
    Inputs support various states including helper text, error messages,
    disabled, and read-only.
</p>

<Demo
    title="Input States"
    description="Helper text, error, disabled, and readonly states"
    code={StatesCode}
>
    <States />
</Demo>

<h2 id="icons">With Icons</h2>

<p>Add leading or trailing icons using snippets.</p>

<Demo
    title="Input with Icons"
    description="Leading and trailing content"
    code={WithIconsCode}
>
    <WithIcons />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={inputProps} />

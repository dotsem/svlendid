<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Customization,
        CustomizationCode,
    } from "./ripple/index";

    const rippleProps = getComponentProps("Ripple");
</script>

<h2 id="overview">Overview</h2>

<p>
    Ripple provides the Material Design ink ripple interaction effect. It wraps
    its children and adds a visual feedback overlay on click.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Ripple"
    description="Standard ripple interaction"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="customization">Customization</h2>

<p>
    Customize the ripple <code>color</code>, <code>opacity</code>,
    <code>duration</code>, and centering.
</p>

<Demo
    title="Customized Ripple"
    description="Variants of ripple effects"
    code={CustomizationCode}
>
    <Customization />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={rippleProps} />

<script lang="ts">
    import { Demo, PropTable } from '$lib';
    import { getComponentProps } from '$lib/utils/component-docs';

    // Import demo components and their raw source code
    import {
        BasicUsage, BasicUsageCode,
        Variants, VariantsCode,
        Colors, ColorsCode,
        Sizes, SizesCode,
        WithIcons, WithIconsCode,
        Loading, LoadingCode,
        Disabled, DisabledCode,
        FullWidth, FullWidthCode,
    } from './button/index';

    // Auto-generated props from component source
    const buttonProps = getComponentProps('Button');
</script>

<h2 id="overview">Overview</h2>

<p>
    The Button component is a versatile interactive element that supports multiple variants, 
    colors, sizes, and states. It follows Material Design principles while being fully customizable 
    through the theme system.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Import and use the Button component"
    code={BasicUsageCode}

>
    <BasicUsage />
</Demo>

<h2 id="variants">Variants</h2>

<p>
    Buttons come in four variants, each suited for different use cases:
</p>

<Demo
    title="Button Variants"
    description="filled, tonal, outlined, and text variants"
    code={VariantsCode}

>
    <Variants />
</Demo>

<h3 id="variant-filled">Filled</h3>
<p>High emphasis, use for primary actions.</p>

<h3 id="variant-tonal">Tonal</h3>
<p>Medium emphasis, use for secondary actions.</p>

<h3 id="variant-outlined">Outlined</h3>
<p>Medium emphasis with border, use for secondary actions that need more prominence.</p>

<h3 id="variant-text">Text</h3>
<p>Low emphasis, use for less important actions.</p>

<h2 id="colors">Colors</h2>

<p>
    Use the <code>color</code> prop to change the button's color scheme:
</p>

<Demo
    title="Button Colors"
    description="Different color schemes from the theme"
    code={ColorsCode}

>
    <Colors />
</Demo>

<h2 id="sizes">Sizes</h2>

<p>
    Five sizes are available: xs, s, m (default), l, and xl:
</p>

<Demo
    title="Button Sizes"
    description="xs, s, m, l, and xl size options"
    code={SizesCode}
>
    <Sizes />
</Demo>

<h2 id="icons">With Icons</h2>

<p>
    Add icons using the <code>leadingIcon</code> and <code>trailingIcon</code> snippets:
</p>

<Demo
    title="Buttons with Icons"
    description="Leading and trailing icon support"
    code={WithIconsCode}
>
    <WithIcons />
</Demo>

<h2 id="states">States</h2>

<h3 id="state-loading">Loading</h3>

<p>
    Use the <code>loading</code> prop to show a loading spinner. The button maintains its width
    to prevent layout shifts.
</p>

<Demo
    title="Loading Button"
    description="Shows a spinner while loading"
    code={LoadingCode}
>
    <Loading />
</Demo>

<h3 id="state-disabled">Disabled</h3>

<Demo
    title="Disabled Buttons"
    description="Buttons can be disabled"
    code={DisabledCode}
>
    <Disabled />
</Demo>

<h2 id="full-width">Full Width</h2>

<p>
    Use <code>expandedWidth</code> to make a button fill its container:
</p>

<Demo
    title="Full Width Button"
    description="Button expands to fill container"
    code={FullWidthCode}
>
    <FullWidth />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={buttonProps} />

<h2 id="accessibility">Accessibility</h2>

<ul>
    <li>Buttons are focusable and can be activated with Enter or Space</li>
    <li>Disabled buttons are not focusable</li>
    <li>Loading state adds <code>aria-busy="true"</code></li>
    <li>Use descriptive text or aria-label for icon-only buttons</li>
</ul>

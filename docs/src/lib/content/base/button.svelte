<script lang="ts">
    import { Button, Row, Column, Text, Icon, Box } from 'lib';
    import { Demo, PropTable } from '$lib';
    import { getComponentProps } from '$lib/utils/component-docs';

    let isLoading = $state(false);
    let clickCount = $state(0);

    function simulateLoading() {
        isLoading = true;
        setTimeout(() => isLoading = false, 2000);
    }

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
    code={`\<script\>
    import { Button } from 'lib';
\</script\>

<Button>Click me</Button>`}
>
    <Button>Click me</Button>
</Demo>

<h2 id="variants">Variants</h2>

<p>
    Buttons come in four variants, each suited for different use cases:
</p>

<Demo
    title="Button Variants"
    description="filled, tonal, outlined, and text variants"
    code={`<Row gap="m" wrap>
    <Button variant="filled">Filled</Button>
    <Button variant="tonal">Tonal</Button>
    <Button variant="outlined">Outlined</Button>
    <Button variant="text">Text</Button>
</Row>`}
>
    <Row gap="m" wrap>
        <Button variant="filled">Filled</Button>
        <Button variant="tonal">Tonal</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
    </Row>
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
    code={`<Row gap="s" wrap>
    <Button color="primary">Primary</Button>
    <Button color="secondary">Secondary</Button>
    <Button color="error">Error</Button>
    <Button color="success">Success</Button>
    <Button color="warning">Warning</Button>
    <Button color="info">Info</Button>
</Row>`}
>
    <Row gap="s" wrap>
        <Button color="primary">Primary</Button>
        <Button color="secondary">Secondary</Button>
        <Button color="error">Error</Button>
        <Button color="success">Success</Button>
        <Button color="warning">Warning</Button>
        <Button color="info">Info</Button>
    </Row>
</Demo>

<h2 id="sizes">Sizes</h2>

<p>
    Three sizes are available: small, medium (default), and large:
</p>

<Demo
    title="Button Sizes"
    description="s, m, and l size options"
    code={`<Row gap="m" align="center">
    <Button size="s">Small</Button>
    <Button size="m">Medium</Button>
    <Button size="l">Large</Button>
</Row>`}
>
    <Row gap="m" align="center">
        <Button size="s">Small</Button>
        <Button size="m">Medium</Button>
        <Button size="l">Large</Button>
    </Row>
</Demo>

<h2 id="icons">With Icons</h2>

<p>
    Add icons using the <code>leadingIcon</code> and <code>trailingIcon</code> snippets:
</p>

<Demo
    title="Buttons with Icons"
    description="Leading and trailing icon support"
    code={`<Row gap="m" wrap>
    <Button color="primary">
        {#snippet leadingIcon()}<Icon name="Plus" size={18} />{/snippet}
        Add Item
    </Button>
    <Button color="secondary" variant="outlined">
        Settings
        {#snippet trailingIcon()}<Icon name="ChevronRight" size={18} />{/snippet}
    </Button>
    <Button color="error" variant="tonal">
        {#snippet leadingIcon()}<Icon name="Trash2" size={18} />{/snippet}
        Delete
    </Button>
</Row>`}
>
    <Row gap="m" wrap>
        <Button color="primary">
            {#snippet leadingIcon()}<Icon name="Plus" size={18} />{/snippet}
            Add Item
        </Button>
        <Button color="secondary" variant="outlined">
            Settings
            {#snippet trailingIcon()}<Icon name="ChevronRight" size={18} />{/snippet}
        </Button>
        <Button color="error" variant="tonal">
            {#snippet leadingIcon()}<Icon name="Trash2" size={18} />{/snippet}
            Delete
        </Button>
    </Row>
</Demo>

<h2 id="states">States</h2>

<h3 id="state-disabled">Disabled</h3>

<Demo
    title="Disabled Button"
    description="Buttons can be disabled"
    code={`<Button disabled>Disabled</Button>`}
>
    <Button disabled>Disabled</Button>
</Demo>

<h3 id="state-loading">Loading</h3>

<Demo
    title="Loading Button"
    description="Shows a spinner while loading"
    code={`<Button loading={isLoading} onclick={simulateLoading}>
    {isLoading ? 'Loading...' : 'Click to Load'}
</Button>`}
>
    <Button loading={isLoading} onclick={simulateLoading}>
        {isLoading ? 'Loading...' : 'Click to Load'}
    </Button>
</Demo>

<h3 id="state-elevated">Elevated</h3>

<Demo
    title="Elevated Button"
    description="Adds shadow for more prominence"
    code={`<Button elevated>Elevated</Button>`}
>
    <Button elevated>Elevated</Button>
</Demo>

<h2 id="interactive">Interactive Example</h2>

<Demo
    title="Click Counter"
    description="Button with click handler"
    code={`\<script\>
    let clickCount = $state(0);
\</script\>

<Button onclick={() => clickCount++}>
    Clicked {clickCount} times
</Button>`}
>
    <Button onclick={() => clickCount++}>
        Clicked {clickCount} times
    </Button>
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

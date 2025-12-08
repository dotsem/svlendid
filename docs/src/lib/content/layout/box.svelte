<script lang="ts">
    import { Box, Row, Column, Text } from 'lib';
    import { Demo, PropTable, type PropDefinition } from '$lib';
    import { getComponentProps } from '$lib/utils/component-docs';

    // Get props from auto-generated docs
    const boxProps = getComponentProps('Box');
</script>

<h2 id="overview">Overview</h2>

<p>
    The Box component is the fundamental layout building block in Svlendid. It's a versatile container 
    that can be styled declaratively using props instead of CSS classes. Think of it as a 
    <code>&lt;div&gt;</code> on steroids.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Box"
    description="A simple styled container"
    code={`<Box bg="surface" padding="m" radius="m">
    <Text>Content inside a box</Text>
</Box>`}
>
    <Box bg="surface" padding="m" radius="m">
        <Text>Content inside a box</Text>
    </Box>
</Demo>

<h2 id="background">Background</h2>

<p>
    Use the <code>bg</code> prop to set a background color from the theme palette or any CSS color value:
</p>

<Demo
    title="Background Colors"
    description="Theme colors and custom values"
    code={`<Row gap="s" wrap>
    <Box bg="primary" padding="m" radius="m">
        <Text color="onPrimary">Primary</Text>
    </Box>
    <Box bg="secondary" padding="m" radius="m">
        <Text color="onSecondary">Secondary</Text>
    </Box>
    <Box bg="surface" padding="m" radius="m">
        <Text color="onSurface">Surface</Text>
    </Box>
    <Box bg="#ff6b6b" padding="m" radius="m">
        <Text style="color: white">Custom</Text>
    </Box>
</Row>`}
>
    <Row gap="s" wrap>
        <Box bg="primary" padding="m" radius="m">
            <Text color="onPrimary">Primary</Text>
        </Box>
        <Box bg="secondary" padding="m" radius="m">
            <Text color="onSecondary">Secondary</Text>
        </Box>
        <Box bg="surface" padding="m" radius="m">
            <Text color="onSurface">Surface</Text>
        </Box>
        <Box bg="#ff6b6b" padding="m" radius="m">
            <Text style="color: white">Custom</Text>
        </Box>
    </Row>
</Demo>

<h3 id="gradients">Gradients</h3>

<p>
    The <code>bg</code> prop also supports CSS gradients:
</p>

<Demo
    title="Gradient Background"
    description="Using CSS gradients"
    code={`<Box 
    bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
    padding="l" 
    radius="m"
>
    <Text style="color: white">Gradient Box</Text>
</Box>`}
>
    <Box 
        bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)" 
        padding="l" 
        radius="m"
    >
        <Text style="color: white">Gradient Box</Text>
    </Box>
</Demo>

<h2 id="spacing">Spacing</h2>

<p>
    Use theme spacing tokens for consistent padding and margin:
</p>

<Demo
    title="Spacing Values"
    description="xs, s, m, l, xl spacing tokens"
    code={`<Column gap="s">
    <Box bg="primaryContainer" padding="xs" radius="s">
        <Text color="onPrimaryContainer">xs padding</Text>
    </Box>
    <Box bg="primaryContainer" padding="s" radius="s">
        <Text color="onPrimaryContainer">s padding</Text>
    </Box>
    <Box bg="primaryContainer" padding="m" radius="s">
        <Text color="onPrimaryContainer">m padding</Text>
    </Box>
    <Box bg="primaryContainer" padding="l" radius="s">
        <Text color="onPrimaryContainer">l padding</Text>
    </Box>
    <Box bg="primaryContainer" padding="xl" radius="s">
        <Text color="onPrimaryContainer">xl padding</Text>
    </Box>
</Column>`}
>
    <Column gap="s" style="width: 100%;">
        <Box bg="primaryContainer" padding="xs" radius="s">
            <Text color="onPrimaryContainer">xs padding</Text>
        </Box>
        <Box bg="primaryContainer" padding="s" radius="s">
            <Text color="onPrimaryContainer">s padding</Text>
        </Box>
        <Box bg="primaryContainer" padding="m" radius="s">
            <Text color="onPrimaryContainer">m padding</Text>
        </Box>
        <Box bg="primaryContainer" padding="l" radius="s">
            <Text color="onPrimaryContainer">l padding</Text>
        </Box>
        <Box bg="primaryContainer" padding="xl" radius="s">
            <Text color="onPrimaryContainer">xl padding</Text>
        </Box>
    </Column>
</Demo>

<h3 id="spacing-array">Array Syntax</h3>

<p>
    Padding and margin accept arrays for different values per side:
</p>

<Demo
    title="Array Spacing"
    description="[vertical, horizontal] or [top, right, bottom, left]"
    code={`<Column gap="m">
    <Box bg="surface" padding={["s", "xl"]} radius="m">
        <Text>padding: ["s", "xl"]</Text>
    </Box>
    <Box bg="surface" padding={["xs", "s", "m", "l"]} radius="m">
        <Text>padding: ["xs", "s", "m", "l"]</Text>
    </Box>
</Column>`}
>
    <Column gap="m" style="width: 100%;">
        <Box bg="surface" padding={["s", "xl"]} radius="m">
            <Text>padding: ["s", "xl"]</Text>
        </Box>
        <Box bg="surface" padding={["xs", "s", "m", "l"]} radius="m">
            <Text>padding: ["xs", "s", "m", "l"]</Text>
        </Box>
    </Column>
</Demo>

<h2 id="radius">Border Radius</h2>

<Demo
    title="Border Radius"
    description="Theme radius tokens"
    code={`<Row gap="m" wrap>
    <Box bg="primary" padding="m" radius="none">
        <Text color="onPrimary">none</Text>
    </Box>
    <Box bg="primary" padding="m" radius="s">
        <Text color="onPrimary">s</Text>
    </Box>
    <Box bg="primary" padding="m" radius="m">
        <Text color="onPrimary">m</Text>
    </Box>
    <Box bg="primary" padding="m" radius="l">
        <Text color="onPrimary">l</Text>
    </Box>
    <Box bg="primary" padding="m" radius="full">
        <Text color="onPrimary">full</Text>
    </Box>
</Row>`}
>
    <Row gap="m" wrap>
        <Box bg="primary" padding="m" radius="none">
            <Text color="onPrimary">none</Text>
        </Box>
        <Box bg="primary" padding="m" radius="s">
            <Text color="onPrimary">s</Text>
        </Box>
        <Box bg="primary" padding="m" radius="m">
            <Text color="onPrimary">m</Text>
        </Box>
        <Box bg="primary" padding="m" radius="l">
            <Text color="onPrimary">l</Text>
        </Box>
        <Box bg="primary" padding="m" radius="full">
            <Text color="onPrimary">full</Text>
        </Box>
    </Row>
</Demo>

<h2 id="shadow">Box Shadow</h2>

<Demo
    title="Shadow Levels"
    description="Elevation shadows from theme"
    code={`<Row gap="l" wrap>
    <Box bg="bg" padding="l" radius="m" shadow="sm">
        <Text>sm</Text>
    </Box>
    <Box bg="bg" padding="l" radius="m" shadow="md">
        <Text>md</Text>
    </Box>
    <Box bg="bg" padding="l" radius="m" shadow="lg">
        <Text>lg</Text>
    </Box>
    <Box bg="bg" padding="l" radius="m" shadow="xl">
        <Text>xl</Text>
    </Box>
</Row>`}
>
    <Row gap="l" wrap style="padding: 16px;">
        <Box bg="bg" padding="l" radius="m" shadow="sm">
            <Text>sm</Text>
        </Box>
        <Box bg="bg" padding="l" radius="m" shadow="md">
            <Text>md</Text>
        </Box>
        <Box bg="bg" padding="l" radius="m" shadow="lg">
            <Text>lg</Text>
        </Box>
        <Box bg="bg" padding="l" radius="m" shadow="xl">
            <Text>xl</Text>
        </Box>
    </Row>
</Demo>

<h2 id="flex">Flex Layout</h2>

<p>
    Box can act as a flex container with alignment props:
</p>

<Demo
    title="Flex Box"
    description="Using Box as a flex container"
    code={`<Box 
    bg="surface" 
    padding="m" 
    radius="m"
    display="flex"
    direction="row"
    gap="m"
    align="center"
    justify="between"
    style="width: 100%;"
>
    <Text>Left</Text>
    <Text>Center</Text>
    <Text>Right</Text>
</Box>`}
>
    <Box 
        bg="surface" 
        padding="m" 
        radius="m"
        display="flex"
        direction="row"
        gap="m"
        align="center"
        justify="between"
        style="width: 100%;"
    >
        <Text>Left</Text>
        <Text>Center</Text>
        <Text>Right</Text>
    </Box>
</Demo>

<h2 id="custom-styles">Custom Styles</h2>

<p>
    Use the <code>style</code> prop for additional CSS that isn't covered by props:
</p>

<Demo
    title="Custom Styles"
    description="Adding custom CSS via style prop"
    code={`<Box 
    bg="primary" 
    padding="m" 
    radius="m"
    style="border: 3px dashed white; transform: rotate(-2deg);"
>
    <Text color="onPrimary">Custom styled box</Text>
</Box>`}
>
    <Box 
        bg="primary" 
        padding="m" 
        radius="m"
        style="border: 3px dashed white; transform: rotate(-2deg);"
    >
        <Text color="onPrimary">Custom styled box</Text>
    </Box>
</Demo>

<h2 id="props">Props</h2>

<PropTable props={boxProps} />

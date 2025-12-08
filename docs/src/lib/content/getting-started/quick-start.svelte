<script lang="ts">
    import { Text, Box, Row, Column, Card, Button, Input, Icon } from 'lib';
    import { Demo, CodeBlock } from '$lib';
    import CounterDemo from './CounterDemo.svelte';
</script>

<h2 id="your-first-component">Your First Component</h2>

<p>
    Let's build a simple card component to get familiar with Svlendid's API.
</p>

<Demo
    title="Basic Card"
    description="A simple card with text and a button"
    code={`\<script\>
    import { Card, Column, Text, Button } from 'lib';
\</script\>

<Card padding="l">
    <Column gap="m">
        <Text variant="h5">Hello World</Text>
        <Text variant="body2" color="onSurfaceVariant">
            Welcome to Svlendid!
        </Text>
        <Button color="primary">Get Started</Button>
    </Column>
</Card>`}
>
    <Card padding="l">
        <Column gap="m">
            <Text variant="h5">Hello World</Text>
            <Text variant="body2" color="onSurfaceVariant">
                Welcome to Svlendid!
            </Text>
            <Button color="primary">Get Started</Button>
        </Column>
    </Card>
</Demo>

<h2 id="layout-basics">Layout Basics</h2>

<p>
    Svlendid uses <code>Row</code> and <code>Column</code> components for layout, similar to Flutter's 
    flex-based layout system.
</p>

<Demo
    title="Row and Column"
    description="Horizontal and vertical layouts"
    code={`<Column gap="m">
    <Row gap="s">
        <Box bg="primary" padding="m" radius="s">
            <Text color="onPrimary">1</Text>
        </Box>
        <Box bg="secondary" padding="m" radius="s">
            <Text color="onSecondary">2</Text>
        </Box>
        <Box bg="error" padding="m" radius="s">
            <Text color="onError">3</Text>
        </Box>
    </Row>
    <Row gap="s" justify="between">
        <Text>Left</Text>
        <Text>Right</Text>
    </Row>
</Column>`}
>
    <Column gap="m" style="width: 100%;">
        <Row gap="s">
            <Box bg="primary" padding="m" radius="s">
                <Text color="onPrimary">1</Text>
            </Box>
            <Box bg="secondary" padding="m" radius="s">
                <Text color="onSecondary">2</Text>
            </Box>
            <Box bg="error" padding="m" radius="s">
                <Text color="onError">3</Text>
            </Box>
        </Row>
        <Row gap="s" justify="between">
            <Text>Left</Text>
            <Text>Right</Text>
        </Row>
    </Column>
</Demo>

<h2 id="theming">Theming</h2>

<p>
    Colors, spacing, and other design tokens come from the theme. You reference them by name:
</p>

<Demo
    title="Theme Colors"
    description="Using theme color tokens"
    code={`<Row gap="s" wrap>
    <Box bg="primary" padding="m" radius="m">
        <Text color="onPrimary">Primary</Text>
    </Box>
    <Box bg="secondary" padding="m" radius="m">
        <Text color="onSecondary">Secondary</Text>
    </Box>
    <Box bg="error" padding="m" radius="m">
        <Text color="onError">Error</Text>
    </Box>
    <Box bg="surface" padding="m" radius="m">
        <Text color="onSurface">Surface</Text>
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
        <Box bg="error" padding="m" radius="m">
            <Text color="onError">Error</Text>
        </Box>
        <Box bg="surface" padding="m" radius="m">
            <Text color="onSurface">Surface</Text>
        </Box>
    </Row>
</Demo>

<h2 id="interactive-example">Interactive Example</h2>

<p>
    Here's a more complete example with state:
</p>

<Demo
    title="Counter Card"
    description="Interactive card with state"
    code={`\<script\>
    import { Card, Column, Row, Text, Button, Icon } from 'lib';
    
    let count = $state(0);
\</script>

<Card padding="l" variant="elevated">
    <Column gap="m" align="center">
        <Text variant="h2">{count}</Text>
        <Row gap="s">
            <Button 
                color="error" 
                onclick={() => count--}
            >
                <Icon name="Minus" size={18} />
            </Button>
            <Button 
                color="primary" 
                onclick={() => count++}
            >
                <Icon name="Plus" size={18} />
            </Button>
        </Row>
    </Column>
</Card>`}
>
    <CounterDemo />
</Demo>

<h2 id="next-steps">Next Steps</h2>

<p>
    Now that you understand the basics, explore the documentation to learn more:
</p>

<ul>
    <li><a href="/docs/config/theme-provider">Theme Configuration</a> - Customize your theme</li>
    <li><a href="/docs/base/button">Components</a> - Browse all components</li>
    <li><a href="/docs/layout/box">Layout</a> - Learn about layout components</li>
</ul>

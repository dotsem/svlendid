<script lang="ts">
    import { Text, Box, Row, Column, Card, Icon, Button } from 'lib';
    import { Demo, CodeBlock } from '$lib';
</script>

<h2 id="what-is-svlendid">What is Svlendid?</h2>

<p>
    Svlendid is a Flutter-inspired component library for Svelte 5. It provides a comprehensive set of 
    components and utilities to build beautiful, consistent user interfaces with a declarative API.
</p>

<h2 id="philosophy">Philosophy</h2>

<p>
    Svlendid takes inspiration from Flutter's widget system, bringing similar concepts to the Svelte ecosystem:
</p>

<ul>
    <li><strong>Composition over configuration</strong> - Build complex UIs by composing simple primitives</li>
    <li><strong>Declarative styling</strong> - Use props instead of CSS classes for styling</li>
    <li><strong>Theme-driven design</strong> - Consistent design tokens across your entire application</li>
    <li><strong>Type-safe</strong> - Full TypeScript support with excellent autocompletion</li>
</ul>

<h2 id="key-features">Key Features</h2>

<Row gap="m" wrap style="margin: 24px 0;">
    <Card variant="outlined" padding="m" style="flex: 1; min-width: 200px;">
        <Column gap="s">
            <Icon name="Palette" size={24} color="primary" />
            <Text variant="h6">Theming</Text>
            <Text variant="body2" color="onSurfaceVariant">
                Comprehensive theme system with colors, spacing, typography, and more.
            </Text>
        </Column>
    </Card>
    <Card variant="outlined" padding="m" style="flex: 1; min-width: 200px;">
        <Column gap="s">
            <Icon name="Layout" size={24} color="primary" />
            <Text variant="h6">Layout</Text>
            <Text variant="body2" color="onSurfaceVariant">
                Flutter-style layout components like Box, Row, Column, Stack.
            </Text>
        </Column>
    </Card>
    <Card variant="outlined" padding="m" style="flex: 1; min-width: 200px;">
        <Column gap="s">
            <Icon name="Layers" size={24} color="primary" />
            <Text variant="h6">Primitives</Text>
            <Text variant="body2" color="onSurfaceVariant">
                Low-level building blocks for interactions and behaviors.
            </Text>
        </Column>
    </Card>
</Row>

<h2 id="quick-example">Quick Example</h2>

<Demo 
    title="Hello Svlendid"
    description="A simple example showing themed components"
    code={`<ThemeProvider>
    <Card padding="l">
        <Column gap="m">
            <Text variant="h4">Welcome!</Text>
            <Text variant="body1" color="onSurfaceVariant">
                Get started with Svlendid
            </Text>
            <Button color="primary">Learn More</Button>
        </Column>
    </Card>
</ThemeProvider>`}
>
    <Card padding="l" style="width: 100%; max-width: 300px;">
        <Column gap="m">
            <Text variant="h4">Welcome!</Text>
            <Text variant="body1" color="onSurfaceVariant">
                Get started with Svlendid
            </Text>
            <Button color="primary">Learn More</Button>
        </Column>
    </Card>
</Demo>

<h2 id="svelte-5">Built for Svelte 5</h2>

<p>
    Svlendid is built from the ground up for Svelte 5, taking full advantage of the new features:
</p>

<ul>
    <li><strong>Runes</strong> - Components use <code>$props()</code>, <code>$state()</code>, and <code>$derived()</code></li>
    <li><strong>Snippets</strong> - Flexible content slots using the snippet syntax</li>
    <li><strong>Fine-grained reactivity</strong> - Efficient updates with Svelte 5's reactivity system</li>
</ul>

<h2 id="next-steps">Next Steps</h2>

<p>Ready to get started? Head to the <a href="/docs/getting-started/installation">Installation</a> guide.</p>

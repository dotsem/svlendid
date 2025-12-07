# Svlendid

A Flutter-inspired component library for Svelte 5. Build modern web apps with declarative styling where components and their appearance are tightly coupled — just like in Flutter.

## Philosophy

Svlendid takes inspiration from Flutter's approach to UI:

- **Declarative styling**: Props define appearance, not CSS classes
- **Composable primitives**: Build complex UIs from simple building blocks
- **Theme-driven**: Consistent design tokens throughout your app
- **Developer-first**: Easy to use, easy to customize

## Installation

```bash
pnpm add svlendid
# or
npm install svlendid
```

## Quick Start

### 1. Set up the Theme Provider

Wrap your app with `ThemeProvider` to enable theming:

```svelte
<!-- +layout.svelte -->
<script>
    import { ThemeProvider } from 'svlendid';
</script>

<ThemeProvider>
    <slot />
</ThemeProvider>
```

### 2. Customize your theme (optional)

```svelte
<script>
    import { ThemeProvider, type ThemeConfig } from 'svlendid';

    const myTheme: ThemeConfig = {
        colors: {
            primary: "#6366f1",
            secondary: "#22c55e",
        },
        spacing: {
            m: "20px", // Override medium spacing
        }
    };
</script>

<ThemeProvider config={myTheme}>
    <slot />
</ThemeProvider>
```

### 3. Use components

```svelte
<script>
    import { Button, Text, Stack, Row, Box, Card } from 'svlendid';
</script>

<Stack gap="m">
    <Text variant="h1" color="primary">Welcome to Svlendid</Text>
    
    <Row gap="s">
        <Button color="primary">Primary</Button>
        <Button variant="outlined" color="secondary">Secondary</Button>
        <Button variant="text">Text Button</Button>
    </Row>
    
    <Card variant="elevated" padding="l">
        <Text>Card content with elevation</Text>
    </Card>
</Stack>
```

## Components

### Base Components

| Component | Description |
|-----------|-------------|
| `Button` | Multi-variant button with filled, tonal, outlined, and text styles |
| `Text` | Typography component with theme-aware variants |
| `Card` | Surface container with elevation variants |
| `ThemeProvider` | Provides theme context to children |

### Layout Components

| Component | Description |
|-----------|-------------|
| `Box` | Flexible container (like Flutter's Container) |
| `Flex` | Flexbox layout container |
| `Stack` | Vertical flex layout (like Flutter's Column) |
| `Row` | Horizontal flex layout (like Flutter's Row) |
| `Center` | Centers its children |
| `Spacer` | Creates space in flex layouts |
| `Container` | Responsive max-width container |

### Primitive Components

| Component | Description |
|-----------|-------------|
| `Clickable` | Handles click, double-click, right-click, and long press |
| `Hoverable` | Tracks hover state and exposes it to children |
| `Draggable` | Makes content draggable |
| `Followable` | Element that follows the cursor |
| `Keyboard` | Handles keyboard shortcuts |

## Theme System

The theme includes:

- **Colors**: Primary, secondary, error, success, warning, info, surfaces, and more
- **Spacing**: none, xs, s, m, l, xl, 2xl, 3xl
- **Radius**: none, xs, s, m, l, xl, 2xl, full
- **Typography**: h1-h6, body1, body2, subtitle1, subtitle2, caption, overline
- **Shadows**: none, s, m, l
- **Transitions**: instant, fast, normal, slow

### Accessing Theme Values

```svelte
<script>
    import { getTheme, useColors, useSpacing } from 'svlendid';
    
    const theme = getTheme();
    const colors = useColors();
    const spacing = useSpacing();
    
    // Use values
    const primaryColor = colors.primary;
    const mediumSpacing = spacing.m;
</script>
```

## Examples

### Interactive Hover Effect

```svelte
<Hoverable>
    {#snippet children({ isHovered })}
        <Box 
            bg={isHovered ? "primary" : "surface"} 
            padding="m" 
            radius="m"
        >
            <Text color={isHovered ? "onPrimary" : "onSurface"}>
                Hover me!
            </Text>
        </Box>
    {/snippet}
</Hoverable>
```

### Keyboard Shortcuts

```svelte
<Keyboard 
    global 
    shortcuts={{
        "ctrl+s": (e) => { e.preventDefault(); save(); },
        "escape": () => closeModal(),
    }}
/>
```

### Draggable Element

```svelte
<Draggable ondragend={({ deltaX, deltaY }) => updatePosition(deltaX, deltaY)}>
    <Box bg="primary" padding="m" radius="m">
        <Text color="onPrimary">Drag me!</Text>
    </Box>
</Draggable>
```

## License

MIT

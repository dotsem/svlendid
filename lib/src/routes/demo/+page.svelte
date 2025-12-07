<script lang="ts">
    import { resolve } from '$app/paths';
    import { 
        ThemeProvider, 
        Button, 
        Text, 
        Box, 
        Stack, 
        Column,
        Row, 
        Center, 
        Spacer,
        Expanded,
        Clickable,
        Hoverable,
        Draggable,
        Followable,
        Keyboard,
        Visible,
        Card,
        Input,
        Divider,
        Ripple,
        Badge,
        Icon,
        type ThemeConfig,
        type ClickEffect,
        lighten,
        darken,
    } from '$lib/index.js';

    // Custom theme example - only override what you need
    const customTheme: ThemeConfig = {
        colors: {
            primary: "#6366f1", // Indigo instead of orange
            onPrimary: "#ffffff",
            primaryContainer: "#e0e7ff",
            onPrimaryContainer: "#3730a3",
        },
        clickEffect: "scale", // Can be "scale" | "ripple" | "lift" | "none"
    };

    let clickCount = $state(0);
    let isLoading = $state(false);
    let inputValue = $state("");
    let inputError = $state("");
    let dragPosition = $state({ x: 0, y: 0 });
    let lastKey = $state("");
    let singleClickCount = $state(0);
    let doubleClickCount = $state(0);

    function handleLoadingClick() {
        isLoading = true;
        setTimeout(() => isLoading = false, 2000);
    }

    function validateInput() {
        if (inputValue.length < 3) {
            inputError = "Must be at least 3 characters";
        } else {
            inputError = "";
        }
    }
</script>

<ThemeProvider config={customTheme}>
    <Box padding="l" bg="bg">
        <Column gap="xl">
            <!-- Header -->
            <Text variant="h1" color="primary">Svlendid Demo</Text>
            <Text variant="body1" color="onBg">
                A Flutter-inspired component library for Svelte 5
            </Text>

            <!-- Icons -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Icons (Lucide)</Text>
                <Row gap="m" align="center">
                    <Icon name="Home" size={24} color="primary" />
                    <Icon name="Settings" size={24} color="secondary" />
                    <Icon name="Heart" size={24} color="error" />
                    <Icon name="Star" size={24} color="warning" />
                    <Icon name="Check" size={24} color="success" />
                    <Icon name="Info" size={24} color="info" />
                </Row>
            </Column>

            <!-- Button Variants -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Button Variants</Text>
                <Row gap="m" wrap>
                    <Button variant="filled" color="primary">Filled</Button>
                    <Button variant="tonal" color="primary">Tonal</Button>
                    <Button variant="outlined" color="primary">Outlined</Button>
                    <Button variant="text" color="primary">Text</Button>
                </Row>
            </Column>

            <!-- Button with Icons -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Buttons with Icons</Text>
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
            </Column>

            <!-- Button Colors -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Button Colors</Text>
                <Row gap="m" wrap>
                    <Button color="primary">Primary</Button>
                    <Button color="secondary">Secondary</Button>
                    <Button color="error">Error</Button>
                    <Button color="success">Success</Button>
                    <Button color="warning">Warning</Button>
                    <Button color="info">Info</Button>
                </Row>
            </Column>

            <!-- Button Sizes -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Button Sizes</Text>
                <Row gap="m" align="center">
                    <Button size="s">Small</Button>
                    <Button size="m">Medium</Button>
                    <Button size="l">Large</Button>
                </Row>
            </Column>

            <!-- Button States -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Button States</Text>
                <Row gap="m" align="center">
                    <Button disabled>Disabled</Button>
                    <Button elevated>Elevated</Button>
                    <Button loading={isLoading} onclick={handleLoadingClick}>
                        {isLoading ? 'Loading...' : 'Click to Load'}
                    </Button>
                    <Button onclick={() => clickCount++}>
                        Clicked {clickCount} times
                    </Button>
                </Row>
            </Column>

            <Divider margin="m" />

            <!-- Typography -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Typography</Text>
                <Box bg="surface" padding="m" radius="m">
                    <Column gap="s">
                        <Text variant="h1">Heading 1</Text>
                        <Text variant="h2">Heading 2</Text>
                        <Text variant="h3">Heading 3</Text>
                        <Text variant="h4">Heading 4</Text>
                        <Text variant="h5">Heading 5</Text>
                        <Text variant="h6">Heading 6</Text>
                        <Text variant="body1">Body 1 - Regular paragraph text</Text>
                        <Text variant="body2">Body 2 - Smaller paragraph text</Text>
                        <Text variant="caption">Caption text</Text>
                        <Text variant="overline">OVERLINE TEXT</Text>
                    </Column>
                </Box>
            </Column>

            <Divider margin="m" />

            <!-- Badge Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Badge</Text>
                <Row gap="l" align="center">
                    <Badge content={5}>
                        <Box bg="surface" padding="m" radius="m">
                            <Icon name="Bell" size={24} />
                        </Box>
                    </Badge>
                    <Badge content={99} max={99}>
                        <Box bg="surface" padding="m" radius="m">
                            <Icon name="Mail" size={24} />
                        </Box>
                    </Badge>
                    <Badge content={150} max={99}>
                        <Box bg="surface" padding="m" radius="m">
                            <Icon name="MessageSquare" size={24} />
                        </Box>
                    </Badge>
                    <Badge dot color="success">
                        <Box bg="surface" padding="m" radius="m">
                            <Icon name="User" size={24} />
                        </Box>
                    </Badge>
                </Row>
            </Column>

            <Divider margin="m" />

            <!-- Hoverable Primitive Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Hoverable Primitive</Text>
                <Hoverable>
                    {#snippet children({ isHovered })}
                        <Box 
                            bg={isHovered ? "primary" : "surface"} 
                            padding="m" 
                            radius="m"
                            style="transition: all 0.2s ease;"
                        >
                            <Text color={isHovered ? "onPrimary" : "onSurface"}>
                                {isHovered ? "Hovering!" : "Hover over me"}
                            </Text>
                        </Box>
                    {/snippet}
                </Hoverable>
            </Column>

            <!-- Clickable Primitive Demo (with fixed double-click) -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Clickable Primitive</Text>
                <Text variant="body2" color="onSurfaceVariant">Single and double-click are now properly distinguished!</Text>
                <Row gap="m">
                    <Clickable 
                        onclick={() => singleClickCount++}
                        ondoubleclick={() => doubleClickCount++}
                        oncontextmenu={() => alert('Right click!')}
                    >
                        <Box bg="secondaryContainer" padding="m" radius="m">
                            <Column gap="xs">
                                <Text color="onSecondaryContainer">
                                    Click, double-click, or right-click me!
                                </Text>
                                <Text variant="caption" color="onSecondaryContainer">
                                    Single: {singleClickCount} | Double: {doubleClickCount}
                                </Text>
                            </Column>
                        </Box>
                    </Clickable>
                </Row>
            </Column>

            <!-- Draggable Primitive Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Draggable Primitive</Text>
                <Text variant="body2" color="onSurfaceVariant">Drag the box around!</Text>
                <Box bg="surface" padding="l" radius="m" style="height: 150px; position: relative;">
                    <Draggable
                        ondrag={(data) => { dragPosition = { x: data.deltaX, y: data.deltaY }; }}
                        ondragend={() => { dragPosition = { x: 0, y: 0 }; }}
                    >
                        <Box 
                            bg="primary" 
                            padding="m" 
                            radius="m"
                            style="transform: translate({dragPosition.x}px, {dragPosition.y}px); transition: transform 0.1s ease;"
                        >
                            <Text color="onPrimary">Drag me!</Text>
                        </Box>
                    </Draggable>
                </Box>
            </Column>

            <!-- Keyboard Primitive Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Keyboard Primitive</Text>
                <Text variant="body2" color="onSurfaceVariant">Focus the box and press keys (try Ctrl+S, Escape)</Text>
                <Keyboard
					preventDefault={true}
					focusable={true}
                    shortcuts={{
                        "ctrl+s": (e) => { lastKey = "Ctrl+S (Save)"; },
                        "escape": () => { lastKey = "Escape"; },
                        "enter": () => { lastKey = "Enter"; },
                    }}
                    onkeydown={(e) => { if (!e.ctrlKey && !e.metaKey) lastKey = e.key; }}
                >
                    <Box bg="surface" padding="m" radius="m" style="outline: 2px dashed var(--color-outline, #888);">
                        <Column gap="s" align="center">
                            <Text color="onSurface">Click here and press a key</Text>
                            <Text variant="h4" color="primary">{lastKey || "..."}</Text>
                        </Column>
                    </Box>
                </Keyboard>
            </Column>

            <!-- Followable Primitive Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Followable Primitive</Text>
                <Text variant="body2" color="onSurfaceVariant">Move your mouse over the area</Text>
                <Followable offset={{ x: 15, y: 15 }}>
                    {#snippet children({ x, y, isActive })}
                        <Box bg="surface" padding="l" radius="m" style="height: 150px; cursor: crosshair;">
                            <Text color="onSurface">Move mouse here</Text>
                        </Box>
                        {#if isActive}
                            <div style="position: fixed; left: {x}px; top: {y}px; pointer-events: none; z-index: 1000;">
                                <Box bg="primary" padding="s" radius="s">
                                    <Text variant="caption" color="onPrimary">Following!</Text>
                                </Box>
                            </div>
                        {/if}
                    {/snippet}
                </Followable>
            </Column>

            <!-- Visible Primitive Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Visible Primitive</Text>
                <Text variant="body2" color="onSurfaceVariant">Scroll to see visibility detection</Text>
                <Visible threshold={0.5}>
                    {#snippet children({ isVisible, ratio })}
                        <Box 
                            bg={isVisible ? "successContainer" : "surface"} 
                            padding="l" 
                            radius="m"
                            style="transition: all 0.3s ease;"
                        >
                            <Column gap="s">
                                <Text color={isVisible ? "onSuccessContainer" : "onSurface"}>
                                    {isVisible ? "✓ Visible!" : "Not visible"}
                                </Text>
                                <Text variant="caption" color={isVisible ? "onSuccessContainer" : "onSurfaceVariant"}>
                                    Intersection ratio: {(ratio * 100).toFixed(0)}%
                                </Text>
                            </Column>
                        </Box>
                    {/snippet}
                </Visible>
            </Column>

            <Divider margin="m" />

            <!-- Layout: Column vs Stack -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Column vs Stack</Text>
                <Row gap="m" wrap>
                    <Column gap="s">
                        <Text variant="h5" color="onBg">Column (vertical flex)</Text>
                        <Box bg="surface" padding="m" radius="m" style="width: 200px;">
                            <Column gap="s">
                                <Box bg="primaryContainer" padding="s" radius="s">
                                    <Text color="onPrimaryContainer">Item 1</Text>
                                </Box>
                                <Box bg="primaryContainer" padding="s" radius="s">
                                    <Text color="onPrimaryContainer">Item 2</Text>
                                </Box>
                                <Box bg="primaryContainer" padding="s" radius="s">
                                    <Text color="onPrimaryContainer">Item 3</Text>
                                </Box>
                            </Column>
                        </Box>
                    </Column>
                    <Column gap="s">
                        <Text variant="h5" color="onBg">Stack (z-axis overlap)</Text>
                        <Stack width="200px" height="120px">
                            <Box bg="error" padding="m" radius="m" style="width: 100%; height: 100%;">
                                <Text color="onError">Background</Text>
                            </Box>
                            <Box bg="primaryContainer" padding="s" radius="s" style="margin: 20px;">
                                <Text color="onPrimaryContainer">Overlay</Text>
                            </Box>
                        </Stack>
                    </Column>
                </Row>
            </Column>

            <!-- Layout: Expanded -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Expanded Component</Text>
                <Box bg="surface" padding="m" radius="m" style="height: 80px;">
                    <Row gap="m" style="height: 100%;">
                        <Box bg="primaryContainer" padding="s" radius="s">
                            <Text color="onPrimaryContainer">Fixed</Text>
                        </Box>
                        <Expanded>
                            <Box bg="secondaryContainer" padding="s" radius="s" style="width: 100%; height: 100%;">
                                <Text color="onSecondaryContainer">Expanded (flex-grow)</Text>
                            </Box>
                        </Expanded>
                        <Box bg="primaryContainer" padding="s" radius="s">
                            <Text color="onPrimaryContainer">Fixed</Text>
                        </Box>
                    </Row>
                </Box>
            </Column>

            <!-- Layout Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Layout Components</Text>
                <Box bg="surface" padding="m" radius="m">
                    <Row gap="m" justify="between" align="center">
                        <Text>Left</Text>
                        <Spacer flex={1} />
                        <Text>Center (with spacers)</Text>
                        <Spacer flex={1} />
                        <Text>Right</Text>
                    </Row>
                </Box>
                <Center height="100px">
                    <Box bg="primaryContainer" padding="m" radius="m">
                        <Text color="onPrimaryContainer">Centered content</Text>
                    </Box>
                </Center>
            </Column>

            <Divider margin="m" />

            <!-- Color Utilities Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Color Utilities</Text>
                <Text variant="body2" color="onSurfaceVariant">SCSS-like color manipulation functions</Text>
                <Row gap="s" wrap>
                    <Box padding="m" radius="m" style="background: {darken('#6366f1', 20)};">
                        <Text style="color: white;">darken 20%</Text>
                    </Box>
                    <Box padding="m" radius="m" style="background: #6366f1;">
                        <Text style="color: white;">Original</Text>
                    </Box>
                    <Box padding="m" radius="m" style="background: {lighten('#6366f1', 20)};">
                        <Text style="color: #333;">lighten 20%</Text>
                    </Box>
                </Row>
            </Column>

            <Divider margin="m" />

            <!-- Card Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Cards</Text>
                <Row gap="m" wrap>
                    <Card variant="elevated" padding="l" width="200px">
                        <Column gap="s">
                            <Text variant="h5">Elevated Card</Text>
                            <Text variant="body2" color="onSurfaceVariant">With shadow elevation</Text>
                        </Column>
                    </Card>
                    <Card variant="filled" padding="l" width="200px">
                        <Column gap="s">
                            <Text variant="h5">Filled Card</Text>
                            <Text variant="body2" color="onSurfaceVariant">Solid background</Text>
                        </Column>
                    </Card>
                    <Card variant="outlined" padding="l" width="200px">
                        <Column gap="s">
                            <Text variant="h5">Outlined Card</Text>
                            <Text variant="body2" color="onSurfaceVariant">Border only</Text>
                        </Column>
                    </Card>
                    <Card variant="elevated" padding="l" width="200px" clickable onclick={() => alert('Card clicked!')}>
                        <Column gap="s">
                            <Text variant="h5">Clickable Card</Text>
                            <Text variant="body2" color="onSurfaceVariant">Click me!</Text>
                        </Column>
                    </Card>
                </Row>
            </Column>

            <Divider margin="m" />

            <!-- Input Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Input Fields</Text>
                <Row gap="m" wrap align="start">
                    <Input 
                        label="Outlined Input" 
                        placeholder="Type here..."
                        variant="outlined"
                        bind:value={inputValue}
                        onblur={validateInput}
                        error={inputError}
                        helper="Minimum 3 characters"
                    />
                    <Input 
                        label="Filled Input" 
                        placeholder="Type here..."
                        variant="filled"
                    />
                    <Input 
                        label="Underlined Input" 
                        placeholder="Type here..."
                        variant="underlined"
                    />
                    <Input 
                        label="Disabled Input" 
                        placeholder="Can't type here"
                        disabled
                    />
                </Row>
            </Column>

            <Divider margin="m" />

            <!-- Ripple Effect Demo -->
            <Column gap="m">
                <Text variant="h3" color="onBg">Ripple Effect</Text>
                <Text variant="body2" color="onSurfaceVariant">Now properly inherits border-radius!</Text>
                <Row gap="m">
                    <Ripple radius="m">
                        <Box bg="surface" padding="l" radius="m">
                            <Text>Click for ripple effect!</Text>
                        </Box>
                    </Ripple>
                    <Ripple color="primary" center radius="full">
                        <Box bg="primaryContainer" padding="l" radius="full">
                            <Text color="onPrimaryContainer">Centered ripple</Text>
                        </Box>
                    </Ripple>
                </Row>
            </Column>

            <Divider margin="l" />
            
            <a href={resolve('/demo/paraglide')}>Paraglide Demo</a>
        </Column>
    </Box>
</ThemeProvider>

<script lang="ts">
    import { Text, Column, Row, Card, Box, Icon, Button } from 'lib';
    import { navigation } from '$lib/data/navigation';
</script>

<svelte:head>
    <title>Svlendid Documentation</title>
</svelte:head>

<div class="docs-home">
    <header class="hero">
        <Text variant="h1" color="primary">Svlendid</Text>
        <Text variant="h4" color="onSurfaceVariant">
            A Flutter-inspired component library for Svelte 5
        </Text>
        <Row gap="m" style="margin-top: 24px;">
            <a href="/docs/getting-started/introduction">
                <Button color="primary">Get Started</Button>
            </a>
            <a href="https://github.com/your-repo/svlendid" target="_blank">
                <Button variant="outlined" color="primary">
                    {#snippet leadingIcon()}<Icon name="Github" size={18} />{/snippet}
                    GitHub
                </Button>
            </a>
        </Row>
    </header>

    <section class="features">
        <Text variant="h3" color="onBg" style="margin-bottom: 24px;">Features</Text>
        <Row gap="m" wrap>
            <Card variant="outlined" padding="l" style="flex: 1; min-width: 280px;">
                <Column gap="s">
                    <Icon name="Palette" size={32} color="primary" />
                    <Text variant="h5">Declarative Theming</Text>
                    <Text variant="body2" color="onSurfaceVariant">
                        Comprehensive theme system with colors, spacing, typography, and more.
                    </Text>
                </Column>
            </Card>
            <Card variant="outlined" padding="l" style="flex: 1; min-width: 280px;">
                <Column gap="s">
                    <Icon name="Layers" size={32} color="primary" />
                    <Text variant="h5">Composable Primitives</Text>
                    <Text variant="body2" color="onSurfaceVariant">
                        Build complex interactions with simple, composable primitive components.
                    </Text>
                </Column>
            </Card>
            <Card variant="outlined" padding="l" style="flex: 1; min-width: 280px;">
                <Column gap="s">
                    <Icon name="Sparkles" size={32} color="primary" />
                    <Text variant="h5">Svelte 5 Ready</Text>
                    <Text variant="body2" color="onSurfaceVariant">
                        Built from the ground up for Svelte 5 with runes and snippets.
                    </Text>
                </Column>
            </Card>
        </Row>
    </section>

    <section class="categories">
        <Text variant="h3" color="onBg" style="margin-bottom: 24px;">Explore</Text>
        <div class="category-grid">
            {#each navigation as category}
                <a href="/docs/{category.slug}/{category.items[0]?.slug}" class="category-card">
                    <Row align="center" gap="m">
                        {#if category.icon}
                            <Icon name={category.icon} size={24} color="primary" />
                        {/if}
                        <Column gap="xs">
                            <Text variant="h6" color="onSurface">{category.title}</Text>
                            <Text variant="caption" color="onSurfaceVariant">
                                {category.items.length} items
                            </Text>
                        </Column>
                    </Row>
                </a>
            {/each}
        </div>
    </section>
</div>

<style>
    .docs-home {
        max-width: 1000px;
        margin: 0 auto;
        padding: 60px 24px;
    }

    .hero {
        text-align: center;
        padding: 60px 0;
    }

    .hero :global(h4) {
        margin-top: 16px;
    }

    .features {
        margin-top: 60px;
    }

    .categories {
        margin-top: 60px;
    }

    .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
        gap: 16px;
    }

    .category-card {
        display: block;
        padding: 20px;
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 12px;
        text-decoration: none;
        transition: all 0.2s ease;
    }

    .category-card:hover {
        border-color: var(--color-primary, #6366f1);
        background: var(--color-primaryContainer, #e0e7ff);
    }
</style>

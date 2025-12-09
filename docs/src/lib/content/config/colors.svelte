<script lang="ts">
    import { Box, Text, Flex, Stack, Column, Icon } from "lib";
    import { defaultLightTheme, defaultDarkTheme, readableColor } from "lib";

    // Helper to group colors for display
    const groups = [
        {
            name: "Brand",
            keys: [
                "primary",
                "onPrimary",
                "primaryContainer",
                "onPrimaryContainer",
            ],
        },
        {
            name: "Secondary",
            keys: [
                "secondary",
                "onSecondary",
                "secondaryContainer",
                "onSecondaryContainer",
            ],
        },
        {
            name: "Tertiary",
            keys: [
                "tertiary",
                "onTertiary",
                "tertiaryContainer",
                "onTertiaryContainer",
            ],
        },
        {
            name: "Surface",
            keys: [
                "surface",
                "onSurface",
                "surfaceVariant",
                "onSurfaceVariant",
                "surfaceContainer",
            ],
        },
        {
            name: "Background",
            keys: ["background", "onBg", "outline", "outlineVariant"],
        },
        {
            name: "Status",
            keys: [
                "error",
                "onError",
                "errorContainer",
                "onErrorContainer",
                "success",
                "onSuccess",
                "info",
                "warning",
            ],
        },
    ];

    function copyToClipboard(text: string) {
        navigator.clipboard.writeText(text);
    }
</script>

<h2 id="overview">Overview</h2>
<p>
    The color system is based on Material Design 3 principles. It uses a set of
    tonal palettes to create a color scheme that is accessible and harmonious.
</p>

<h2 id="palette">Color Palette</h2>

<Column gap="xl">
    {#each groups as group}
        <Box>
            <Text variant="h4" margin="0 0 m 0">{group.name}</Text>
            <div class="grid">
                {#each group.keys as key}
                    {@const colorValue = (defaultLightTheme as any)[key]}
                    {#if colorValue}
                        <Box
                            class="swatch-card"
                            radius="m"
                            shadow="s"
                            bg="surfaceContainer"
                        >
                            <Box
                                height="80px"
                                width="100%"
                                style="background-color: {colorValue}; position: relative;"
                                radius="m m none none"
                            >
                                <button
                                    class="copy-btn"
                                    onclick={() => copyToClipboard(colorValue)}
                                    style="color: {readableColor(colorValue)}"
                                    title="Copy hex code"
                                >
                                    <Icon name="Copy" size="24px" />
                                </button>
                            </Box>
                            <Box padding="m">
                                <Text variant="subtitle2" weight="bold"
                                    >{key}</Text
                                >
                                <Text variant="caption" color="outline"
                                    >{colorValue}</Text
                                >
                            </Box>
                        </Box>
                    {/if}
                {/each}
            </div>
        </Box>
    {/each}
</Column>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 16px;
    }

    :global(.swatch-card) {
        overflow: hidden;
    }

    .copy-btn {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        transition: opacity 0.2s;
        background: none;
        border: none;
        cursor: pointer;
        padding: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    :global(.swatch-card:hover .copy-btn) {
        opacity: 1;
    }
</style>

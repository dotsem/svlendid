<script lang="ts">
    import { Box, Text, Flex } from "lib";
    import { defaultRadius } from "lib";

    const radii = Object.entries(defaultRadius);
</script>

<h2 id="overview">Overview</h2>
<p>
    Border radius tokens shape the corners of UI elements. Using consistent
    radius values creates a unified look.
</p>

<h2 id="values">Radius Values</h2>

<div class="grid">
    {#each radii as [key, value]}
        <Box
            class="card"
            padding="l"
            bg="surfaceContainer"
            style="border-radius: {value}"
        >
            <Text variant="subtitle1" weight="bold">{key}</Text>
            <Text variant="body2">{value}</Text>
        </Box>
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
        gap: 24px;
    }

    :global(.card) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
        border: 2px solid var(--color-primary);
    }
</style>

<script lang="ts">
    import { Box, Text, Flex } from "lib";
    import { defaultBoxShadow } from "lib";

    const shadows = Object.entries(defaultBoxShadow);
</script>

<h2 id="overview">Overview</h2>
<p>
    Elevation involves the use of shadows to create depth and hierarchy.
    Surfaces with higher elevation appear closer to the user.
</p>

<h2 id="levels">Elevation Levels</h2>

<div class="grid">
    {#each shadows as [key, value]}
        {#if key !== "none"}
            <Box
                class="card"
                padding="l"
                bg="surface"
                style="box-shadow: {value}"
                radius="m"
            >
                <Text variant="subtitle1" weight="bold">{key}</Text>
            </Box>
        {/if}
    {/each}
</div>

<style>
    .grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 32px;
        padding: 16px;
    }

    :global(.card) {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        aspect-ratio: 1;
    }
</style>

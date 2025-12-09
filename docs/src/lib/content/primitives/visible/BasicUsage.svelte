<script lang="ts">
    import { Visible, Box, Text } from "lib";
</script>

<div
    style="height: 300px; overflow-y: scroll; border: 1px solid var(--outline-variant); border-radius: 8px; position: relative;"
>
    <div style="height: 15px;"></div>
    <div style="text-align: center; margin-bottom: 300px;">
        <Text color="secondary">Scroll down ↓</Text>
    </div>

    <Visible threshold={0.5}>
        {#snippet children({ isVisible })}
            <Box
                bg={isVisible ? "primaryContainer" : "surfaceVariant"}
                padding="l"
                radius="m"
                style="margin: 20px; transition: background-color 0.3s;"
            >
                <Text align="center" variant="h5">
                    {isVisible ? "I am Visible!" : "I am Hidden"}
                </Text>
            </Box>
        {/snippet}
    </Visible>

    <div style="height: 300px;"></div>
</div>

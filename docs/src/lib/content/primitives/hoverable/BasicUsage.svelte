<script lang="ts">
    import { Hoverable, Box, Text } from "lib";
</script>

<Hoverable>
    {#snippet children({ isHovered })}
        <Box
            bg={isHovered ? "primaryContainer" : "surfaceVariant"}
            padding="m"
            radius="s"
            style="transition: background-color 0.2s"
        >
            <Text>
                {isHovered ? "I am being hovered!" : "Hover me"}
            </Text>
        </Box>
    {/snippet}
</Hoverable>

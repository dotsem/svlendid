<script lang="ts">
    import { Clickable, Box, Text } from "lib";

    let count = $state(0);
</script>

<Clickable onclick={() => count++}>
    <Box
        bg="primaryContainer"
        padding="m"
        radius="s"
        style="display: inline-block"
    >
        <Text>Clicks: {count}</Text>
    </Box>
</Clickable>

<script lang="ts">
    import { Keyboard, Box, Text } from "lib";

    let keyPressed = $state("Type something...");
</script>

<Keyboard focusable onkeydown={(e) => (keyPressed = e.key)}>
    <Box
        bg="surfaceVariant"
        padding="m"
        radius="s"
        style="outline: 2px dashed var(--outline); cursor: text;"
    >
        <Text>Click to focus, then type.</Text>
        <Text variant="h5" style="margin-top: 8px;">Key: {keyPressed}</Text>
    </Box>
</Keyboard>

<script lang="ts">
    import { TextArea, Column, Text } from "lib";

    let message = $state("");
</script>

<Column gap="m" style="max-width: 400px;">
    <TextArea
        bind:value={message}
        placeholder="Type something..."
        autoResize
        maxHeight="200px"
    />
    <Text variant="body1">
        Character count: <strong>{message.length}</strong>
    </Text>
</Column>

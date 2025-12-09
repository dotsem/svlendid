<script lang="ts">
    import { Spacer, Row, Box, Text } from "lib";

    // Helper component
    const Item = Box;
</script>

<Row>
    <Item bg="primaryContainer" padding="m" radius="s">
        <Text>Item 1</Text>
    </Item>
    <Spacer flex={1} />
    <Item bg="secondaryContainer" padding="m" radius="s">
        <Text>Item 2 (Pushed to end)</Text>
    </Item>
</Row>

<script lang="ts">
    import { Flex, Box, Text } from "lib";

    // Helper component for visualization
    const Item = Box;
</script>

<Flex gap="m">
    <Item bg="primaryContainer" padding="m" radius="s">
        <Text>Item 1</Text>
    </Item>
    <Item bg="primaryContainer" padding="m" radius="s">
        <Text>Item 2</Text>
    </Item>
    <Item bg="primaryContainer" padding="m" radius="s">
        <Text>Item 3</Text>
    </Item>
</Flex>

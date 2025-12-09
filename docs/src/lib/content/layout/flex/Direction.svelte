<script lang="ts">
    import { Flex, Box, Text } from "lib";
</script>

<Flex direction="column" gap="m">
    <Flex direction="row" gap="s">
        <Box bg="secondaryContainer" padding="m" radius="s"
            ><Text>Row 1</Text></Box
        >
        <Box bg="secondaryContainer" padding="m" radius="s"
            ><Text>Row 2</Text></Box
        >
    </Flex>

    <Flex direction="column" gap="s">
        <Box bg="tertiaryContainer" padding="m" radius="s"
            ><Text>Column 1</Text></Box
        >
        <Box bg="tertiaryContainer" padding="m" radius="s"
            ><Text>Column 2</Text></Box
        >
    </Flex>
</Flex>

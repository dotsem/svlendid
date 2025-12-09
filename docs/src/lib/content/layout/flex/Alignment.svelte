<script lang="ts">
    import { Flex, Box, Text } from "lib";
</script>

<Flex direction="column" gap="l">
    <Box shadow="sm" padding="s" radius="m">
        <Text variant="caption" style="margin-bottom: 8px"
            >Justify: between</Text
        >
        <Flex justify="between" gap="s">
            <Box bg="surfaceVariant" padding="s" radius="s"
                ><Text>Start</Text></Box
            >
            <Box bg="surfaceVariant" padding="s" radius="s"
                ><Text>End</Text></Box
            >
        </Flex>
    </Box>

    <Box shadow="sm" padding="s" radius="m">
        <Text variant="caption" style="margin-bottom: 8px">Align: center</Text>
        <Flex
            align="center"
            gap="s"
            style="height: 100px; background: #f0f0f0;"
        >
            <Box bg="surfaceVariant" padding="l" radius="s"
                ><Text>Big</Text></Box
            >
            <Box bg="surfaceVariant" padding="s" radius="s"
                ><Text>Small</Text></Box
            >
        </Flex>
    </Box>
</Flex>

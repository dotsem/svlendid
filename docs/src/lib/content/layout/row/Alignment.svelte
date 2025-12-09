<script lang="ts">
    import { Row, Box, Text } from "lib";
</script>

<Row gap="m" style="width: 100%;">
    <Box style="flex: 1">
        <Text variant="caption">Justify: between</Text>
        <Row
            justify="between"
            gap="s"
            style="background: #f0f0f0; padding: 8px;"
        >
            <Box bg="secondaryContainer" padding="s" radius="s"
                ><Text>Start</Text></Box
            >
            <Box bg="secondaryContainer" padding="s" radius="s"
                ><Text>End</Text></Box
            >
        </Row>
    </Box>

    <Box style="flex: 1">
        <Text variant="caption">Align: end</Text>
        <Row
            align="end"
            gap="s"
            style="background: #f0f0f0; padding: 8px; height: 100px;"
        >
            <Box bg="tertiaryContainer" padding="l" radius="s"
                ><Text>Tall</Text></Box
            >
            <Box bg="tertiaryContainer" padding="s" radius="s"
                ><Text>Short</Text></Box
            >
        </Row>
    </Box>
</Row>

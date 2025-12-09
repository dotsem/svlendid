<script lang="ts">
    import { Column, Row, Box, Text } from "lib";
</script>

<Row gap="l" align="start">
    <Column gap="s" style="flex: 1">
        <Text variant="caption">Align: end</Text>
        <Column align="end" gap="s" style="background: #f0f0f0; padding: 8px;">
            <Box bg="secondaryContainer" padding="s" radius="s"
                ><Text>Start</Text></Box
            >
            <Box bg="secondaryContainer" padding="s" radius="s"
                ><Text>End</Text></Box
            >
        </Column>
    </Column>

    <Column gap="s" style="flex: 1">
        <Text variant="caption">Justify: between</Text>
        <Column
            justify="between"
            gap="s"
            style="background: #f0f0f0; padding: 8px; height: 150px;"
        >
            <Box bg="tertiaryContainer" padding="s" radius="s"
                ><Text>Item 1</Text></Box
            >
            <Box bg="tertiaryContainer" padding="s" radius="s"
                ><Text>Item 2</Text></Box
            >
            <Box bg="tertiaryContainer" padding="s" radius="s"
                ><Text>Item 3</Text></Box
            >
        </Column>
    </Column>
</Row>

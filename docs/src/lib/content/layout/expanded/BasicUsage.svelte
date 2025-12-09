<script lang="ts">
    import { Expanded, Row, Box, Text } from "lib";
</script>

<Row gap="s">
    <Box bg="secondaryContainer" padding="m" radius="s">
        <Text>Fixed</Text>
    </Box>
    <Expanded>
        <Box bg="primaryContainer" padding="m" radius="s">
            <Text align="center">Expanded</Text>
        </Box>
    </Expanded>
    <Box bg="secondaryContainer" padding="m" radius="s">
        <Text>Fixed</Text>
    </Box>
</Row>

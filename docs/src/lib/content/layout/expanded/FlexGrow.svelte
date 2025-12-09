<script lang="ts">
    import { Expanded, Row, Box, Text } from "lib";
</script>

<Row gap="s">
    <Expanded flex={1}>
        <Box
            bg="surfaceVariant"
            padding="m"
            radius="s"
            style="height: 100%; display: grid; place-items: center;"
        >
            <Text>flex=1</Text>
        </Box>
    </Expanded>
    <Expanded flex={2}>
        <Box
            bg="primaryContainer"
            padding="m"
            radius="s"
            style="height: 100%; display: grid; place-items: center;"
        >
            <Text>flex=2</Text>
        </Box>
    </Expanded>
    <Expanded flex={1}>
        <Box
            bg="surfaceVariant"
            padding="m"
            radius="s"
            style="height: 100%; display: grid; place-items: center;"
        >
            <Text>flex=1</Text>
        </Box>
    </Expanded>
</Row>

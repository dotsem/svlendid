<script lang="ts">
    import { Ripple, Box, Text, Row } from "lib";
</script>

<Row gap="l">
    <Ripple color="primary" duration={800}>
        <Box
            bg="primaryContainer"
            padding="l"
            radius="s"
            style="user-select: none;"
        >
            <Text color="onPrimaryContainer">Use Primary Color</Text>
        </Box>
    </Ripple>

    <Ripple center color="error" opacity={0.5}>
        <Box
            bg="errorContainer"
            padding="l"
            radius="full"
            style="width: 100px; height: 100px; display: grid; place-items: center; user-select: none;"
        >
            <Text color="onErrorContainer" align="center">Centered Ripple</Text>
        </Box>
    </Ripple>
</Row>

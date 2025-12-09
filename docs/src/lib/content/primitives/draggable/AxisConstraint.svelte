<script lang="ts">
    import { Draggable, Box, Text, Row } from "lib";

    let posX = $state(0);
    let posY = $state(0);
</script>

<Row gap="l">
    <Draggable
        axis="horizontal"
        ondrag={(e) => (posX = e.deltaX)}
        ondragend={() => (posX = 0)}
    >
        <Box
            bg="secondaryContainer"
            padding="m"
            radius="s"
            style="transform: translateX({posX}px); cursor: ew-resize;"
        >
            <Text>Horizontal Only</Text>
        </Box>
    </Draggable>

    <Draggable
        axis="vertical"
        ondrag={(e) => (posY = e.deltaY)}
        ondragend={() => (posY = 0)}
    >
        <Box
            bg="tertiaryContainer"
            padding="m"
            radius="s"
            style="transform: translateY({posY}px); cursor: ns-resize;"
        >
            <Text>Vertical Only</Text>
        </Box>
    </Draggable>
</Row>

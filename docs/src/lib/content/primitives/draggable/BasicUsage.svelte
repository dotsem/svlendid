<script lang="ts">
    import { Draggable, Box, Text } from "lib";

    let position = $state({ x: 0, y: 0 });
    let status = $state("Idle");
</script>

<Draggable
    ondragstart={() => (status = "Dragging...")}
    ondrag={(e) => (position = { x: e.deltaX, y: e.deltaY })}
    ondragend={() => {
        status = "Idle";
        position = { x: 0, y: 0 };
    }}
>
    <Box
        bg="primaryContainer"
        padding="m"
        radius="m"
        style="cursor: grab; transform: translate({position.x}px, {position.y}px); display: inline-block;"
    >
        <Text>{status}</Text>
    </Box>
</Draggable>

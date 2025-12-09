<script lang="ts">
    import { Clickable, Box, Text, Column } from "lib";

    let lastEvent = $state("None");

    function handleEvent(name: string) {
        lastEvent = name;
        setTimeout(() => {
            if (lastEvent === name) lastEvent = "None";
        }, 1000);
    }
</script>

<Column gap="m" align="start">
    <Clickable
        onclick={() => handleEvent("Single Click")}
        ondoubleclick={() => handleEvent("Double Click")}
        onlongpress={() => handleEvent("Long Press")}
        oncontextmenu={() => handleEvent("Right Click")}
    >
        <Box bg="secondaryContainer" padding="l" radius="s">
            <Text>Interact with me!</Text>
            <Text variant="caption"
                >(Click, Double Click, Right Click, Long Press)</Text
            >
        </Box>
    </Clickable>

    <Text
        >Last detected: <span style="font-weight: bold; color: var(--primary)"
            >{lastEvent}</span
        ></Text
    >
</Column>

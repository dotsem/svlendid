<script lang="ts">
    import { Followable, Box, Text } from "lib";
</script>

<div
    style="height: 300px; position: relative; overflow: hidden; border: 1px dashed var(--outline-variant); border-radius: 8px;"
>
    <Followable constrainToParent smoothing={0.1}>
        {#snippet children({ x, y, isActive })}
            <div
                style="position: absolute; left: 0; top: 0; transform: translate({x}px, {y}px); pointer-events: none; opacity: {isActive
                    ? 1
                    : 0}; transition: opacity 0.2s;"
            >
                <Box
                    bg="secondary"
                    color="onSecondary"
                    padding="s"
                    radius="full"
                    style="width: 40px; height: 40px; display: grid; place-items: center;"
                >
                    <Text>S</Text>
                </Box>
            </div>
        {/snippet}
    </Followable>
    <div style="height: 100%; display: grid; place-items: center;">
        <Text variant="subtitle1" color="secondary">Smooth movement</Text>
    </div>
</div>

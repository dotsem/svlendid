<script lang="ts">
    import { Animate, Box, Text } from "lib";
    import { onMount } from "svelte";

    let key = $state(0);

    // Refresh animation for demo purposes
    function trigger() {
        key++;
    }
</script>

<div
    onclick={trigger}
    onkeydown={(e) => e.key === "Enter" && trigger()}
    role="button"
    tabindex="0"
>
    {#key key}
        <Animate animation="fadeUp" duration={800}>
            <Box bg="primary" padding="l" radius="m" shadow="md">
                <Text color="onPrimary">Fade Up Animation</Text>
            </Box>
        </Animate>
    {/key}
    <div style="margin-top: 16px;">
        <Text variant="caption" color="secondary">Click to replay</Text>
    </div>
</div>

<script lang="ts">
    import { Ripple, Box, Text } from "lib";
</script>

<Ripple onclick={() => console.log("Clicked")}>
    <Box bg="surfaceVariant" padding="l" radius="s" style="user-select: none;">
        <Text>Click me for ripple effect</Text>
    </Box>
</Ripple>

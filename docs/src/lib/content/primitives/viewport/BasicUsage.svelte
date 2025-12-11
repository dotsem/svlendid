<script lang="ts">
    import { ViewPort, Box, Text } from "lib";
</script>

<ViewPort visibleWhile="(max-width: 600px)">
    <Box p="md" bg="red-100" c="red-800" radius="md">
        <Text>Visible only on mobile (max-width: 600px)</Text>
    </Box>
</ViewPort>

<ViewPort visibleWhile="(min-width: 601px)">
    <Box p="md" bg="green-100" c="green-800" radius="md">
        <Text>Visible only on desktop (min-width: 601px)</Text>
    </Box>
</ViewPort>

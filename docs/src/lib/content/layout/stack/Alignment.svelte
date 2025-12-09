<script lang="ts">
    import { Stack, Box, Text } from "lib";
</script>

<Stack
    height="150px"
    align="center"
    style="background: #f0f0f0; border-radius: 8px;"
>
    <Box bg="secondaryContainer" width="100px" height="100px" radius="s"></Box>
    <Box bg="primaryContainer" width="60px" height="60px" radius="s">
        <Text align="center" style="line-height: 60px">Centered</Text>
    </Box>
</Stack>

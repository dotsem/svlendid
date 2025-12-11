<script lang="ts">
    import { Grid, Box, Text } from "lib";
</script>

<div style="overflow: hidden; max-width: 100%;">
    <Grid columns={3} gap="s">
        <Box
            bg="surfaceVariant"
            radius="m"
            padding="s"
            style="grid-column: span 2; text-align: center;"
        >
            <Text variant="body2">Spans 2 columns</Text>
        </Box>
        <Box
            bg="surfaceVariant"
            radius="m"
            padding="s"
            display="flex"
            align="center"
            justify="center"
            style="grid-row: span 2; text-align: center;"
        >
            <Text variant="body2">Spans 2 rows</Text>
        </Box>
        <Box
            bg="surfaceVariant"
            radius="m"
            padding="s"
            style="text-align: center;"
        >
            <Text>Cell</Text>
        </Box>
        <Box
            bg="surfaceVariant"
            radius="m"
            padding="s"
            style="text-align: center;"
        >
            <Text>Cell</Text>
        </Box>
        <Box
            bg="surfaceVariant"
            radius="m"
            padding="s"
            style="grid-column: span 3; text-align: center;"
        >
            <Text variant="body2">Full width</Text>
        </Box>
    </Grid>
</div>

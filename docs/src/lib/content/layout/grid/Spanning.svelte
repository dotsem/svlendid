<script lang="ts">
    import { Grid, Card, Text } from "lib";
</script>

<Grid columns={3} gap="m">
    <Card style="grid-column: span 2; padding: 1.5rem; text-align: center;">
        <Text variant="h5">Spans 2 columns</Text>
    </Card>
    <Card
        style="grid-row: span 2; padding: 1.5rem; text-align: center; display: flex; align-items: center; justify-content: center;"
    >
        <Text variant="h5">Spans 2 rows</Text>
    </Card>
    <Card style="padding: 1.5rem; text-align: center;">
        <Text>Cell</Text>
    </Card>
    <Card style="padding: 1.5rem; text-align: center;">
        <Text>Cell</Text>
    </Card>
    <Card style="grid-column: span 3; padding: 1.5rem; text-align: center;">
        <Text variant="h5">Spans all 3 columns</Text>
    </Card>
</Grid>

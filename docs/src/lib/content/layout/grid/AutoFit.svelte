<script lang="ts">
    import { Grid, Card, Text } from "lib";
</script>

<Grid minItemWidth="120px" gap="m">
    {#each [1, 2, 3, 4, 5] as item}
        <Card padding="m" style="min-height: 50px;">
            <Text>Item {item}</Text>
        </Card>
    {/each}
</Grid>

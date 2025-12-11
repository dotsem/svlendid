<script lang="ts">
    import { CircularProgress, Column, Row, Slider, Text } from "lib";

    let value = $state(65);
</script>

<Column gap="l" style="max-width: 400px;">
    <Row gap="l" align="center">
        <CircularProgress {value} size="l" showLabel />
        <Column gap="xs">
            <Text variant="h4">{value}%</Text>
            <Text variant="body2" color="outline">Upload progress</Text>
        </Column>
    </Row>
    <Slider bind:value min={0} max={100} label="Adjust progress" />
</Column>

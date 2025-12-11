<script lang="ts">
    import { Slider, Column, Row, Text, Input } from "lib";

    let volume = $state(50);
</script>

<Column gap="m" style="max-width: 400px;">
    <Slider bind:value={volume} min={0} max={100} label="Volume" />
    <Row gap="m" align="center">
        <Input
            type="number"
            value={String(volume)}
            oninput={(e) =>
                (volume = Number((e.target as HTMLInputElement).value))}
            style="width: 80px;"
        />
        <Text variant="body1">Current value: <strong>{volume}%</strong></Text>
    </Row>
</Column>

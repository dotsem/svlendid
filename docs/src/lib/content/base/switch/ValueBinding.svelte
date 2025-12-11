<script lang="ts">
    import { Switch, Row, Text } from "lib";

    let enabled = $state(false);
</script>

<Row gap="m" align="center">
    <Switch label="Enable notifications" bind:checked={enabled} />
    <Text variant="body1">Status: {enabled ? "ON ✓" : "OFF"}</Text>
</Row>

<script lang="ts">
    import { Checkbox, Row, Text } from "lib";

    let isChecked = $state(false);
</script>

<Row gap="m" align="center">
    <Checkbox label="Accept terms" bind:checked={isChecked} />
    <Text variant="body1">State: {isChecked ? "Checked ✓" : "Unchecked"}</Text>
</Row>

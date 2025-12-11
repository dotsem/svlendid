<script lang="ts">
    import { Radio, Column, Text } from "lib";

    let selected = $state("apple");
</script>

<Column gap="m">
    <Column gap="s">
        <Radio name="fruits" value="apple" label="Apple" bind:selected />
        <Radio name="fruits" value="banana" label="Banana" bind:selected />
        <Radio name="fruits" value="cherry" label="Cherry" bind:selected />
    </Column>
    <Text variant="body1">Selected: <strong>{selected}</strong></Text>
</Column>

<script lang="ts">
    import { Radio, Column, Text } from "lib";

    let selected = $state("apple");
</script>

<Column gap="m">
    <Column gap="s">
        <Radio
            name="fruits"
            value="apple"
            label="Apple"
            checked={selected === "apple"}
            onchange={() => (selected = "apple")}
        />
        <Radio
            name="fruits"
            value="banana"
            label="Banana"
            checked={selected === "banana"}
            onchange={() => (selected = "banana")}
        />
        <Radio
            name="fruits"
            value="cherry"
            label="Cherry"
            checked={selected === "cherry"}
            onchange={() => (selected = "cherry")}
        />
    </Column>
    <Text variant="body1">Selected: <strong>{selected}</strong></Text>
</Column>

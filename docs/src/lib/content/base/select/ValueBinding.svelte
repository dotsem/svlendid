<script lang="ts">
    import { Select, Column, Text } from "lib";

    let selectedFruit = $state("");

    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
        { value: "mango", label: "Mango" },
    ];
</script>

<Column gap="m" style="max-width: 300px;">
    <Select {options} placeholder="Select a fruit" bind:value={selectedFruit} />
    <Text variant="body1">
        Selected: <strong>{selectedFruit || "None"}</strong>
    </Text>
</Column>

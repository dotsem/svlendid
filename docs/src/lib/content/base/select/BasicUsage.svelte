<script lang="ts">
    import { Select, Column } from "lib";

    const options = [
        { value: "apple", label: "Apple" },
        { value: "banana", label: "Banana" },
        { value: "cherry", label: "Cherry" },
    ];
</script>

<Column gap="m" style="max-width: 300px;">
    <Select {options} placeholder="Select a fruit" />
    <Select {options} value="banana" />
    <Select {options} disabled placeholder="Disabled" />
</Column>

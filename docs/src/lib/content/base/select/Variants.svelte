<script lang="ts">
    import { Select, Column } from "lib";

    const options = [
        { value: "1", label: "Option 1" },
        { value: "2", label: "Option 2" },
    ];
</script>

<Column gap="m" style="max-width: 300px;">
    <Select {options} variant="outlined" placeholder="Outlined" />
    <Select {options} variant="filled" placeholder="Filled" />
</Column>

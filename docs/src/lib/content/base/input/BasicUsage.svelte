<script lang="ts">
    import { Input, Column } from "lib";

    let value = $state("");
</script>

<Column gap="m">
    <Input label="Username" placeholder="Enter your username" bind:value />
    <p>Value: {value}</p>
</Column>

<script lang="ts">
    import { Dropdown, Button, Menu } from "lib";

    const items = [
        { id: "1", label: "Option 1", onclick: () => alert("Option 1") },
        { id: "2", label: "Option 2", onclick: () => alert("Option 2") },
        { id: "3", label: "Option 3", onclick: () => alert("Option 3") },
    ];
</script>

<Dropdown>
    {#snippet trigger()}
        <Button>Open Dropdown</Button>
    {/snippet}
    <Menu {items} />
</Dropdown>

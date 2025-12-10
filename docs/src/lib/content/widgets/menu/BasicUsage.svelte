<script lang="ts">
    import { Menu, Card } from "lib";

    const items = [
        { id: "1", label: "Profile" },
        { id: "2", label: "Settings" },
        { id: "divider", label: "", divider: true },
        { id: "3", label: "Logout" },
    ];
</script>

<Card>
    <Menu {items} />
</Card>

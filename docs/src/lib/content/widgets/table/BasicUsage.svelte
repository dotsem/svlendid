<script lang="ts">
    import { Table } from "lib";

    const data = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "User" },
    ];

    const columns = [
        { key: "name", header: "Name", sortable: true },
        { key: "email", header: "Email" },
        { key: "role", header: "Role", sortable: true },
    ];
</script>

<Table {data} {columns} striped hoverable />

<script lang="ts">
    import { Table } from "lib";

    const originalData = [
        { id: 1, name: "John Doe", email: "john@example.com", role: "Admin" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User" },
        { id: 3, name: "Bob Wilson", email: "bob@example.com", role: "Editor" },
        {
            id: 4,
            name: "Alice Brown",
            email: "alice@example.com",
            role: "User",
        },
    ];

    let sortColumn = $state<string | undefined>(undefined);
    let sortDirection = $state<"asc" | "desc">("asc");

    const sortedData = $derived.by(() => {
        if (!sortColumn) return originalData;

        return [...originalData].sort((a, b) => {
            const aVal = String(a[sortColumn as keyof typeof a]);
            const bVal = String(b[sortColumn as keyof typeof b]);
            const comparison = aVal.localeCompare(bVal);
            return sortDirection === "asc" ? comparison : -comparison;
        });
    });

    const columns = [
        { key: "name", header: "Name", sortable: true },
        { key: "email", header: "Email", sortable: true },
        { key: "role", header: "Role", sortable: true },
    ];

    function handleSort(column: string, direction: "asc" | "desc") {
        sortColumn = column;
        sortDirection = direction;
    }
</script>

<Table
    data={sortedData}
    {columns}
    striped
    hoverable
    {sortColumn}
    {sortDirection}
    onsort={handleSort}
/>

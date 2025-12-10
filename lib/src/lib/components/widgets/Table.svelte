<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Table - A data table component
     */
    interface TableColumn<T = unknown> {
        key: string;
        header: string;
        width?: string;
        align?: "left" | "center" | "right";
        sortable?: boolean;
        render?: (value: T, row: T) => Snippet;
    }

    interface Props {
        /** Table data rows */
        data: Record<string, unknown>[];
        /** Column definitions */
        columns: TableColumn[];
        /** Striped rows */
        striped?: boolean;
        /** Hoverable rows */
        hoverable?: boolean;
        /** Compact padding */
        compact?: boolean;
        /** Bordered style */
        bordered?: boolean;
        /** Sticky header */
        stickyHeader?: boolean;
        /** Currently sorted column */
        sortColumn?: string;
        /** Sort direction */
        sortDirection?: "asc" | "desc";
        /** Sort handler */
        onsort?: (column: string, direction: "asc" | "desc") => void;
        /** Row click handler */
        onrowclick?: (row: Record<string, unknown>, index: number) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        data,
        columns,
        striped = false,
        hoverable = false,
        compact = false,
        bordered = false,
        stickyHeader = false,
        sortColumn,
        sortDirection = "asc",
        onsort,
        onrowclick,
        ...props
    }: Props = $props();

    const theme = getTheme();

    function handleSort(column: TableColumn) {
        if (!column.sortable || !onsort) return;

        const newDirection =
            sortColumn === column.key && sortDirection === "asc"
                ? "desc"
                : "asc";
        onsort(column.key, newDirection);
    }
</script>

<div
    class="table-wrapper"
    style:--table-border={theme.colors.outline}
    style:--table-header-bg={theme.colors.surfaceVariant}
    style:--table-stripe-bg={`${theme.colors.surfaceVariant}40`}
    style:--table-hover-bg={`${theme.colors.primary}08`}
    style:--table-radius={theme.radius.m}
    {...props}
>
    <table class="table" class:bordered class:compact>
        <thead class:sticky={stickyHeader}>
            <tr>
                {#each columns as column}
                    <th
                        class:sortable={column.sortable}
                        class:sorted={sortColumn === column.key}
                        style:width={column.width}
                        style:text-align={column.align ?? "left"}
                        onclick={() => handleSort(column)}
                    >
                        <span class="header-content">
                            {column.header}
                            {#if column.sortable}
                                <span class="sort-icon">
                                    {#if sortColumn === column.key}
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                        >
                                            {#if sortDirection === "asc"}
                                                <polyline
                                                    points="18 15 12 9 6 15"
                                                ></polyline>
                                            {:else}
                                                <polyline
                                                    points="6 9 12 15 18 9"
                                                ></polyline>
                                            {/if}
                                        </svg>
                                    {:else}
                                        <svg
                                            width="12"
                                            height="12"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            stroke-width="2"
                                            opacity="0.3"
                                        >
                                            <polyline points="18 15 12 9 6 15"
                                            ></polyline>
                                        </svg>
                                    {/if}
                                </span>
                            {/if}
                        </span>
                    </th>
                {/each}
            </tr>
        </thead>
        <tbody class:striped class:hoverable>
            {#each data as row, index}
                <tr
                    class:clickable={!!onrowclick}
                    onclick={() => onrowclick?.(row, index)}
                >
                    {#each columns as column}
                        <td style:text-align={column.align ?? "left"}>
                            {row[column.key] ?? ""}
                        </td>
                    {/each}
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .table-wrapper {
        width: 100%;
        overflow-x: auto;
    }

    .table {
        width: 100%;
        border-collapse: collapse;
        font-size: 0.875rem;
    }

    .table.bordered {
        border: 1px solid var(--table-border);
        border-radius: var(--table-radius);
        overflow: hidden;
    }

    th,
    td {
        padding: 0.875rem 1rem;
        border-bottom: 1px solid var(--table-border);
    }

    .compact th,
    .compact td {
        padding: 0.5rem 0.75rem;
    }

    th {
        background: var(--table-header-bg);
        font-weight: 600;
        text-align: left;
        white-space: nowrap;
    }

    .sticky {
        position: sticky;
        top: 0;
        z-index: 1;
    }

    .sortable {
        cursor: pointer;
        user-select: none;

        &:hover {
            opacity: 0.8;
        }
    }

    .header-content {
        display: inline-flex;
        align-items: center;
        gap: 0.375rem;
    }

    .sort-icon {
        display: flex;
        align-items: center;
    }

    .striped tr:nth-child(even) {
        background: var(--table-stripe-bg);
    }

    .hoverable tr:hover {
        background: var(--table-hover-bg);
    }

    .clickable {
        cursor: pointer;
    }

    tbody tr:last-child td {
        border-bottom: none;
    }
</style>

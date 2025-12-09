<script lang="ts">
    import { Box, Text, Flex } from "lib";
    import { defaultSpacing } from "lib";

    const spacers = Object.entries(defaultSpacing);
</script>

<h2 id="overview">Overview</h2>
<p>
    The spacing scale is used for margins, paddings, and gaps. It follows a
    consistent progression to ensure visual rhythm in your layout.
</p>

<h2 id="scale">Spacing Scale</h2>

<Box class="table-container">
    <table class="spacing-table">
        <thead>
            <tr>
                <th>Token</th>
                <th>Value</th>
                <th>Example</th>
            </tr>
        </thead>
        <tbody>
            {#each spacers as [key, value]}
                <tr>
                    <td><code>{key}</code></td>
                    <td>{value}</td>
                    <td>
                        <Box
                            bg="primary"
                            width={value as string}
                            height="16px"
                            radius="s"
                        />
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</Box>

<style>
    :global(.table-container) {
        width: 100%;
        overflow-x: auto;
    }

    .spacing-table {
        width: 100%;
        border-collapse: collapse;
        text-align: left;
    }

    th,
    td {
        padding: 12px;
        border-bottom: 1px solid var(--color-outlineVariant);
    }

    th {
        font-weight: 600;
        color: var(--color-onSurface);
    }

    td {
        color: var(--color-onSurfaceVariant);
    }
</style>

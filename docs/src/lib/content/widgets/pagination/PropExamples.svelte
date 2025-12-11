<script lang="ts">
    import { Pagination, Column, Text, Row, Slider } from "lib";

    let page = $state(1);
    let totalPages = $state(20);
</script>

<Column gap="l" style="max-width: 500px;">
    <Column gap="s">
        <Text variant="body2">Total Pages: {totalPages}</Text>
        <Slider
            bind:value={totalPages}
            min={5}
            max={50}
            label="Adjust total pages"
        />
    </Column>

    <Column gap="s">
        <Pagination bind:page {totalPages} />
        <Text variant="body2"
            >Current page: <strong>{page}</strong> of {totalPages}</Text
        >
    </Column>

    <Column gap="s">
        <Text variant="h5">With sibling count</Text>
        <Pagination bind:page {totalPages} siblingCount={2} />
    </Column>

    <Column gap="s">
        <Text variant="h5">With boundary count</Text>
        <Pagination bind:page {totalPages} boundaryCount={2} />
    </Column>
</Column>

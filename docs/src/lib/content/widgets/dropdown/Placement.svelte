<script lang="ts">
    import { Dropdown, Button, Menu, Row, Column } from "lib";

    const items = [
        { id: "1", label: "Option 1" },
        { id: "2", label: "Option 2" },
    ];
</script>

<Column gap="m">
    <Row gap="m" wrap justify="center">
        <Dropdown placement="top-start">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Top Start</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>

        <Dropdown placement="top">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Top Center</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>

        <Dropdown placement="top-end">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Top End</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>
    </Row>
    <Row gap="m" wrap>
        <Dropdown placement="bottom-start">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Bottom Start</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>

        <Dropdown placement="bottom">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Bottom Center</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>

        <Dropdown placement="bottom-end">
            {#snippet trigger()}
                <Button size="s" variant="outlined">Bottom End</Button>
            {/snippet}
            <Menu {items} />
        </Dropdown>
    </Row>
</Column>

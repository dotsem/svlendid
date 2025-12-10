<script lang="ts">
    import { FloatingActionButton, Icon, Row } from "lib";
</script>

<Row gap="m" alignItems="center">
    <FloatingActionButton position="bottom-left">
        <Icon name="plus" />
    </FloatingActionButton>
    <FloatingActionButton extended position="bottom-right" offset="8px">
        <Icon name="plus" />
        Add Item
    </FloatingActionButton>
</Row>

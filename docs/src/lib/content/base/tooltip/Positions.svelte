<script lang="ts">
    import { Tooltip, Button, Row } from "lib";
</script>

<Row gap="l" justify="center" align="center" style="height: 150px;">
    <Tooltip content="Top tooltip" position="top">
        <Button variant="outlined">Top</Button>
    </Tooltip>

    <Tooltip content="Left tooltip" position="left">
        <Button variant="outlined">Left</Button>
    </Tooltip>

    <Tooltip content="Right tooltip" position="right">
        <Button variant="outlined">Right</Button>
    </Tooltip>

    <Tooltip content="Bottom tooltip" position="bottom">
        <Button variant="outlined">Bottom</Button>
    </Tooltip>
</Row>

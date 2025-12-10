<script lang="ts">
    import { CircularProgress, Row } from "lib";
</script>

<Row gap="l" alignItems="center" wrap>
    <CircularProgress value={25} />
    <CircularProgress value={50} showLabel />
    <CircularProgress value={75} color="success" showLabel />
    <CircularProgress indeterminate color="secondary" />
</Row>

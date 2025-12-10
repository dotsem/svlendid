<script lang="ts">
    import { Skeleton, Column, Row } from "lib";
</script>

<Column gap="m">
    <Skeleton variant="text" width="80%" />
    <Skeleton variant="text" width="60%" />
    <Row gap="m">
        <Skeleton variant="circular" />
        <Column gap="s" style="flex: 1;">
            <Skeleton variant="text" />
            <Skeleton variant="text" width="70%" />
        </Column>
    </Row>
    <Skeleton variant="rectangular" height="120px" />
</Column>

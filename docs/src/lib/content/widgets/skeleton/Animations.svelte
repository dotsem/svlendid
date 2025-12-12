<script lang="ts">
    import { Skeleton, Text, Column } from "lib";
</script>

<Column gap="m">
    <Text variant="body1">No animation</Text>
    <Skeleton variant="rounded" animation="none" />

    <Text variant="body1">Pulse animation</Text>
    <Skeleton variant="rounded" animation="pulse" />

    <Text variant="body1">Shimmer animation</Text>
    <Skeleton variant="rounded" animation="shimmer" />
</Column>

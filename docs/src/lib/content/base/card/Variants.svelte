<script lang="ts">
    import { Card, Text, Row } from "lib";
</script>

<Row gap="m" wrap>
    <Card variant="elevated" padding="l">
        <Text>Elevated (Default)</Text>
    </Card>

    <Card variant="filled" bg="surface" padding="l">
        <Text>Filled</Text>
    </Card>

    <Card variant="outlined" padding="l">
        <Text>Outlined</Text>
    </Card>
</Row>

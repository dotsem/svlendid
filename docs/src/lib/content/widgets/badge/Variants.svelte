<script lang="ts">
    import { Badge, Box, Icon, Row, Text } from "lib";
</script>

<Row gap="xl" wrap>
    <div style="text-align: center">
        <Badge content={100} max={99} color="error">
            <Box bg="surfaceVariant" padding="s" radius="s"
                ><Icon name="Mail" /></Box
            >
        </Badge>
        <Text variant="caption">Max Count</Text>
    </div>

    <div style="text-align: center">
        <Badge dot color="success">
            <Box bg="surfaceVariant" padding="s" radius="s"
                ><Icon name="Bell" /></Box
            >
        </Badge>
        <Text variant="caption">Dot</Text>
    </div>

    <div style="text-align: center">
        <Badge content="9" position="bottom-right">
            <Box bg="secondaryContainer" padding="l" radius="s"
                ><Icon name="Mail" /></Box
            >
        </Badge>
        <Text variant="caption">Text & Pos</Text>
    </div>
</Row>

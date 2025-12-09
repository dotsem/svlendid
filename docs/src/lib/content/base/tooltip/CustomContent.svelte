<script lang="ts">
    import { Tooltip, Button, Row, Text, Icon } from "lib";
</script>

<Row gap="m" justify="center">
    <Tooltip>
        {#snippet content()}
            <Row gap="xs" align="center">
                <Icon name="Info" size={16} />
                <Text size="0.875rem">Rich content tooltip</Text>
            </Row>
        {/snippet}
        <Button variant="tonal">Rich Content</Button>
    </Tooltip>
</Row>

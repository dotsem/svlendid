<!-- 
    Counter Demo - Interactive counter example for quick-start guide
-->
<script lang="ts">
    import { Card, Column, Row, Text, Button, Icon } from 'lib';
    
    let count = $state(0);
</script>

<Card padding="l" variant="elevated">
    <Column gap="m" align="center">
        <Text variant="h2">{count}</Text>
        <Row gap="s">
            <Button color="error" onclick={() => count--}>
                <Icon name="Minus" size={18} />
            </Button>
            <Button color="primary" onclick={() => count++}>
                <Icon name="Plus" size={18} />
            </Button>
        </Row>
    </Column>
</Card>

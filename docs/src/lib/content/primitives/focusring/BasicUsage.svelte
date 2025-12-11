<script lang="ts">
    import { FocusRing, Button, Row, Input, Card, Text } from "lib";

    let buttonFocused = $state(false);
    let inputFocused = $state(false);
</script>

<Row gap="l" wrap>
    <Card style="padding: 1.5rem; position: relative;">
        <FocusRing visible={buttonFocused} />
        <Button
            onfocus={() => (buttonFocused = true)}
            onblur={() => (buttonFocused = false)}
        >
            Focus me (Tab key)
        </Button>
    </Card>

    <div style="position: relative;">
        <FocusRing visible={inputFocused} color="success" />
        <Input
            placeholder="Focus this input"
            onfocus={() => (inputFocused = true)}
            onblur={() => (inputFocused = false)}
        />
    </div>
</Row>

<Text variant="body2" style="margin-top: 1rem; opacity: 0.7;">
    Use Tab key to navigate and see the focus rings appear
</Text>

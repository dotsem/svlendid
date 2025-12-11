<script lang="ts">
    import { Spinner, Row, Column, Text } from "lib";
</script>

<Column gap="l">
    <div>
        <Text variant="h6">Spin Variant</Text>
        <Row gap="l" alignItems="center" wrap style="margin-top: 0.5rem;">
            <Spinner variant="spin" animationStyle="smooth" />
            <Spinner variant="spin" animationStyle="steps" />
            <Spinner variant="spin" animationStyle="bounce" />
        </Row>
    </div>

    <div>
        <Text variant="h6">Pulse Variant</Text>
        <Row gap="l" alignItems="center" wrap style="margin-top: 0.5rem;">
            <Spinner
                variant="pulse"
                animationStyle="smooth"
                color="secondary"
            />
            <Spinner variant="pulse" animationStyle="steps" color="secondary" />
            <Spinner
                variant="pulse"
                animationStyle="bounce"
                color="secondary"
            />
        </Row>
    </div>

    <div>
        <Text variant="h6">Dots Variant</Text>
        <Row gap="l" alignItems="center" wrap style="margin-top: 0.5rem;">
            <Spinner variant="dots" animationStyle="smooth" color="success" />
            <Spinner variant="dots" animationStyle="steps" color="success" />
            <Spinner variant="dots" animationStyle="bounce" color="success" />
        </Row>
    </div>

    <div>
        <Text variant="h6">Sizes</Text>
        <Row gap="l" alignItems="center" wrap style="margin-top: 0.5rem;">
            <Spinner size="xs" />
            <Spinner size="s" />
            <Spinner size="m" />
            <Spinner size="l" />
            <Spinner size="xl" />
        </Row>
    </div>
</Column>

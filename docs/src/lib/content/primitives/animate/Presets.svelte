<script lang="ts">
    import { Animate, Box, Text, Row } from "lib";

    let key = $state(0);
    function trigger() {
        key++;
    }
</script>

<div
    onclick={trigger}
    onkeydown={(e) => e.key === "Enter" && trigger()}
    role="button"
    tabindex="0"
>
    {#key key}
        <Row gap="m" wrap justify="center">
            <Animate animation="fadeIn" delay={0}>
                <Box bg="surfaceVariant" padding="m" radius="s">
                    <Text>fadeIn</Text>
                </Box>
            </Animate>

            <Animate animation="slideUp" delay={200}>
                <Box bg="surfaceVariant" padding="m" radius="s">
                    <Text>slideUp</Text>
                </Box>
            </Animate>

            <Animate animation="scale" delay={400}>
                <Box bg="surfaceVariant" padding="m" radius="s">
                    <Text>scale</Text>
                </Box>
            </Animate>

            <Animate animation="blur" delay={600}>
                <Box bg="surfaceVariant" padding="m" radius="s">
                    <Text>blur</Text>
                </Box>
            </Animate>
        </Row>
    {/key}
    <div style="margin-top: 16px; text-align: center;">
        <Text variant="caption" color="secondary">Click to replay</Text>
    </div>
</div>

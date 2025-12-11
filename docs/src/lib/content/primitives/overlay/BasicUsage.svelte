<script lang="ts">
    import { Overlay, Button, Text, Portal, Center, Card, Column } from "lib";

    let show = $state(false);
</script>

<Button onclick={() => (show = !show)}>Toggle Overlay</Button>

{#if show}
    <Overlay onclick={() => (show = false)} blur="4px" />
    <Portal>
        <Center
            style="position: fixed; inset: 0; z-index: 401; pointer-events: none;"
        >
            <Card
                style="padding: 2rem; pointer-events: auto; max-width: 400px;"
            >
                <Column gap="m" alignItems="center">
                    <Text variant="h4">Modal Content</Text>
                    <Text
                        >This uses the Center component to position content over
                        the overlay.</Text
                    >
                    <Button onclick={() => (show = false)}>Close</Button>
                </Column>
            </Card>
        </Center>
    </Portal>
{/if}

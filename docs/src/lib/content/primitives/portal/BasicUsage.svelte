<script lang="ts">
    import { Portal, Button, Box, Text, Center } from "lib";

    let show = $state(false);
</script>

<div
    style="position: relative; overflow: hidden; height: 200px; border: 1px solid var(--outline-variant); border-radius: 8px;"
>
    <Center>
        <Button onclick={() => (show = !show)}>Toggle Modal</Button>
    </Center>

    {#if show}
        <Portal>
            <div
                style="position: fixed; inset: 0; background: rgba(0,0,0,0.5); z-index: 9999; display: grid; place-items: center;"
            >
                <Box
                    bg="surface"
                    padding="l"
                    radius="m"
                    shadow="lg"
                    style="min-width: 300px;"
                >
                    <Text variant="h5" style="margin-bottom: 16px;"
                        >Portal Modal</Text
                    >
                    <Text style="margin-bottom: 24px;"
                        >This content is rendered outside the overflow:hidden
                        container.</Text
                    >
                    <div style="display: flex; justify-content: flex-end;">
                        <Button variant="filled" onclick={() => (show = false)}
                            >Close</Button
                        >
                    </div>
                </Box>
            </div>
        </Portal>
    {/if}
</div>

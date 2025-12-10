<script lang="ts">
    import { Overlay, Button, Text, Portal } from "lib";

    let show = $state(false);
</script>

<Button onclick={() => (show = !show)}>Toggle Overlay</Button>

{#if show}
    <Overlay onclick={() => (show = false)} />
    <Portal>
        <div
            style="position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 401; background: white; padding: 2rem; border-radius: 8px;"
        >
            <Text>Click overlay to close</Text>
        </div>
    </Portal>
{/if}

<script lang="ts">
    import { Dialog, Button, Text } from "lib";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Dialog</Button>

<Dialog bind:open title="Dialog Title">
    <Text>This is the dialog content.</Text>
    {#snippet actions()}
        <Button variant="text" onclick={() => (open = false)}>Cancel</Button>
        <Button onclick={() => (open = false)}>Confirm</Button>
    {/snippet}
</Dialog>

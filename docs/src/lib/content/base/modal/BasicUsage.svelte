<script lang="ts">
    import { Modal, Button, Text, Column } from "lib";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>
    <Column padding="l" gap="m">
        <Text variant="h4">Modal Title</Text>
        <Text>This is modal content. (for now you get an easy decision :))</Text
        >
        <Button onclick={() => (open = false)}>Close</Button>
    </Column>
</Modal>

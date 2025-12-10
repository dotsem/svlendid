<script lang="ts">
    import { Modal, Button, Text, Column } from "lib";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Modal</Button>

<Modal bind:open>
    <Column padding="l" gap="m">
        <Text variant="h4">Modal Title</Text>
        <Text
            >This is modal content. Press Escape or click outside to close.</Text
        >
        <Button onclick={() => (open = false)}>Close</Button>
    </Column>
</Modal>

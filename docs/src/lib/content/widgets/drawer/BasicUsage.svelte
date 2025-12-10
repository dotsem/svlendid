<script lang="ts">
    import { Drawer, Button, Text, Column } from "lib";

    let open = $state(false);
</script>

<Button onclick={() => (open = true)}>Open Drawer</Button>

<Drawer bind:open>
    <Column padding="l" gap="m">
        <Text variant="h4">Drawer Content</Text>
        <Text>Slide-in panel from the left.</Text>
        <Button onclick={() => (open = false)}>Close</Button>
    </Column>
</Drawer>

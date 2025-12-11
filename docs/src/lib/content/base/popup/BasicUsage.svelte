<script lang="ts">
    import { Popup, Button, Container, Text } from "lib";

    let open = $state(false);
    let anchor = $state<HTMLElement>();
</script>

<div bind:this={anchor}>
    <Button onclick={() => (open = !open)}>Toggle Popup</Button>
</div>

<Popup bind:open {anchor} placement="bottom-start">
    <Container padding="m">
        <Text>Popup content here</Text>
    </Container>
</Popup>

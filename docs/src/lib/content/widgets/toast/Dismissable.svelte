<script lang="ts">
    import { Toast, Column, Button, Row } from "lib";

    let showToast = $state(true);
</script>

<Column gap="m">
    {#if showToast}
        <Toast color="info" closable onclose={() => (showToast = false)}>
            This toast can be dismissed by clicking the X button.
        </Toast>
    {:else}
        <Button onclick={() => (showToast = true)} variant="outlined" size="s">
            Show Toast Again
        </Button>
    {/if}
</Column>

<script lang="ts">
    import { Alert, Column, Button } from "lib";

    let showAlert = $state(true);
</script>

<Column gap="m">
    {#if showAlert}
        <Alert
            severity="success"
            dismissible
            ondismiss={() => (showAlert = false)}
            title="Success!"
        >
            Your changes have been saved successfully. Click the X to dismiss
            this alert.
        </Alert>
    {:else}
        <Button onclick={() => (showAlert = true)} variant="outlined">
            Show Alert Again
        </Button>
    {/if}
</Column>

<script lang="ts">
    import {
        Button,
        Row,
        ToastStack,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    } from "lib";
</script>

<ToastStack position="top-right" />

<Row gap="s" wrap>
    <Button onclick={() => showToast("This is a default toast")} size="s">
        Default
    </Button>
    <Button
        onclick={() => showSuccess("Operation completed!")}
        size="s"
        color="success"
    >
        Success
    </Button>
    <Button
        onclick={() => showError("Something went wrong")}
        size="s"
        color="error"
    >
        Error
    </Button>
    <Button
        onclick={() => showWarning("Please check your input")}
        size="s"
        color="warning"
    >
        Warning
    </Button>
    <Button
        onclick={() => showInfo("Here's some information")}
        size="s"
        color="info"
    >
        Info
    </Button>
</Row>

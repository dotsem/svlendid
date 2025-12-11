<script lang="ts">
    import {
        Button,
        Row,
        Column,
        Text,
        ToastStack,
        showToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
    } from "lib";
</script>

<ToastStack position="top-right" />

<Column gap="m">
    <Row gap="s" wrap>
        <Button onclick={() => showToast("This is a default toast")} size="s">
            Default (5s)
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
    <Row gap="s" wrap>
        <Button
            onclick={() => showToast("Quick toast", { duration: 2000 })}
            size="s"
            variant="outlined"
        >
            2 second
        </Button>
        <Button
            onclick={() => showToast("Persistent toast", { duration: null })}
            size="s"
            variant="outlined"
        >
            Manual close only
        </Button>
    </Row>
</Column>

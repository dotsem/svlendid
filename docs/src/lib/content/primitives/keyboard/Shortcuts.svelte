<script lang="ts">
    import { Keyboard, Box, Text, Row } from "lib";

    let action = $state("");

    const shortcuts = {
        "ctrl+s": () => (action = "Saved!"),
        "shift+enter": () => (action = "Submitting..."),
        escape: () => (action = "Cancelled"),
    };

    $effect(() => {
        if (action) {
            const timer = setTimeout(() => (action = ""), 1500);
            return () => clearTimeout(timer);
        }
    });

    const isMac =
        typeof navigator !== "undefined" && /Mac/i.test(navigator.userAgent);
    const ctrlKey = isMac ? "Cmd" : "Ctrl";
</script>

<Keyboard {shortcuts} autoFocus>
    <Box bg="secondaryContainer" padding="l" radius="s">
        <Text>Try these shortcuts (focus first):</Text>
        <Row gap="s" style="margin-top: 8px;">
            <Box bg="surface" padding="s" radius="xs"
                ><Text variant="caption">{ctrlKey}+S</Text></Box
            >
            <Box bg="surface" padding="s" radius="xs"
                ><Text variant="caption">Shift+Enter</Text></Box
            >
            <Box bg="surface" padding="s" radius="xs"
                ><Text variant="caption">Esc</Text></Box
            >
        </Row>

        {#if action}
            <div
                style="margin-top: 16px; padding: 8px; background: var(--primary); color: var(--on-primary); border-radius: 4px; text-align: center;"
            >
                <Text>{action}</Text>
            </div>
        {/if}
    </Box>
</Keyboard>

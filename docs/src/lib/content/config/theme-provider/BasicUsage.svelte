<script lang="ts">
    import { ThemeProvider, Button, Box, Text } from "lib";
</script>

<div class="demo-wrapper">
    <ThemeProvider>
        <!-- The provider applies default theme styles to children -->
        <Box padding="m" bg="surfaceContainer" radius="m">
            <Text variant="body1">
                This content inherits the default theme.
            </Text>
            <Box margin="s 0 0 0">
                <Button>Default Button</Button>
            </Box>
        </Box>
    </ThemeProvider>
</div>

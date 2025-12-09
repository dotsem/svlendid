<script lang="ts">
    import { ThemeProvider, Button, Box, Text } from "lib";

    // Custom configuration overriding primary color and radius
    const customConfig = {
        colors: {
            primary: "#ff5722",
            onPrimary: "#ffffff",
            primaryContainer: "#ffccbc",
            onPrimaryContainer: "#bf360c",
        },
        radius: {
            m: "0px", // Square corners
            l: "4px",
        },
    };
</script>

<div class="demo-wrapper">
    <ThemeProvider config={customConfig as any}>
        <Box
            padding="m"
            bg="surfaceContainer"
            radius="m"
            border="1px solid #ffd8cf"
        >
            <Text variant="subtitle1" color="primary">Custom Theme Zone</Text>
            <Text variant="body2" margin="xs 0 m 0">
                The primary color is orange and radius is square.
            </Text>

            <Box gap="s">
                <Button variant="filled">Filled Button</Button>
                <Button variant="tonal">Tonal Button</Button>
                <Button variant="outlined">Outlined Button</Button>
            </Box>
        </Box>
    </ThemeProvider>
</div>

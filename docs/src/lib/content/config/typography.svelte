<script lang="ts">
    import { Box, Text, Flex, Stack, Divider, Column } from "lib";
    import { defaultFontTheme } from "lib";

    // Group variants logically
    const headings = ["h1", "h2", "h3", "h4", "h5", "h6"] as const;
    const body = [
        "body1",
        "body2",
        "subtitle1",
        "subtitle2",
        "caption",
        "overline",
    ] as const;
</script>

<h2 id="overview">Overview</h2>
<p>
    The typography system provides a set of consistent type styles. The Text
    component uses these variants to ensure readability and hierarchy.
</p>

<h2 id="headings">Headings</h2>
<Column gap="l">
    {#each headings as variant}
        <Box>
            <Text {variant}>Heading {variant.replace("h", "")}</Text>
            <Text variant="caption" color="outline">
                {variant} • {defaultFontTheme[variant].fontSize} / {defaultFontTheme[
                    variant
                ].fontWeight}
            </Text>
        </Box>
        <Divider />
    {/each}
</Column>

<h2 id="body">Body & Subtitles</h2>
<Column gap="l" margin="xl 0 0 0">
    {#each body as variant}
        <Box>
            <Text {variant}>
                I'm a {variant} variant. The quick brown fox jumps over the lazy
                dog.
            </Text>
            <Text variant="caption" color="outline">
                {variant} • {defaultFontTheme[variant].fontSize} / {defaultFontTheme[
                    variant
                ].fontWeight}
            </Text>
        </Box>
        <Divider />
    {/each}
</Column>

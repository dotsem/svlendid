<script lang="ts">
    import { SplitSection, Text, Column, Card } from "lib";
</script>

<SplitSection ratio="1:1" gap="xl">
    {#snippet start()}
        <Card padding="l">
            <Column gap="m">
                <Text variant="h3">Left Content</Text>
                <Text>This is the left side of the split section.</Text>
            </Column>
        </Card>
    {/snippet}
    {#snippet end()}
        <Card padding="l">
            <Column gap="m">
                <Text variant="h3">Right Content</Text>
                <Text>This is the right side of the split section.</Text>
            </Column>
        </Card>
    {/snippet}
</SplitSection>

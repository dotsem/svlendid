<script lang="ts">
    import { SplitSection, Column, Text, Card } from "lib";
</script>

<Column gap="l">
    <Text variant="h4">1:2 Ratio</Text>
    <SplitSection ratio="1:2">
        {#snippet start()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">1/3</Text>
            </Card>
        {/snippet}
        {#snippet end()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">2/3</Text>
            </Card>
        {/snippet}
    </SplitSection>

    <Text variant="h4">3:1 Ratio</Text>
    <SplitSection ratio="3:1">
        {#snippet start()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">3/4</Text>
            </Card>
        {/snippet}
        {#snippet end()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">1/4</Text>
            </Card>
        {/snippet}
    </SplitSection>

    <Text variant="h4">1:3 Ratio (Right Layout)</Text>
    <SplitSection ratio="1:3" layout="right">
        {#snippet start()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">Main Content</Text>
            </Card>
        {/snippet}
        {#snippet end()}
            <Card style="padding: 2rem; text-align: center;">
                <Text variant="h4">Sidebar</Text>
            </Card>
        {/snippet}
    </SplitSection>
</Column>

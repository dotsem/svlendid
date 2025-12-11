<script lang="ts">
    import { Tabs, Column, Card, Text, Row, Button } from "lib";

    const tabs = [
        { id: "home", label: "Home" },
        { id: "settings", label: "Settings" },
        { id: "profile", label: "Profile" },
    ];

    let activeTab = $state("home");
</script>

<Column gap="l">
    <Column gap="s">
        <Text variant="h4">Controlled Tabs</Text>
        <Tabs {tabs} bind:activeTab>
            {#snippet children(tab)}
                <Card style="padding: 1.5rem;">
                    {#if tab === "home"}
                        <Text>Welcome to the home page! 🏠</Text>
                    {:else if tab === "settings"}
                        <Text>Adjust your settings here ⚙️</Text>
                    {:else}
                        <Text>View your profile 👤</Text>
                    {/if}
                </Card>
            {/snippet}
        </Tabs>
        <Row gap="s">
            <Button
                size="s"
                variant="outlined"
                onclick={() => (activeTab = "home")}>Go Home</Button
            >
            <Button
                size="s"
                variant="outlined"
                onclick={() => (activeTab = "settings")}>Go Settings</Button
            >
        </Row>
        <Text variant="body2">Active: <strong>{activeTab}</strong></Text>
    </Column>
</Column>

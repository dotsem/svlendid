<script lang="ts">
    import { Tabs, Text } from "lib";

    const tabs = [
        { id: "tab1", label: "Tab 1" },
        { id: "tab2", label: "Tab 2" },
        { id: "tab3", label: "Tab 3", disabled: true },
    ];
</script>

<Tabs {tabs}>
    {#snippet children(activeTab)}
        {#if activeTab === "tab1"}
            <Text>Content for Tab 1</Text>
        {:else if activeTab === "tab2"}
            <Text>Content for Tab 2</Text>
        {:else}
            <Text>Content for Tab 3</Text>
        {/if}
    {/snippet}
</Tabs>

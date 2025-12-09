<script lang="ts">
    import { Visible, Box, Text, Animate } from "lib";

    let items = $state([1, 2, 3]);
    let loading = $state(false);

    function loadMore() {
        if (loading) return;
        loading = true;
        setTimeout(() => {
            items = [...items, items.length + 1, items.length + 2];
            loading = false;
        }, 1000);
    }
</script>

<div
    style="height: 300px; overflow-y: scroll; border: 1px solid var(--outline-variant); border-radius: 8px; padding: 16px;"
>
    {#each items as item}
        <Box
            bg="surface"
            padding="m"
            radius="s"
            shadow="sm"
            style="margin-bottom: 12px;"
        >
            <Text>Item {item}</Text>
        </Box>
    {/each}

    <Visible onenter={loadMore} rootMargin="100px">
        {#snippet children({ isVisible })}
            <div style="padding: 20px; text-align: center;">
                {#if loading}
                    <Animate animation="spin" style="display: inline-block;">
                        <Box padding="s"><Text>Loading...</Text></Box>
                    </Animate>
                {:else}
                    <Text variant="caption" color="secondary"
                        >Scroll for more</Text
                    >
                {/if}
            </div>
        {/snippet}
    </Visible>
</div>

<script lang="ts">
    import { Chip, Row, Text } from "lib";

    let tags = $state(["JavaScript", "TypeScript", "Svelte", "CSS", "HTML"]);

    function removeTag(tag: string) {
        tags = tags.filter((t) => t !== tag);
    }

    function reset() {
        tags = ["JavaScript", "TypeScript", "Svelte", "CSS", "HTML"];
    }
</script>

<Row gap="s" wrap style="margin-bottom: 1rem;">
    {#each tags as tag (tag)}
        <Chip removable onremove={() => removeTag(tag)} color="primary">
            {tag}
        </Chip>
    {/each}
    {#if tags.length === 0}
        <Text variant="body1" color="outline">All tags removed</Text>
    {/if}
</Row>

{#if tags.length < 5}
    <Chip clickable onclick={reset} variant="outlined">Reset Tags</Chip>
{/if}

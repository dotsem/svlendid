<script lang="ts">
    import { ListItem, Avatar, Text } from "lib";
</script>

<ListItem clickable>
    {#snippet leading()}
        <Avatar initials="JD" size="s" />
    {/snippet}
    <Text>John Doe</Text>
    {#snippet trailing()}
        <Text variant="caption">Admin</Text>
    {/snippet}
</ListItem>

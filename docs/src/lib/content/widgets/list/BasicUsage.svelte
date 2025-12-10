<script lang="ts">
    import { List, ListItem, Text } from "lib";
</script>

<List variant="divided">
    <ListItem>
        <Text>List Item 1</Text>
    </ListItem>
    <ListItem secondary="Secondary text">
        <Text>List Item 2</Text>
    </ListItem>
    <ListItem clickable onclick={() => alert("Clicked!")}>
        <Text>Clickable Item</Text>
    </ListItem>
</List>

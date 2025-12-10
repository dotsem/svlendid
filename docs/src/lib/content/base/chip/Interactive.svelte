<script lang="ts">
    import { Chip, Row } from "lib";
</script>

<Row gap="s" wrap>
    <Chip removable onremove={() => alert("Removed!")}>Removable</Chip>
    <Chip clickable onclick={() => alert("Clicked!")}>Clickable</Chip>
</Row>

<script lang="ts">
    import { TextArea, Column } from "lib";
</script>

<Column gap="m" style="max-width: 400px;">
    <TextArea placeholder="Enter your message..." />
    <TextArea value="Pre-filled content" rows={4} />
    <TextArea placeholder="Disabled" disabled />
</Column>

<script lang="ts">
    import { TextArea, Column } from "lib";
</script>

<Column gap="m" style="max-width: 400px;">
    <TextArea placeholder="With character count" maxLength={100} showCount />
    <TextArea placeholder="Auto resize" autoResize />
</Column>

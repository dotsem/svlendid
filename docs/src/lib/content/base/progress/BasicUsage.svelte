<script lang="ts">
    import { Progress, Column } from "lib";
</script>

<Column gap="m" style="width: 400px;">
    <Progress value={30} />
    <Progress value={60} color="success" />
    <Progress indeterminate color="secondary" />
</Column>

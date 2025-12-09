<script lang="ts">
    import { Input, Column, Icon } from "lib";
</script>

<Column gap="m">
    <Input label="Search" placeholder="Search...">
        {#snippet leading()}
            <Icon name="Search" size={18} />
        {/snippet}
    </Input>

    <Input label="Password" type="password" placeholder="Enter password">
        {#snippet trailing()}
            <Icon name="Eye" size={18} style="cursor: pointer" />
        {/snippet}
    </Input>
</Column>

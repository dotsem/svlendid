<script lang="ts">
    import { Input, Column } from "lib";
</script>

<Column gap="m">
    <Input
        label="With Helper Text"
        placeholder="Enter email"
        helper="We'll never share your email."
    />
    <Input
        label="Error State"
        value="Invalid value"
        error="This field is required"
    />
    <Input label="Disabled" value="Disabled input" disabled />
    <Input label="Read Only" value="Read only input" readonly />
</Column>

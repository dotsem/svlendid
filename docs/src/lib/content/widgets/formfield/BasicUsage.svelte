<script lang="ts">
    import { FormField, Input, Column } from "lib";
</script>

<Column gap="m" style="max-width: 400px;">
    <FormField label="Username" required>
        <Input placeholder="Enter username" />
    </FormField>
    <FormField label="Password" description="Must be at least 8 characters">
        <Input type="password" placeholder="Enter password" />
    </FormField>
    <FormField label="Email" error="Please enter a valid email">
        <Input type="email" value="invalid" />
    </FormField>
</Column>

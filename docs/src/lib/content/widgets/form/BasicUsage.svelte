<script lang="ts">
    import { Form, FormField, Input, Button } from "lib";
</script>

<Form onsubmit={() => alert("Form submitted!")}>
    <FormField label="Name" required>
        <Input placeholder="Enter your name" />
    </FormField>
    <FormField label="Email" description="We'll never share your email">
        <Input type="email" placeholder="Enter your email" />
    </FormField>
    <Button type="submit">Submit</Button>
</Form>

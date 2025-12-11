<script lang="ts">
    import { Form, FormField, Input, Button, Alert, Column } from "lib";

    let name = $state("");
    let email = $state("");
    let submitted = $state(false);
    let submittedData = $state<{ name: string; email: string } | null>(null);

    function handleSubmit() {
        submittedData = { name, email };
        submitted = true;
    }
</script>

<Column gap="m" style="max-width: 400px;">
    <Form onsubmit={handleSubmit}>
        <FormField label="Name" required>
            <Input bind:value={name} placeholder="Enter your name" />
        </FormField>
        <FormField label="Email">
            <Input
                bind:value={email}
                type="email"
                placeholder="Enter your email"
            />
        </FormField>
        <Button type="submit">Submit</Button>
    </Form>

    {#if submitted && submittedData}
        <Alert
            severity="success"
            dismissible
            ondismiss={() => (submitted = false)}
        >
            <strong>Form submitted!</strong><br />
            Name: {submittedData.name}<br />
            Email: {submittedData.email || "(empty)"}
        </Alert>
    {/if}
</Column>

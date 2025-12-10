<script lang="ts">
    import { Accordion, Text } from "lib";

    const items = [
        {
            id: "1",
            title: "Section 1",
            content: {
                $$slots: { default: true },
                default: () => "Content for section 1",
            },
        },
    ];
</script>

<Accordion
    items={[
        { id: "1", title: "Section 1", content: () => {} },
        { id: "2", title: "Section 2", content: () => {} },
        {
            id: "3",
            title: "Section 3 (disabled)",
            disabled: true,
            content: () => {},
        },
    ]}
>
    {#snippet content()}
        <Text>Accordion content goes here.</Text>
    {/snippet}
</Accordion>

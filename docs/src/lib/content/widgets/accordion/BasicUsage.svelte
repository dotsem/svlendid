<script lang="ts">
    import { Accordion, AccordionItem, Text } from "lib";
</script>

<Accordion>
    <AccordionItem title="Can you create accordions?">
        <Text
            >Yes, you can create accordions with the Accordion and AccordionItem
            components!</Text
        >
    </AccordionItem>
    <AccordionItem title="Is it easy to use?">
        <Text
            >Absolutely! Just wrap AccordionItem components inside an Accordion.</Text
        >
    </AccordionItem>
    <AccordionItem title="Can items be disabled?" disabled>
        <Text>This content won't be shown because the item is disabled.</Text>
    </AccordionItem>
</Accordion>

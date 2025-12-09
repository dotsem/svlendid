<script lang="ts">
    import { Spacer, Row, Box, Text, Column } from "lib";
    const Item = Box;
</script>

<Column>
    <Row align="center">
        <Item bg="surfaceVariant" padding="s" radius="s"><Text>A</Text></Item>
        <Spacer width="xl" />
        <Item bg="surfaceVariant" padding="s" radius="s"
            ><Text>B (xl gap)</Text></Item
        >
    </Row>

    <Spacer height="m" />

    <Row align="center">
        <Item bg="surfaceVariant" padding="s" radius="s"><Text>C</Text></Item>
        <Spacer width="50px" />
        <Item bg="surfaceVariant" padding="s" radius="s"
            ><Text>D (50px gap)</Text></Item
        >
    </Row>
</Column>

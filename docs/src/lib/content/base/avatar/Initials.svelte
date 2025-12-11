<script lang="ts">
    import { Avatar, Row, Column, Input, Text } from "lib";

    let name = $state("Jeff Peterson");
</script>

<Column gap="m" style="max-width: 300px;">
    <Input bind:value={name} placeholder="Enter full name" />
    <Row gap="m" alignItems="center">
        <Avatar {name} size="l" />
        <Text variant="body1">Initials auto-generated from name</Text>
    </Row>
</Column>

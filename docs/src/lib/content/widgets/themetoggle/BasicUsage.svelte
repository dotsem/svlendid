<script lang="ts">
    import { ThemeToggle, Row, Text } from "lib";

    let dark = $state(false);
</script>

<Row gap="m" alignItems="center">
    <ThemeToggle bind:dark />
    <Text>Theme: {dark ? "Dark" : "Light"}</Text>
</Row>

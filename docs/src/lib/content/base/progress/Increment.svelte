<script lang="ts">
    import { Progress, Column, Button, Icon, Row } from "lib";

    let value = $state(0);

    function increment() {
        value += 10;
    }

    function reset() {
        value = 0;
    }
</script>

<Column gap="m" style="width: 400px;">
    <Progress {value} />
    <Row gap="s" justify="center">
        <Button onclick={increment}>
            {#snippet leadingIcon()}
                <Icon name="Plus" size={18} />
            {/snippet}
            Increment</Button
        >
        <Button onclick={reset} variant="outlined">
            {#snippet leadingIcon()}
                <Icon name="RotateCcw" size={18} />
            {/snippet}
            Reset</Button
        >
    </Row>
</Column>

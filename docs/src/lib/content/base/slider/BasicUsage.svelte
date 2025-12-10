<script lang="ts">
    import { Slider, Column } from "lib";

    let value = $state(50);
</script>

<Column gap="l" style="max-width: 400px;">
    <Slider bind:value label="Volume" />
    <Slider value={75} showValue />
    <Slider value={30} disabled />
</Column>

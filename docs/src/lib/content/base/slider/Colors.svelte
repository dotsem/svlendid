<script lang="ts">
    import { Slider, Column } from "lib";
</script>

<Column gap="l" style="max-width: 400px;">
    <Slider value={25} color="primary" showValue />
    <Slider value={50} color="secondary" showValue />
    <Slider value={75} color="success" showValue />
</Column>

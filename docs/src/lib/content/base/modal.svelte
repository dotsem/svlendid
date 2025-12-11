<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./modal/index";

    const modalProps = getComponentProps("Modal");
</script>

<h2 id="overview">Overview</h2>

<p>
    Modal displays content in a centered overlay with backdrop. It will block
    the main interface & will not go await until you explicitly close it by
    making a decision. You can't close it with escape or clicking outside.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Click button to open modal"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={modalProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./toast/index";

    const toastProps = getComponentProps("Toast");
</script>

<h2 id="overview">Overview</h2>

<p>Toast displays brief notification messages.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Toasts with different colors"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={toastProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Dismissable,
        DismissableCode,
        ToastStackDemo,
        ToastStackDemoCode,
    } from "./toast/index";

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

<h2 id="dismissable">Dismissable</h2>

<p>Toasts can be closed by the user:</p>

<Demo
    title="Closable Toast"
    description="Click the X to dismiss"
    code={DismissableCode}
>
    <Dismissable />
</Demo>

<h2 id="toast-stack">Toast Stack</h2>

<p>
    Use <code>ToastStack</code> with the toast store for global notifications:
</p>

<Demo
    title="Global Toast Notifications"
    description="Click buttons to trigger toasts at the top-right"
    code={ToastStackDemoCode}
>
    <ToastStackDemo />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={toastProps} />

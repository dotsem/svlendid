<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./formfield/index";

    const formFieldProps = getComponentProps("FormField");
</script>

<h2 id="overview">Overview</h2>

<p>FormField wraps inputs with label, description, and error message.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Form fields with labels and validation"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={formFieldProps} />

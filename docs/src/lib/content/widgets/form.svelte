<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        SubmittedValues,
        SubmittedValuesCode,
    } from "./form/index";

    const formProps = getComponentProps("Form");
</script>

<h2 id="overview">Overview</h2>

<p>Form wraps form elements with spacing and submit handling.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Form with fields and submit button"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="submitted-values">Handling Submitted Values</h2>

<p>Display submitted form values in an alert:</p>

<Demo
    title="Form with Value Display"
    description="Submit to see the captured values"
    code={SubmittedValuesCode}
>
    <SubmittedValues />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={formProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Features,
        FeaturesCode,
    } from "./textarea/index";

    const textareaProps = getComponentProps("TextArea");
</script>

<h2 id="overview">Overview</h2>

<p>TextArea allows users to enter multi-line text content.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="TextArea with placeholder, value, and disabled states"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="features">Features</h2>

<p>TextArea supports character count and auto-resizing:</p>

<Demo
    title="TextArea Features"
    description="Character count and auto resize options"
    code={FeaturesCode}
>
    <Features />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={textareaProps} />

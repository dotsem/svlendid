<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Features,
        FeaturesCode,
        ValueBinding,
        ValueBindingCode,
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

<h2 id="value-binding">Value Binding</h2>

<p>Use <code>bind:value</code> for two-way binding with auto-resize:</p>

<Demo
    title="Reactive State with Auto-Resize"
    description="TextArea that grows as you type"
    code={ValueBindingCode}
>
    <ValueBinding />
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

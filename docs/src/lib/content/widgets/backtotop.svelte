<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./backtotop/index";

    const backToTopProps = getComponentProps("BackToTop");
</script>

<h2 id="overview">Overview</h2>

<p>BackToTop shows a floating button to scroll back to the top of the page.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Button appears after scrolling"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={backToTopProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./image/index";

    const imageProps = getComponentProps("Image");
</script>

<h2 id="overview">Overview</h2>

<p>Image component with loading skeleton and fallback support.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Image with fallback for broken URLs"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={imageProps} />

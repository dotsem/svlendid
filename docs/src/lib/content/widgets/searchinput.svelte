<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./searchinput/index";

    const searchInputProps = getComponentProps("SearchInput");
</script>

<h2 id="overview">Overview</h2>

<p>SearchInput provides a search field with icon and clear button.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Search input with full width"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={searchInputProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./tabs/index";

    const tabsProps = getComponentProps("Tabs");
</script>

<h2 id="overview">Overview</h2>

<p>
    Tabs organize content into separate views with accessible keyboard
    navigation.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Tabbed interface with content panels"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={tabsProps} />

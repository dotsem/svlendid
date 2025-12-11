<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Controlled,
        ControlledCode,
    } from "./tabs/index";

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

<h2 id="controlled">Controlled Tabs</h2>

<p>
    Use <code>bind:activeTab</code> to control the active tab programmatically:
</p>

<Demo
    title="Controlled State"
    description="Navigate tabs with buttons"
    code={ControlledCode}
>
    <Controlled />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={tabsProps} />

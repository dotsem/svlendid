<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        AdvancedEvents,
        AdvancedEventsCode,
    } from "./clickable/index";

    const clickableProps = getComponentProps("Clickable");
</script>

<h2 id="overview">Overview</h2>

<p>
    Clickable converts any element into an interactive component. It normalizes
    click events, adds keyboard accessibility (Enter/Space), and supports
    advanced interactions like double-click and long-press.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Clickable"
    description="Simple click interaction"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="advanced-events">Advanced Events</h2>

<p>
    Clickable supports double-click, right-click, and long-press events. When
    double-click is defined, single clicks are slightly delayed to distinguish
    between the two.
</p>

<Demo
    title="Advanced Interactions"
    description="Multiple event types"
    code={AdvancedEventsCode}
>
    <AdvancedEvents />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={clickableProps} />

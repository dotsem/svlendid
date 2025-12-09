<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        LazyLoad,
        LazyLoadCode,
    } from "./visible/index";

    const visibleProps = getComponentProps("Visible");
</script>

<h2 id="overview">Overview</h2>

<p>
    Visible uses the Intersection Observer API to detect when an element enters
    or leaves the viewport. It exposes the visibility state to its children and
    provides callbacks for state changes.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Visibility Detection"
    description="Detect when element is in view"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="lazy-loading">Lazy Loading</h2>

<p>
    Use <code>onenter</code> to trigger actions like loading more content (infinite
    scroll) or fetching images.
</p>

<Demo
    title="Infinite Scroll"
    description="Lazy loading content"
    code={LazyLoadCode}
>
    <LazyLoad />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={visibleProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Sizes,
        SizesCode,
    } from "./avatar/index";

    const avatarProps = getComponentProps("Avatar");
</script>

<h2 id="overview">Overview</h2>

<p>Avatar displays a user's image or initials as a fallback.</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Avatar with image, initials, and fallback"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="sizes">Sizes</h2>

<Demo
    title="Avatar Sizes"
    description="Five size options: xs, s, m, l, xl"
    code={SizesCode}
>
    <Sizes />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={avatarProps} />

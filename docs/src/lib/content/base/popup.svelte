<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import { BasicUsage, BasicUsageCode } from "./popup/index";

    const popupProps = getComponentProps("Popup");
</script>

<h2 id="overview">Overview</h2>

<p>
    Popup is dismissible without making a decision. It doesn't block the main
    interface & is closable with escape, clicking the cross or clicking outside.
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Basic Usage"
    description="Click button to toggle popup"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={popupProps} />

<script lang="ts">
    import { Demo, PropTable } from "$lib";
    import { getComponentProps } from "$lib/utils/component-docs";

    import {
        BasicUsage,
        BasicUsageCode,
        Shortcuts,
        ShortcutsCode,
    } from "./keyboard/index";

    const keyboardProps = getComponentProps("Keyboard");
</script>

<h2 id="overview">Overview</h2>

<p>
    Keyboard primitive simplifies handling keyboard events and defining
    shortcuts. It can listen to local events (when focused) or global events
    (window).
</p>

<h2 id="usage">Usage</h2>

<Demo
    title="Key Listener"
    description="Detect key presses when focused"
    code={BasicUsageCode}
>
    <BasicUsage />
</Demo>

<h2 id="shortcuts">Shortcuts</h2>

<p>
    Define keyboard shortcuts using the <code>shortcuts</code> prop. Supports
    modifier keys like <code>ctrl</code>, <code>alt</code>, and
    <code>shift</code>.
</p>

<Demo
    title="Keyboard Shortcuts"
    description="Handling complex key combinations"
    code={ShortcutsCode}
>
    <Shortcuts />
</Demo>

<h2 id="props">Props</h2>

<PropTable props={keyboardProps} />

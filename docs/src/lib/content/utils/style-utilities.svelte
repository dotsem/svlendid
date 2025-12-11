<script lang="ts">
    import { Card, Text, Column, Row } from "lib";
</script>

<h2 id="overview">Overview</h2>

<p>
    Svlendid provides style resolution utilities to convert theme tokens to CSS
    values. These are primarily used internally by components but can be useful
    for custom styling.
</p>

<h2 id="functions">Available Functions</h2>

<h3>Color Resolution</h3>
<ul>
    <li>
        <code>resolveColor(color, theme?)</code> - Resolves palette key to color
        or passes through custom value
    </li>
    <li>
        <code>getOnColor(color, theme?)</code> - Gets contrasting text color
        (e.g., <code>onPrimary</code> for <code>primary</code>)
    </li>
    <li>
        <code>getContainerColor(color, theme?)</code> - Gets container variant
        (e.g., <code>primaryContainer</code>)
    </li>
    <li>
        <code>getOnContainerColor(color, theme?)</code> - Gets contrast text for
        container variant
    </li>
</ul>

<h3>Layout Resolution</h3>
<ul>
    <li>
        <code>resolveSpacing(value, theme?)</code> - Resolves spacing token (xs,
        s, m, l, xl, 2xl, 3xl) or custom value
    </li>
    <li>
        <code>resolveSpacingArray(value, theme?)</code> - Resolves array of spacings
        to CSS string
    </li>
    <li>
        <code>resolveRadius(value, theme?)</code> - Resolves radius token (xs, s,
        m, l, xl, full) or custom value
    </li>
    <li>
        <code>resolveShadow(value, theme?)</code> - Resolves shadow token (xs, s,
        m, l, xl) or custom value
    </li>
</ul>

<h3>Flexbox Maps</h3>
<ul>
    <li><code>alignMap.start</code> → <code>flex-start</code></li>
    <li><code>alignMap.center</code> → <code>center</code></li>
    <li><code>alignMap.end</code> → <code>flex-end</code></li>
    <li><code>justifyMap.between</code> → <code>space-between</code></li>
    <li><code>justifyMap.around</code> → <code>space-around</code></li>
</ul>

<h2 id="theme-tokens">Theme Tokens Reference</h2>

<h3>Spacing Tokens</h3>
<Row gap="s" wrap>
    {#each ["xs", "s", "m", "l", "xl", "2xl", "3xl"] as token}
        <Card style="padding: 0.75rem; text-align: center; min-width: 60px;">
            <code>{token}</code>
        </Card>
    {/each}
</Row>

<h3>Radius Tokens</h3>
<Row gap="s" wrap style="margin-top: 1rem;">
    {#each ["xs", "s", "m", "l", "xl", "full"] as token}
        <Card style="padding: 0.75rem; text-align: center; min-width: 60px;">
            <code>{token}</code>
        </Card>
    {/each}
</Row>

<h3>Shadow Tokens</h3>
<Row gap="s" wrap style="margin-top: 1rem;">
    {#each ["xs", "s", "m", "l", "xl"] as token}
        <Card style="padding: 0.75rem; text-align: center; min-width: 60px;">
            <code>{token}</code>
        </Card>
    {/each}
</Row>

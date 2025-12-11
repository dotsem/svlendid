<script lang="ts">
    import { Row, Column, Card, Text } from "lib";
    import {
        lighten,
        darken,
        alpha,
        mix,
        complement,
        saturate,
        desaturate,
        adjustHue,
    } from "lib";

    const baseColor = "#6366f1";

    const examples = [
        { name: "Base Color", color: baseColor },
        { name: "lighten(20)", color: lighten(baseColor, 20) },
        { name: "darken(20)", color: darken(baseColor, 20) },
        { name: "alpha(0.5)", color: alpha(baseColor, 0.5) },
        { name: "complement", color: complement(baseColor) },
        { name: "saturate(30)", color: saturate(baseColor, 30) },
        { name: "desaturate(30)", color: desaturate(baseColor, 30) },
        { name: "adjustHue(90)", color: adjustHue(baseColor, 90) },
        { name: "mix with white", color: mix(baseColor, "#ffffff", 50) },
    ];
</script>

<h2 id="overview">Overview</h2>

<p>
    Svlendid provides SCSS-like color manipulation functions that work at
    runtime with any CSS color value.
</p>

<h2 id="examples">Visual Examples</h2>

<Row gap="s" wrap>
    {#each examples as { name, color }}
        <Card style="padding: 1rem; width: 140px;">
            <Column gap="s" alignItems="center">
                <div
                    style="width: 60px; height: 60px; border-radius: 8px; background: {color};"
                ></div>
                <Text variant="caption">{name}</Text>
                <Text
                    variant="caption"
                    style="font-family: monospace; font-size: 10px;"
                    >{color}</Text
                >
            </Column>
        </Card>
    {/each}
</Row>

<h2 id="functions">Available Functions</h2>

<h3>Lightness</h3>
<ul>
    <li><code>lighten(color, amount)</code> - Increase lightness by 0-100%</li>
    <li><code>darken(color, amount)</code> - Decrease lightness by 0-100%</li>
    <li><code>tint(color, amount)</code> - Mix with white</li>
    <li><code>shade(color, amount)</code> - Mix with black</li>
</ul>

<h3>Saturation</h3>
<ul>
    <li>
        <code>saturate(color, amount)</code> - Increase saturation by 0-100%
    </li>
    <li>
        <code>desaturate(color, amount)</code> - Decrease saturation by 0-100%
    </li>
    <li><code>grayscale(color)</code> - Remove all saturation</li>
</ul>

<h3>Hue</h3>
<ul>
    <li>
        <code>adjustHue(color, degrees)</code> - Rotate hue by -360 to 360 degrees
    </li>
    <li>
        <code>complement(color)</code> - Get complementary color (180° rotation)
    </li>
</ul>

<h3>Opacity</h3>
<ul>
    <li><code>alpha(color, value)</code> - Set alpha to 0-1</li>
    <li><code>transparentize(color, amount)</code> - Reduce opacity by 0-1</li>
    <li><code>opacify(color, amount)</code> - Increase opacity by 0-1</li>
</ul>

<h3>Mixing</h3>
<ul>
    <li>
        <code>mix(color1, color2, weight)</code> - Blend two colors, weight is 0-100
        for first color
    </li>
    <li><code>invert(color)</code> - Invert RGB values</li>
</ul>

<h3>Analysis</h3>
<ul>
    <li><code>luminance(color)</code> - Get relative luminance (0-1)</li>
    <li>
        <code>contrastRatio(color1, color2)</code> - Get WCAG contrast ratio
    </li>
    <li><code>isLight(color)</code> - Returns true if color is light</li>
    <li><code>isDark(color)</code> - Returns true if color is dark</li>
    <li>
        <code>readableColor(bgColor)</code> - Returns black or white for best contrast
    </li>
</ul>

<h2 id="parsing">Supported Color Formats</h2>

<ul>
    <li>
        <strong>Hex</strong>: <code>#rgb</code>, <code>#rrggbb</code>,
        <code>#rrggbbaa</code>
    </li>
    <li>
        <strong>RGB</strong>: <code>rgb(r, g, b)</code>,
        <code>rgba(r, g, b, a)</code>
    </li>
    <li>
        <strong>HSL</strong>: <code>hsl(h, s%, l%)</code>,
        <code>hsla(h, s%, l%, a)</code>
    </li>
</ul>

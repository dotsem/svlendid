<script lang="ts">
    import { Head, Card, Column, Text } from "lib";
</script>

<Head
    title="Example Page Title"
    titleTemplate="%s | My Website"
    description="This is an example page demonstrating all SEO meta tags"
    keywords={["svelte", "components", "ui", "library"]}
    canonical="https://example.com/page"
    ogImage="https://example.com/og-image.jpg"
    ogType="website"
    twitterCard="summary_large_image"
    robots="index, follow"
    themeColor="#6366f1"
/>

<Card style="padding: 1.5rem;">
    <Column gap="m">
        <Text variant="h4">SEO Tags Applied</Text>
        <Text variant="body2">
            This demo applies all available SEO meta tags. Check the page source
            to see:
        </Text>
        <ul style="margin: 0; padding-left: 1.5rem;">
            <li><code>&lt;title&gt;</code> with template</li>
            <li><code>description</code> meta tag</li>
            <li><code>keywords</code> meta tag</li>
            <li><code>canonical</code> link</li>
            <li>
                Open Graph tags (og:title, og:description, og:image, og:url,
                og:type)
            </li>
            <li>Twitter Card tags</li>
            <li><code>robots</code> directive</li>
            <li><code>theme-color</code> for mobile browsers</li>
        </ul>
    </Column>
</Card>

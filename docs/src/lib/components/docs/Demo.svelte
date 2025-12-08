<!-- 
    Demo component - Shows a live demo with toggleable source code
    
    Uses Shiki for syntax highlighting with One Dark Pro theme.
    
    When using ?raw imports, the code is automatically cleaned up:
    - Leading HTML comments are removed
    - The code is trimmed
-->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Row, Text, Clickable, Icon, Animate } from 'lib';
    import CodeBlock from './CodeBlock.svelte';

    interface Props {
        /** The demo content to render */
        children: Snippet;
        /** The source code to display */
        code: string;
        /** Title for the demo */
        title?: string;
        /** Description of what the demo shows */
        description?: string;
        /** Language for syntax highlighting */
        language?: string;
    }

    let {
        children,
        code,
        title,
        description,
        language = 'svelte',
    }: Props = $props();

    let showCode = $state(false);

    /**
     * Clean up raw code imports:
     * - Remove leading HTML comments (<!-- Demo: ... -->)
     * - Trim whitespace
     */
    function cleanCode(rawCode: string): string {
        return rawCode
            .replace(/^<!--[\s\S]*?-->\s*\n?/, '')
            .trim();
    }

    const displayCode = $derived(cleanCode(code));

    function toggleCode() {
        showCode = !showCode;
    }
</script>

<div class="demo-container">
    {#if title || description}
        <div class="demo-header">
            {#if title}
                <Text variant="h6" color="onSurface">{title}</Text>
            {/if}
            {#if description}
                <Text variant="body2" color="onSurfaceVariant">{description}</Text>
            {/if}
        </div>
    {/if}
    
    <div class="demo-preview">
        <div class="preview-content">
            {@render children()}
        </div>
    </div>

    <div class="demo-actions">
        <Clickable onclick={toggleCode}>
            <Row align="center" gap="xs" style="padding: 8px 12px;">
                <Icon name={showCode ? "ChevronUp" : "Code"} size={16} color={showCode ? "primary" : "onSurfaceVariant"} />
                <Text variant="caption" color={showCode ? "primary" : "onSurfaceVariant"}>
                    {showCode ? 'Hide Code' : 'Show Code'}
                </Text>
            </Row>
        </Clickable>
    </div>

    {#if showCode}
        <div class="demo-code">
            <Animate animation="fadeUp" duration={200}>
                <CodeBlock code={displayCode} {language} />
            </Animate>
        </div>
    {/if}
</div>

<style>
    .demo-container {
        border: 1px solid var(--color-border);
        border-radius: 12px;
        overflow: hidden;
        background: var(--color-surface);
        margin: 16px 0;
    }

    .demo-header {
        padding: 16px;
        border-bottom: 1px solid var(--color-border);
        background: var(--color-bg);
    }

    .demo-preview {
        padding: 24px;
        background: var(--color-bg);
        min-height: 80px;
    }
    
    .preview-content {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 60px;
    }

    .demo-actions {
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px;
        border-top: 1px solid var(--color-border);
        background: var(--color-surfaceVariant);
    }

    .demo-code {
        border-top: 1px solid var(--color-border);
    }

    .demo-code :global(.code-block) {
        border: none;
        border-radius: 0;
    }
</style>

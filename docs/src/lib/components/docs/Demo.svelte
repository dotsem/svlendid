<!-- 
    Demo component - Shows a live demo with toggleable source code
    Single source of truth: the code shown is the actual code rendered
-->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Box, Row, Text, Clickable, Icon, Animate } from 'lib';
    import CodeBlock from './CodeBlock.svelte';

    interface Props {
        /** The demo content to render */
        children: Snippet;
        /** The source code to display (should match the demo) */
        code: string;
        /** Title for the demo */
        title?: string;
        /** Description of what the demo shows */
        description?: string;
        /** Whether code is expanded by default */
        defaultExpanded?: boolean;
        /** Language for syntax highlighting */
        language?: string;
    }

    let {
        children,
        code,
        title,
        description,
        defaultExpanded = false,
        language = 'svelte',
    }: Props = $props();

    let showCode = $state(defaultExpanded);
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
        {@render children()}
    </div>

    <div class="demo-actions">
        <Clickable onclick={() => showCode = !showCode}>
            <Row align="center" gap="xs" style="padding: 8px 12px;">
                <Icon name={showCode ? "ChevronUp" : "Code"} size={16} color="onSurfaceVariant" />
                <Text variant="caption" color="onSurfaceVariant">
                    {showCode ? 'Hide Code' : 'View Code'}
                </Text>
            </Row>
        </Clickable>
    </div>

    {#if showCode}
        <div class="demo-code">
            <Animate animation="fadeUp" duration={200}>
                <CodeBlock {code} {language} />
            </Animate>
        </div>
    {/if}
</div>

<style>
    .demo-container {
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 12px;
        overflow: hidden;
        background: var(--color-surface, #f8f9fa);
        margin: 16px 0;
    }

    .demo-header {
        padding: 16px;
        border-bottom: 1px solid var(--color-border, #e5e7eb);
        background: var(--color-bg, #ffffff);
    }

    .demo-preview {
        padding: 24px;
        background: var(--color-bg, #ffffff);
        min-height: 80px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .demo-actions {
        display: flex;
        justify-content: flex-end;
        padding: 8px 12px;
        border-top: 1px solid var(--color-border, #e5e7eb);
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    .demo-code {
        border-top: 1px solid var(--color-border, #e5e7eb);
    }

    .demo-code :global(.code-block) {
        border: none;
        border-radius: 0;
    }
</style>

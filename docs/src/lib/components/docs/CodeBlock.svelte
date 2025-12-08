<!-- 
    CodeBlock component for displaying code with syntax highlighting
    Used in documentation to show example code
-->
<script lang="ts">
    import { Box, Row, Text, Clickable, Icon } from 'lib';

    interface Props {
        code: string;
        language?: string;
        filename?: string;
        showLineNumbers?: boolean;
    }

    let {
        code,
        language = 'svelte',
        filename,
        showLineNumbers = false,
    }: Props = $props();

    let copied = $state(false);

    async function copyCode() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    const lines = $derived(code.trim().split('\n'));
</script>

<div class="code-block">
    {#if filename || language}
        <div class="code-header">
            <Row align="center" gap="s">
                {#if filename}
                    <Text variant="caption" color="onSurfaceVariant">{filename}</Text>
                {:else}
                    <Text variant="caption" color="onSurfaceVariant">{language}</Text>
                {/if}
            </Row>
            <Clickable onclick={copyCode}>
                <Row align="center" gap="xs" style="padding: 4px 8px; border-radius: 4px;">
                    <Icon name={copied ? "Check" : "Copy"} size={14} color={copied ? "success" : "onSurfaceVariant"} />
                    <Text variant="caption" color={copied ? "success" : "onSurfaceVariant"}>
                        {copied ? 'Copied!' : 'Copy'}
                    </Text>
                </Row>
            </Clickable>
        </div>
    {/if}
    <pre class="code-content"><code class="language-{language}">{#if showLineNumbers}{#each lines as line, i}<span class="line-number">{i + 1}</span>{line}
{/each}{:else}{code.trim()}{/if}</code></pre>
</div>

<style>
    .code-block {
        border-radius: 8px;
        overflow: hidden;
        background: #1e1e2e;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background: rgba(0, 0, 0, 0.2);
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .code-content {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: #cdd6f4;
    }

    .code-content code {
        font-family: inherit;
    }

    .line-number {
        display: inline-block;
        width: 2em;
        margin-right: 1em;
        color: #6c7086;
        text-align: right;
        user-select: none;
    }
</style>

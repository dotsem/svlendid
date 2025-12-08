<!-- 
    CodeBlock component for displaying code with syntax highlighting
    Uses Shiki for syntax highlighting
-->
<script lang="ts">
    import { Row, Text, Clickable, Icon } from 'lib';
    import { highlightCode } from '$lib/utils/syntax-highlight';
    import { browser } from '$app/environment';

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
    let highlightedHtml = $state<string | null>(null);

    // Load syntax highlighting on client
    $effect(() => {
        if (browser && code) {
            highlightCode(code.trim(), language).then((html: string) => {
                highlightedHtml = html;
            });
        }
    });

    async function copyCode() {
        await navigator.clipboard.writeText(code);
        copied = true;
        setTimeout(() => copied = false, 2000);
    }

    // Add line numbers to code if needed
    function addLineNumbers(codeText: string): string {
        const lines = codeText.trim().split('\n');
        return lines.map((line, i) => 
            `<span class="line-number">${i + 1}</span>${line}`
        ).join('\n');
    }
    
    // Escape HTML for fallback display
    function escapeHtml(text: string): string {
        return text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    }
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
    
    <div class="code-content" class:with-line-numbers={showLineNumbers}>
        {#if highlightedHtml}
            <!-- Shiki highlighted code -->
            {@html highlightedHtml}
        {:else}
            <!-- Fallback plain text -->
            <pre><code class="language-{language}">{#if showLineNumbers}{@html addLineNumbers(code.trim())}{:else}{escapeHtml(code.trim())}{/if}</code></pre>
        {/if}
    </div>
</div>

<style>
    .code-block {
        border-radius: 8px;
        overflow: hidden;
        background: #282c34;
        border: 1px solid rgba(255, 255, 255, 0.1);
    }

    .code-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 8px 16px;
        background: #21252b;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .code-content {
        margin: 0;
        padding: 0;
        overflow-x: auto;
    }

    .code-content :global(pre) {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
        font-size: 13px;
        line-height: 1.6;
        background: transparent !important;
    }

    .code-content :global(code) {
        font-family: inherit;
        background: transparent !important;
    }

    /* Fallback styling */
    .code-content pre {
        margin: 0;
        padding: 16px;
        overflow-x: auto;
        font-family: 'Fira Code', 'Cascadia Code', 'JetBrains Mono', monospace;
        font-size: 13px;
        line-height: 1.6;
        color: #abb2bf;
    }

    .code-content code {
        font-family: inherit;
    }

    .line-number {
        display: inline-block;
        width: 2em;
        margin-right: 1em;
        color: #4b5263;
        text-align: right;
        user-select: none;
    }

    .with-line-numbers :global(.line::before) {
        counter-increment: line;
        content: counter(line);
        display: inline-block;
        width: 2em;
        margin-right: 1em;
        color: #4b5263;
        text-align: right;
        user-select: none;
    }
</style>

<!-- 
    Section - Creates a heading with automatic ID for TOC
-->
<script lang="ts">
    import type { Snippet } from 'svelte';
    import { Text } from 'lib';

    interface Props {
        title: string;
        id?: string;
        level?: 2 | 3 | 4;
        children?: Snippet;
    }

    let { title, id, level = 2, children }: Props = $props();

    const headingId = $derived(id || title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''));
</script>

{#if level === 2}
    <h2 {id}>{title}</h2>
{:else if level === 3}
    <h3 id={headingId}>{title}</h3>
{:else}
    <h4 id={headingId}>{title}</h4>
{/if}

{#if children}
    {@render children()}
{/if}

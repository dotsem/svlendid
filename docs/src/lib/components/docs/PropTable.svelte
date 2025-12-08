<!-- 
    PropTable - Documents component props with types, defaults, and descriptions
-->
<script lang="ts">
    import { Text, Box } from 'lib';

    export interface PropDefinition {
        name: string;
        type: string;
        default?: string;
        required?: boolean;
        description: string;
    }

    interface Props {
        props: PropDefinition[];
    }

    let { props }: Props = $props();
</script>

<div class="prop-table-container">
    <table class="prop-table">
        <thead>
            <tr>
                <th>Prop</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
            </tr>
        </thead>
        <tbody>
            {#each props as prop}
                <tr id="prop-{prop.name}">
                    <td class="prop-name">
                        <code>{prop.name}</code>
                        {#if prop.required}
                            <span class="required">*</span>
                        {/if}
                    </td>
                    <td class="prop-type">
                        <code>{prop.type}</code>
                    </td>
                    <td class="prop-default">
                        {#if prop.default !== undefined}
                            <code>{prop.default}</code>
                        {:else}
                            <span class="no-default">—</span>
                        {/if}
                    </td>
                    <td class="prop-description">
                        {prop.description}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
</div>

<style>
    .prop-table-container {
        overflow-x: auto;
        margin: 16px 0;
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 8px;
    }

    .prop-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
    }

    .prop-table th {
        text-align: left;
        padding: 12px 16px;
        background: var(--color-surfaceVariant, #f3f4f6);
        font-weight: 600;
        color: var(--color-onSurface, #1f2937);
        border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .prop-table td {
        padding: 12px 16px;
        border-bottom: 1px solid var(--color-border, #e5e7eb);
        vertical-align: top;
    }

    .prop-table tbody tr:last-child td {
        border-bottom: none;
    }

    .prop-table tbody tr:hover {
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    .prop-name code {
        font-family: 'Fira Code', monospace;
        font-size: 13px;
        color: var(--color-primary, #6366f1);
        background: var(--color-primaryContainer, #e0e7ff);
        padding: 2px 6px;
        border-radius: 4px;
    }

    .required {
        color: var(--color-error, #ef4444);
        margin-left: 2px;
    }

    .prop-type code {
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        color: var(--color-secondary, #22c55e);
        background: var(--color-secondaryContainer, #dcfce7);
        padding: 2px 6px;
        border-radius: 4px;
    }

    .prop-default code {
        font-family: 'Fira Code', monospace;
        font-size: 12px;
        color: var(--color-onSurfaceVariant, #6b7280);
        background: var(--color-surface, #eef1f3);
        padding: 2px 6px;
        border-radius: 4px;
    }

    .no-default {
        color: var(--color-onSurfaceVariant, #6b7280);
    }

    .prop-description {
        color: var(--color-onSurface, #1f2937);
        line-height: 1.5;
    }
</style>

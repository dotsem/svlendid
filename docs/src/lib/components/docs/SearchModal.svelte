<!-- 
    Search Modal - Global search for documentation
-->
<script lang="ts">
    import { Text, Row, Column, Icon, Box } from 'lib';
    import { searchOpen, searchQuery } from '$lib/stores/docs';
    import { navigation, getAllNavItems } from '$lib/data/navigation';
    import { goto } from '$app/navigation';

    let inputElement: HTMLInputElement | null = $state(null);

    const allItems = getAllNavItems();

    const filteredItems = $derived.by(() => {
        const query = $searchQuery.toLowerCase().trim();
        if (!query) return allItems.slice(0, 8); // Show recent/popular by default
        
        return allItems.filter(({ category, item }) => 
            item.title.toLowerCase().includes(query) ||
            item.description?.toLowerCase().includes(query) ||
            category.title.toLowerCase().includes(query)
        );
    });

    function close() {
        searchOpen.set(false);
        searchQuery.set('');
    }

    function selectItem(categorySlug: string, itemSlug: string) {
        goto(`/docs/${categorySlug}/${itemSlug}`);
        close();
    }

    function handleKeydown(e: KeyboardEvent) {
        if (e.key === 'Escape') {
            close();
        }
    }

    // Focus input when modal opens
    $effect(() => {
        if ($searchOpen && inputElement) {
            inputElement.focus();
        }
    });
</script>

{#if $searchOpen}
    <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
    <div class="search-overlay" onclick={close} onkeydown={handleKeydown} role="dialog" tabindex="-1">
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <!-- svelte-ignore a11y_no_static_element_interactions -->
        <div class="search-modal" onclick={(e) => e.stopPropagation()}>
            <div class="search-header">
                <Icon name="Search" size={20} color="onSurfaceVariant" />
                <input
                    bind:this={inputElement}
                    type="text"
                    placeholder="Search documentation..."
                    bind:value={$searchQuery}
                    class="search-input"
                />
                <button class="close-button" onclick={close}>
                    <kbd>esc</kbd>
                </button>
            </div>

            <div class="search-results">
                {#if filteredItems.length === 0}
                    <div class="no-results">
                        <Text variant="body2" color="onSurfaceVariant">No results found</Text>
                    </div>
                {:else}
                    {#each filteredItems as { category, item }}
                        <button
                            class="search-result"
                            onclick={() => selectItem(category.slug, item.slug)}
                        >
                            <div class="result-content">
                                <Text variant="body2" color="onSurface">{item.title}</Text>
                                <Text variant="caption" color="onSurfaceVariant">
                                    {category.title} • {item.description || ''}
                                </Text>
                            </div>
                            <Icon name="ArrowRight" size={16} color="onSurfaceVariant" />
                        </button>
                    {/each}
                {/if}
            </div>

            <div class="search-footer">
                <Row gap="m">
                    <Row align="center" gap="xs">
                        <kbd>↑</kbd><kbd>↓</kbd>
                        <Text variant="caption" color="onSurfaceVariant">Navigate</Text>
                    </Row>
                    <Row align="center" gap="xs">
                        <kbd>↵</kbd>
                        <Text variant="caption" color="onSurfaceVariant">Select</Text>
                    </Row>
                    <Row align="center" gap="xs">
                        <kbd>esc</kbd>
                        <Text variant="caption" color="onSurfaceVariant">Close</Text>
                    </Row>
                </Row>
            </div>
        </div>
    </div>
{/if}

<style>
    .search-overlay {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        align-items: flex-start;
        justify-content: center;
        padding-top: 100px;
        z-index: 1000;
        backdrop-filter: blur(4px);
    }

    .search-modal {
        width: 100%;
        max-width: 600px;
        background: var(--color-bg, #ffffff);
        border-radius: 12px;
        box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
        overflow: hidden;
        margin: 0 16px;
    }

    .search-header {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px;
        border-bottom: 1px solid var(--color-border, #e5e7eb);
    }

    .search-input {
        flex: 1;
        border: none;
        outline: none;
        font-size: 16px;
        background: transparent;
        color: var(--color-onSurface, #1f2937);
    }

    .search-input::placeholder {
        color: var(--color-onSurfaceVariant, #6b7280);
    }

    .close-button {
        background: none;
        border: none;
        cursor: pointer;
        padding: 4px;
    }

    .close-button kbd {
        font-family: inherit;
        font-size: 11px;
        padding: 4px 8px;
        background: var(--color-surfaceVariant, #f3f4f6);
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 4px;
        color: var(--color-onSurfaceVariant, #6b7280);
    }

    .search-results {
        max-height: 400px;
        overflow-y: auto;
    }

    .no-results {
        padding: 32px;
        text-align: center;
    }

    .search-result {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 12px 16px;
        background: none;
        border: none;
        cursor: pointer;
        text-align: left;
        transition: background 0.15s ease;
    }

    .search-result:hover {
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    .result-content {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }

    .search-footer {
        padding: 12px 16px;
        border-top: 1px solid var(--color-border, #e5e7eb);
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    .search-footer kbd {
        font-family: inherit;
        font-size: 11px;
        padding: 2px 6px;
        background: var(--color-bg, #ffffff);
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 4px;
        color: var(--color-onSurfaceVariant, #6b7280);
    }
</style>

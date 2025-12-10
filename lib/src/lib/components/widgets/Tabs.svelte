<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Tabs - A tabbed navigation component
     */
    interface Tab {
        id: string;
        label: string;
        disabled?: boolean;
        icon?: Snippet;
    }

    interface Props {
        /** List of tabs */
        tabs: Tab[];
        /** Currently active tab ID */
        activeTab?: string;
        /** Full width tabs */
        fullWidth?: boolean;
        /** Color scheme */
        color?: ColorPalette;
        /** Tab content slot */
        children?: Snippet<[string]>;
        /** Tab change handler */
        onchange?: (tabId: string) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        tabs,
        activeTab = $bindable(tabs[0]?.id ?? ""),
        fullWidth = false,
        color = "primary",
        children,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    function handleTabClick(tabId: string) {
        activeTab = tabId;
        onchange?.(tabId);
    }

    function handleKeydown(event: KeyboardEvent, index: number) {
        let newIndex = index;

        if (event.key === "ArrowRight") {
            newIndex = (index + 1) % tabs.length;
        } else if (event.key === "ArrowLeft") {
            newIndex = (index - 1 + tabs.length) % tabs.length;
        } else if (event.key === "Home") {
            newIndex = 0;
        } else if (event.key === "End") {
            newIndex = tabs.length - 1;
        } else {
            return;
        }

        event.preventDefault();
        const newTab = tabs[newIndex];
        if (newTab && !newTab.disabled) {
            handleTabClick(newTab.id);
        }
    }
</script>

<div
    class="tabs-container"
    style:--tabs-color={computedColor}
    style:--tabs-transition={theme.transitions.fast}
    {...props}
>
    <div class="tabs-list" class:full-width={fullWidth} role="tablist">
        {#each tabs as tab, index}
            <button
                class="tab"
                class:active={activeTab === tab.id}
                class:disabled={tab.disabled}
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls="panel-{tab.id}"
                tabindex={activeTab === tab.id ? 0 : -1}
                disabled={tab.disabled}
                onclick={() => handleTabClick(tab.id)}
                onkeydown={(e) => handleKeydown(e, index)}
            >
                {#if tab.icon}
                    <span class="tab-icon">{@render tab.icon()}</span>
                {/if}
                <span class="tab-label">{tab.label}</span>
            </button>
        {/each}
        <div
            class="tabs-indicator"
            style:--active-index={tabs.findIndex((t) => t.id === activeTab)}
        ></div>
    </div>

    {#if children}
        <div
            class="tab-panel"
            role="tabpanel"
            id="panel-{activeTab}"
            aria-labelledby="tab-{activeTab}"
        >
            {@render children(activeTab)}
        </div>
    {/if}
</div>

<style>
    .tabs-container {
        width: 100%;
    }

    .tabs-list {
        position: relative;
        display: flex;
        gap: 0;
        border-bottom: 1px solid
            color-mix(in srgb, var(--tabs-color) 20%, transparent);

        &.full-width .tab {
            flex: 1;
        }
    }

    .tab {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        padding: 0.75rem 1.5rem;
        font-family: inherit;
        font-size: 0.875rem;
        font-weight: 500;
        color: inherit;
        background: transparent;
        border: none;
        cursor: pointer;
        opacity: 0.7;
        transition:
            opacity var(--tabs-transition) ease,
            color var(--tabs-transition) ease;

        &:hover:not(.disabled) {
            opacity: 1;
        }

        &.active {
            opacity: 1;
            color: var(--tabs-color);
        }

        &.disabled {
            opacity: 0.4;
            cursor: not-allowed;
        }

        &:focus-visible {
            outline: 2px solid var(--tabs-color);
            outline-offset: -2px;
        }

        &::after {
            content: "";
            position: absolute;
            bottom: -1px;
            left: 0;
            right: 0;
            height: 2px;
            background: var(--tabs-color);
            transform: scaleX(0);
            transition: transform var(--tabs-transition) ease;
        }

        &.active::after {
            transform: scaleX(1);
        }
    }

    .tab-icon {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .tab-panel {
        padding-top: 1rem;
    }
</style>

<!-- 
    Sidebar navigation for documentation
-->
<script lang="ts">
    import { page } from "$app/stores";
    import { Text, Column, Row, Icon, Clickable, Box, Badge } from "lib";
    import { navigation } from "$lib/data/navigation";
    import { sidebarOpen } from "$lib/stores/docs";

    // Track expanded categories
    let expandedCategories = $state<Set<string>>(
        new Set(navigation.map((c) => c.slug))
    );

    function toggleCategory(slug: string) {
        if (expandedCategories.has(slug)) {
            expandedCategories.delete(slug);
        } else {
            expandedCategories.add(slug);
        }
        expandedCategories = new Set(expandedCategories);
    }

    function isActive(categorySlug: string, itemSlug: string): boolean {
        return $page.url.pathname === `/docs/${categorySlug}/${itemSlug}`;
    }

    function closeSidebar() {
        sidebarOpen.set(false);
    }

    function closeSidebarOnMobile() {
        if (window.innerWidth < 1024) {
            closeSidebar();
        }
    }
</script>

<!-- Mobile overlay -->
{#if $sidebarOpen}
    <div
        class="sidebar-overlay"
        onclick={closeSidebar}
        onkeydown={(e) => e.key === "Escape" && closeSidebar()}
        role="button"
        tabindex="-1"
        aria-label="Close sidebar"
    ></div>
{/if}

<aside class="sidebar" class:open={$sidebarOpen}>
    <div class="sidebar-header">
        <a href="/" class="logo">
            <Text variant="h5" color="primary">Svlendid</Text>
        </a>
        <Row align="center" gap="s">
            <Text variant="caption" color="onSurfaceVariant">v0.0.1</Text>
            <button
                class="close-btn"
                onclick={closeSidebar}
                aria-label="Close sidebar"
            >
                <Icon name="X" size={20} />
            </button>
        </Row>
    </div>

    <nav class="sidebar-nav">
        {#each navigation as category}
            <div class="nav-category">
                <Clickable onclick={() => toggleCategory(category.slug)}>
                    <div class="category-header">
                        <Row align="center" gap="s">
                            {#if category.icon}
                                <Icon
                                    name={category.icon}
                                    size={16}
                                    color="onSurfaceVariant"
                                />
                            {/if}
                            <Text
                                variant="body2"
                                color="onSurfaceVariant"
                                style="font-weight: 600;"
                            >
                                {category.title}
                            </Text>
                        </Row>
                        <Icon
                            name={expandedCategories.has(category.slug)
                                ? "ChevronDown"
                                : "ChevronRight"}
                            size={14}
                            color="onSurfaceVariant"
                        />
                    </div>
                </Clickable>

                {#if expandedCategories.has(category.slug)}
                    <div class="category-items">
                        {#each category.items as item}
                            <a
                                href="/docs/{category.slug}/{item.slug}"
                                class="nav-item"
                                class:active={isActive(
                                    category.slug,
                                    item.slug
                                )}
                                onclick={closeSidebarOnMobile}
                            >
                                <Row align="center" justify="between">
                                    <Text
                                        variant="body2"
                                        color={isActive(
                                            category.slug,
                                            item.slug
                                        )
                                            ? "primary"
                                            : "onSurface"}
                                    >
                                        {item.title}
                                    </Text>
                                    {#if item.badge}
                                        <Badge
                                            inline
                                            content={item.badge}
                                            color="primary"
                                        />
                                    {/if}
                                </Row>
                            </a>
                        {/each}
                    </div>
                {/if}
            </div>
        {/each}
    </nav>
</aside>

<style>
    .sidebar-overlay {
        display: none;
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.5);
        z-index: 99;
    }

    .sidebar {
        width: 260px;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        background: var(--color-bg);
        border-right: 1px solid var(--color-border);
        overflow-y: auto;
        z-index: 100;
    }

    .sidebar-header {
        padding: 20px 16px;
        border-bottom: 1px solid var(--color-border);
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .logo {
        text-decoration: none;
    }

    .close-btn {
        display: none;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        padding: 0;
        background: transparent;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        color: inherit;
        transition: background 0.15s ease;

        &:hover {
            background: var(--color-surfaceVariant);
        }
    }

    .sidebar-nav {
        padding: 16px 0;
    }

    .nav-category {
        margin-bottom: 8px;
    }

    .category-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 16px;
        cursor: pointer;
    }

    .category-header:hover {
        background: var(--color-surfaceVariant);
    }

    .category-items {
        padding-left: 16px;
    }

    .nav-item {
        display: block;
        padding: 8px 16px;
        text-decoration: none;
        border-radius: 0 8px 8px 0;
        margin-right: 8px;
        transition: background 0.15s ease;
    }

    .nav-item:hover {
        background: var(--color-surfaceVariant);
    }

    .nav-item.active {
        background: var(--color-primaryContainer);
    }

    @media (max-width: 1023px) {
        .sidebar-overlay {
            display: block;
        }

        .sidebar {
            transform: translateX(-100%);
            transition: transform 0.3s ease;
        }

        .sidebar.open {
            transform: translateX(0);
        }

        .close-btn {
            display: flex;
        }
    }
</style>

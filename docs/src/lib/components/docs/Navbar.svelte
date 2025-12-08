<!-- 
    Navbar with search functionality
-->
<script lang="ts">
    import { Row, Text, Icon, Clickable, Box } from 'lib';
    import { sidebarOpen, searchOpen } from '$lib/stores/docs';

    function toggleSidebar() {
        sidebarOpen.update(v => !v);
    }

    function openSearch() {
        searchOpen.set(true);
    }

    // Keyboard shortcut for search (Cmd/Ctrl + K)
    function handleKeydown(e: KeyboardEvent) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            openSearch();
        }
    }
</script>

<svelte:window onkeydown={handleKeydown} />

<header class="navbar">
    <div class="navbar-left">
        <button class="menu-button" onclick={toggleSidebar}>
            <Icon name="Menu" size={20} color="onSurface" />
        </button>
        <a href="/docs" class="nav-logo">
            <Text variant="h6" color="primary">Svlendid</Text>
        </a>
    </div>

    <div class="navbar-center">
        <Clickable onclick={openSearch}>
            <div class="search-trigger">
                <Icon name="Search" size={16} color="onSurfaceVariant" />
                <Text variant="body2" color="onSurfaceVariant">Search docs...</Text>
                <div class="search-shortcut">
                    <kbd>⌘</kbd>
                    <kbd>K</kbd>
                </div>
            </div>
        </Clickable>
    </div>

    <div class="navbar-right">
        <a href="https://github.com/your-repo/svlendid" target="_blank" rel="noopener" class="nav-link">
            <Icon name="Github" size={20} color="onSurfaceVariant" />
        </a>
    </div>
</header>

<style>
    .navbar {
        position: fixed;
        top: 0;
        left: 260px;
        right: 0;
        height: 60px;
        background: var(--color-bg, #ffffff);
        border-bottom: 1px solid var(--color-border, #e5e7eb);
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 24px;
        z-index: 50;
    }

    .navbar-left {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .menu-button {
        display: none;
        padding: 8px;
        background: none;
        border: none;
        cursor: pointer;
        border-radius: 8px;
    }

    .menu-button:hover {
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    .nav-logo {
        text-decoration: none;
        display: none;
    }

    .navbar-center {
        flex: 1;
        max-width: 400px;
        margin: 0 24px;
    }

    .search-trigger {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 8px 16px;
        background: var(--color-surfaceVariant, #f3f4f6);
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 8px;
        cursor: pointer;
        transition: border-color 0.15s ease;
    }

    .search-trigger:hover {
        border-color: var(--color-primary, #6366f1);
    }

    .search-shortcut {
        display: flex;
        gap: 4px;
        margin-left: auto;
    }

    .search-shortcut kbd {
        font-family: inherit;
        font-size: 11px;
        padding: 2px 6px;
        background: var(--color-bg, #ffffff);
        border: 1px solid var(--color-border, #e5e7eb);
        border-radius: 4px;
        color: var(--color-onSurfaceVariant, #6b7280);
    }

    .navbar-right {
        display: flex;
        align-items: center;
        gap: 16px;
    }

    .nav-link {
        display: flex;
        align-items: center;
        padding: 8px;
        border-radius: 8px;
        transition: background 0.15s ease;
    }

    .nav-link:hover {
        background: var(--color-surfaceVariant, #f3f4f6);
    }

    @media (max-width: 1023px) {
        .navbar {
            left: 0;
        }

        .menu-button {
            display: flex;
        }

        .nav-logo {
            display: block;
        }
    }

    @media (max-width: 640px) {
        .search-shortcut {
            display: none;
        }
    }
</style>

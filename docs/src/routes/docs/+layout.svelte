<script lang="ts">
    import { ThemeProvider, type ThemeConfig } from 'lib';
    import { Sidebar, Navbar, TableOfContents, SearchModal, sidebarOpen } from '$lib';

    let { children } = $props();
</script>

<ThemeProvider>
    <div class="docs-layout">
        <Sidebar />
        <Navbar />
        
        <main class="docs-main" class:sidebar-open={$sidebarOpen}>
            {@render children()}
        </main>

        <TableOfContents />
        <SearchModal />
    </div>
</ThemeProvider>

<style>
    :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        background: var(--color-bg, #ffffff);
    }

    :global(*) {
        box-sizing: border-box;
    }

    :global(a) {
        color: inherit;
    }

    .docs-layout {
        min-height: 100vh;
    }

    .docs-main {
        margin-left: 260px;
        margin-right: 220px;
        padding-top: 60px;
        min-height: 100vh;
    }

    @media (max-width: 1279px) {
        .docs-main {
            margin-right: 0;
        }
    }

    @media (max-width: 1023px) {
        .docs-main {
            margin-left: 0;
        }
    }
</style>

// Documentation Components
export { default as CodeBlock } from './components/docs/CodeBlock.svelte';
export { default as Demo } from './components/docs/Demo.svelte';
export { default as PropTable, type PropDefinition } from './components/docs/PropTable.svelte';
export { default as Sidebar } from './components/docs/Sidebar.svelte';
export { default as Navbar } from './components/docs/Navbar.svelte';
export { default as TableOfContents } from './components/docs/TableOfContents.svelte';
export { default as SearchModal } from './components/docs/SearchModal.svelte';
export { default as DocPage } from './components/docs/DocPage.svelte';
export { default as Section } from './components/docs/Section.svelte';

// Data
export { navigation, getAllNavItems, findNavItem, getAdjacentItems } from './data/navigation';

// Stores
export { sidebarOpen, searchOpen, searchQuery, tableOfContents, activeHeading } from './stores/docs';

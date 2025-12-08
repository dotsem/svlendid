/**
 * Documentation state stores
 */
import { writable } from 'svelte/store';

/** Sidebar open state (for mobile) */
export const sidebarOpen = writable(false);

/** Search query */
export const searchQuery = writable('');

/** Search modal open state */
export const searchOpen = writable(false);

/** Current active heading for TOC highlighting */
export const activeHeading = writable<string | null>(null);

/** Table of contents entries for current page */
export interface TocEntry {
    id: string;
    title: string;
    level: number;
}

export const tableOfContents = writable<TocEntry[]>([]);

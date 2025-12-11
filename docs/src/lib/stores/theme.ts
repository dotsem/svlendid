/**
 * Global theme store for dark/light mode
 * Persists theme preference to localStorage
 */
import { writable } from "svelte/store";
import { browser } from "$app/environment";

// Get initial dark mode preference
function getInitialDarkMode(): boolean {
    if (!browser) return false;

    // Check localStorage first
    const stored = localStorage.getItem("theme");
    if (stored) {
        return stored === "dark";
    }

    // Fall back to system preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

// Create the store
function createThemeStore() {
    const { subscribe, set, update } = writable(getInitialDarkMode());

    return {
        subscribe,
        toggle: () => {
            update((dark) => {
                const newValue = !dark;
                if (browser) {
                    localStorage.setItem("theme", newValue ? "dark" : "light");
                    // Update document class for global CSS
                    document.documentElement.classList.toggle("dark", newValue);
                }
                return newValue;
            });
        },
        set: (dark: boolean) => {
            set(dark);
            if (browser) {
                localStorage.setItem("theme", dark ? "dark" : "light");
                document.documentElement.classList.toggle("dark", dark);
            }
        },
        init: () => {
            // Initialize on mount
            if (browser) {
                const dark = getInitialDarkMode();
                set(dark);
                document.documentElement.classList.toggle("dark", dark);
            }
        },
    };
}

export const darkMode = createThemeStore();

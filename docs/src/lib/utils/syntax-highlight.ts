/**
 * Syntax highlighting utilities using Shiki
 */
import { createHighlighter, type Highlighter, type BundledLanguage, type BundledTheme } from 'shiki';

let highlighterPromise: Promise<Highlighter> | null = null;

/**
 * Get or create the shared highlighter instance
 */
export async function getHighlighter(): Promise<Highlighter> {
    if (!highlighterPromise) {
        highlighterPromise = createHighlighter({
            themes: ['one-dark-pro', 'github-light'],
            langs: ['svelte', 'typescript', 'javascript', 'html', 'css', 'json', 'bash', 'shell'],
        });
    }
    return highlighterPromise;
}

/**
 * Highlight code with syntax highlighting
 */
export async function highlightCode(
    code: string, 
    language: string = 'svelte',
    theme: 'dark' | 'light' = 'dark'
): Promise<string> {
    try {
        const highlighter = await getHighlighter();
        const themeId: BundledTheme = theme === 'dark' ? 'one-dark-pro' : 'github-light';
        
        // Map common language aliases
        const langMap: Record<string, BundledLanguage> = {
            'svelte': 'svelte',
            'ts': 'typescript',
            'typescript': 'typescript',
            'js': 'javascript',
            'javascript': 'javascript',
            'html': 'html',
            'css': 'css',
            'json': 'json',
            'bash': 'bash',
            'sh': 'shell',
            'shell': 'shell',
        };
        
        const lang = langMap[language.toLowerCase()] || 'svelte';
        
        return highlighter.codeToHtml(code, {
            lang,
            theme: themeId,
        });
    } catch (e) {
        console.error('Syntax highlighting failed:', e);
        // Fallback to plain text
        return `<pre><code>${escapeHtml(code)}</code></pre>`;
    }
}

/**
 * Escape HTML special characters
 */
function escapeHtml(text: string): string {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

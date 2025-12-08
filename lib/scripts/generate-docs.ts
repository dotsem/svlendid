/**
 * Component Documentation Generator
 * Extracts props, types, and JSDoc from Svelte 5 components
 * 
 * Usage: npx tsx scripts/generate-docs.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

interface PropInfo {
    name: string;
    type: string;
    default?: string;
    required: boolean;
    description: string;
}

interface ComponentDoc {
    name: string;
    description: string;
    example?: string;
    props: PropInfo[];
    snippets: string[];
    filePath: string;
}

interface DocsData {
    generatedAt: string;
    components: Record<string, ComponentDoc>;
}

const COMPONENTS_DIR = path.join(__dirname, '../src/lib/components');
const OUTPUT_FILE = path.join(__dirname, '../docs-data/components.json');

/**
 * Extract props interface from component content
 */
function extractProps(content: string): PropInfo[] {
    const props: PropInfo[] = [];
    
    // Find the interface Props block
    const interfaceMatch = content.match(/interface Props\s*\{([^}]+(?:\{[^}]*\}[^}]*)*)\}/s);
    if (!interfaceMatch) return props;
    
    const interfaceContent = interfaceMatch[1];
    
    // Parse each property line
    const lines = interfaceContent.split('\n');
    let currentComment = '';
    
    for (const line of lines) {
        const trimmed = line.trim();
        
        // Collect JSDoc comments
        if (trimmed.startsWith('/**') || trimmed.startsWith('*') || trimmed.startsWith('//')) {
            const commentText = trimmed
                .replace(/^\/\*\*\s*/, '')
                .replace(/^\*\s*/, '')
                .replace(/^\*\/\s*$/, '')
                .replace(/\s*\*\/\s*$/, '')
                .replace(/^\/\/\s*/, '')
                .trim();
            if (commentText && !commentText.startsWith('@') && commentText !== '/') {
                currentComment += (currentComment ? ' ' : '') + commentText;
            }
            continue;
        }
        
        // Parse property definition
        const propMatch = trimmed.match(/^(\w+)(\?)?:\s*(.+?);?\s*$/);
        if (propMatch) {
            const [, name, optional, type] = propMatch;
            
            // Skip internal props
            if (name === 'children' || name.startsWith('[')) {
                currentComment = '';
                continue;
            }
            
            props.push({
                name,
                type: type.replace(/;$/, '').trim(),
                required: !optional,
                description: currentComment || '',
            });
            currentComment = '';
        }
    }
    
    return props;
}

/**
 * Extract default values from $props() destructuring
 */
function extractDefaults(content: string): Record<string, string> {
    const defaults: Record<string, string> = {};
    
    // Find the let { ... } = $props() destructuring
    const propsMatch = content.match(/let\s*\{([^}]+)\}\s*(?::\s*Props)?\s*=\s*\$props\(\)/s);
    if (!propsMatch) return defaults;
    
    const destructure = propsMatch[1];
    
    // Parse each default value
    const defaultMatches = destructure.matchAll(/(\w+)\s*=\s*([^,\n]+)/g);
    for (const match of defaultMatches) {
        const [, name, value] = match;
        defaults[name] = value.trim();
    }
    
    return defaults;
}

/**
 * Extract component-level JSDoc
 */
function extractComponentDoc(content: string): { description: string; example?: string } {
    const docMatch = content.match(/\/\*\*\s*\n\s*\*\s*@component\s+(\w+)\s*\n([^*]*(?:\*[^/][^*]*)*)\*\//s);
    
    if (!docMatch) {
        return { description: '' };
    }
    
    const docContent = docMatch[2];
    let description = '';
    let example = '';
    
    const lines = docContent.split('\n');
    let inExample = false;
    
    for (const line of lines) {
        const trimmed = line.replace(/^\s*\*\s?/, '').trim();
        
        if (trimmed.startsWith('@example')) {
            inExample = true;
            continue;
        }
        
        if (inExample) {
            example += (example ? '\n' : '') + trimmed;
        } else if (trimmed && !trimmed.startsWith('@')) {
            description += (description ? ' ' : '') + trimmed;
        }
    }
    
    return { description, example: example || undefined };
}

/**
 * Extract snippet props (Svelte 5 snippets)
 */
function extractSnippets(content: string): string[] {
    const snippets: string[] = [];
    const snippetMatches = content.matchAll(/(\w+)\??:\s*Snippet/g);
    
    for (const match of snippetMatches) {
        if (match[1] !== 'children') {
            snippets.push(match[1]);
        }
    }
    
    return snippets;
}

/**
 * Process a single component file
 */
function processComponent(filePath: string): ComponentDoc | null {
    const content = fs.readFileSync(filePath, 'utf-8');
    const fileName = path.basename(filePath, '.svelte');
    
    // Skip non-component files
    if (!content.includes('interface Props')) {
        return null;
    }
    
    const { description, example } = extractComponentDoc(content);
    const props = extractProps(content);
    const defaults = extractDefaults(content);
    const snippets = extractSnippets(content);
    
    // Merge defaults into props
    for (const prop of props) {
        if (defaults[prop.name]) {
            prop.default = defaults[prop.name];
        }
    }
    
    return {
        name: fileName,
        description,
        example,
        props,
        snippets,
        filePath: path.relative(COMPONENTS_DIR, filePath),
    };
}

/**
 * Recursively find all .svelte files
 */
function findSvelteFiles(dir: string): string[] {
    const files: string[] = [];
    
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
            files.push(...findSvelteFiles(fullPath));
        } else if (entry.name.endsWith('.svelte')) {
            files.push(fullPath);
        }
    }
    
    return files;
}

/**
 * Main generator function
 */
function generateDocs(): void {
    console.log('🔍 Scanning components...');
    
    const svelteFiles = findSvelteFiles(COMPONENTS_DIR);
    const components: Record<string, ComponentDoc> = {};
    
    for (const file of svelteFiles) {
        const doc = processComponent(file);
        if (doc) {
            components[doc.name] = doc;
            console.log(`  ✓ ${doc.name}`);
        }
    }
    
    const docsData: DocsData = {
        generatedAt: new Date().toISOString(),
        components,
    };
    
    // Ensure output directory exists
    fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
    
    // Write JSON output
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(docsData, null, 2));
    
    console.log(`\n✅ Generated documentation for ${Object.keys(components).length} components`);
    console.log(`📄 Output: ${OUTPUT_FILE}`);
}

// Run generator
generateDocs();

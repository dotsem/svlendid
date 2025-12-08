/**
 * Component Documentation Data Utilities
 * 
 * Loads and provides access to auto-generated component documentation
 * from the lib package's docs-data/components.json
 */

// Import the generated docs data
// @ts-ignore - JSON import
import docsData from 'lib/docs-data';

export interface PropInfo {
    name: string;
    type: string;
    default?: string;
    required: boolean;
    description: string;
}

export interface ComponentDoc {
    name: string;
    description: string;
    example?: string;
    props: PropInfo[];
    snippets: string[];
    filePath: string;
}

export interface DocsData {
    generatedAt: string;
    components: Record<string, ComponentDoc>;
}

/**
 * Get documentation for all components
 */
export function getAllComponents(): Record<string, ComponentDoc> {
    return (docsData as DocsData).components;
}

/**
 * Get documentation for a specific component by name
 */
export function getComponentDoc(name: string): ComponentDoc | undefined {
    return (docsData as DocsData).components[name];
}

/**
 * Get props for a component, formatted for PropTable
 */
export function getComponentProps(name: string): PropInfo[] {
    const doc = getComponentDoc(name);
    return doc?.props ?? [];
}

/**
 * Get the generation timestamp
 */
export function getGeneratedAt(): string {
    return (docsData as DocsData).generatedAt;
}

/**
 * Get all component names
 */
export function getComponentNames(): string[] {
    return Object.keys((docsData as DocsData).components);
}

/**
 * Search components by name or description
 */
export function searchComponents(query: string): ComponentDoc[] {
    const q = query.toLowerCase();
    return Object.values((docsData as DocsData).components).filter(
        comp => 
            comp.name.toLowerCase().includes(q) ||
            comp.description.toLowerCase().includes(q)
    );
}

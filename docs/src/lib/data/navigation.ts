/**
 * Documentation navigation structure
 * Single source of truth for sidebar and routing
 */

export interface NavItem {
    title: string;
    slug: string;
    description?: string;
}

export interface NavCategory {
    title: string;
    slug: string;
    icon?: string;
    items: NavItem[];
}

export const navigation: NavCategory[] = [
    {
        title: "Getting Started",
        slug: "getting-started",
        icon: "Rocket",
        items: [
            { title: "Introduction", slug: "introduction", description: "What is Svlendid?" },
            { title: "Installation", slug: "installation", description: "How to install Svlendid" },
            { title: "Quick Start", slug: "quick-start", description: "Get up and running quickly" },
        ]
    },
    {
        title: "Configuration",
        slug: "config",
        icon: "Settings",
        items: [
            { title: "Theme Provider", slug: "theme-provider", description: "Set up theming for your app" },
            { title: "Colors", slug: "colors", description: "Color palette configuration" },
            { title: "Spacing", slug: "spacing", description: "Spacing scale configuration" },
            { title: "Typography", slug: "typography", description: "Font configuration" },
            { title: "Shadows", slug: "shadows", description: "Box shadow configuration" },
            { title: "Radius", slug: "radius", description: "Border radius configuration" },
        ]
    },
    {
        title: "Base",
        slug: "base",
        icon: "Box",
        items: [
            { title: "Button", slug: "button", description: "Interactive button component" },
            { title: "Text", slug: "text", description: "Typography component" },
            { title: "Card", slug: "card", description: "Card container component" },
            { title: "Input", slug: "input", description: "Text input component" },
            { title: "Divider", slug: "divider", description: "Visual separator" },
            { title: "Icon", slug: "icon", description: "Lucide icon component" },
            { title: "Tooltip", slug: "tooltip", description: "Tooltip overlay" },
        ]
    },
    {
        title: "Layout",
        slug: "layout",
        icon: "Layout",
        items: [
            { title: "Box", slug: "box", description: "Fundamental layout container" },
            { title: "Flex", slug: "flex", description: "Flexbox container" },
            { title: "Stack", slug: "stack", description: "Stacked layout (absolute)" },
            { title: "Column", slug: "column", description: "Vertical flex container" },
            { title: "Row", slug: "row", description: "Horizontal flex container" },
            { title: "Center", slug: "center", description: "Center content" },
            { title: "Spacer", slug: "spacer", description: "Flexible space" },
            { title: "Expanded", slug: "expanded", description: "Expand to fill space" },
            { title: "Container", slug: "container", description: "Max-width container" },
        ]
    },
    {
        title: "Primitives",
        slug: "primitives",
        icon: "Layers",
        items: [
            { title: "Clickable", slug: "clickable", description: "Make anything clickable" },
            { title: "Hoverable", slug: "hoverable", description: "Hover state wrapper" },
            { title: "Draggable", slug: "draggable", description: "Drag interaction" },
            { title: "Followable", slug: "followable", description: "Mouse follow effect" },
            { title: "Keyboard", slug: "keyboard", description: "Keyboard shortcuts" },
            { title: "Ripple", slug: "ripple", description: "Material ripple effect" },
            { title: "Visible", slug: "visible", description: "Visibility observer" },
            { title: "Portal", slug: "portal", description: "Render outside DOM tree" },
            { title: "Animate", slug: "animate", description: "Entry/exit animations" },
        ]
    },
    {
        title: "Widgets",
        slug: "widgets",
        icon: "Package",
        items: [
            { title: "Badge", slug: "badge", description: "Notification badge" },
        ]
    },
    {
        title: "Utilities",
        slug: "utils",
        icon: "Wrench",
        items: [
            { title: "Color Functions", slug: "color-functions", description: "SCSS-like color manipulation" },
            { title: "Style Utilities", slug: "style-utilities", description: "Theme resolution helpers" },
        ]
    },
];

/**
 * Get all navigation items flat
 */
export function getAllNavItems(): { category: NavCategory; item: NavItem }[] {
    return navigation.flatMap(category => 
        category.items.map(item => ({ category, item }))
    );
}

/**
 * Find a nav item by slug
 */
export function findNavItem(categorySlug: string, itemSlug: string): { category: NavCategory; item: NavItem } | undefined {
    const category = navigation.find(c => c.slug === categorySlug);
    if (!category) return undefined;
    const item = category.items.find(i => i.slug === itemSlug);
    if (!item) return undefined;
    return { category, item };
}

/**
 * Get previous and next items for pagination
 */
export function getAdjacentItems(categorySlug: string, itemSlug: string): { prev?: { category: NavCategory; item: NavItem }; next?: { category: NavCategory; item: NavItem } } {
    const allItems = getAllNavItems();
    const currentIndex = allItems.findIndex(
        ({ category, item }) => category.slug === categorySlug && item.slug === itemSlug
    );
    
    return {
        prev: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
        next: currentIndex < allItems.length - 1 ? allItems[currentIndex + 1] : undefined,
    };
}

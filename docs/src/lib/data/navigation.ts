/**
 * Documentation navigation structure
 * Single source of truth for sidebar and routing
 */

export interface NavItem {
    title: string;
    slug: string;
    description?: string;
    badge?: string;
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
            {
                title: "Introduction",
                slug: "introduction",
                description: "What is Svlendid?",
            },
            {
                title: "Installation",
                slug: "installation",
                description: "How to install Svlendid",
            },
            {
                title: "Quick Start",
                slug: "quick-start",
                description: "Get up and running quickly",
            },
        ],
    },
    {
        title: "Configuration",
        slug: "config",
        icon: "Settings",
        items: [
            {
                title: "Theme Provider",
                slug: "theme-provider",
                description: "Set up theming for your app",
            },
            {
                title: "Colors",
                slug: "colors",
                description: "Color palette configuration",
            },
            {
                title: "Spacing",
                slug: "spacing",
                description: "Spacing scale configuration",
            },
            {
                title: "Typography",
                slug: "typography",
                description: "Font configuration",
            },
            {
                title: "Shadows",
                slug: "shadows",
                description: "Box shadow configuration",
            },
            {
                title: "Radius",
                slug: "radius",
                description: "Border radius configuration",
            },
        ],
    },
    {
        title: "Base",
        slug: "base",
        icon: "Box",
        items: [
            {
                title: "Button",
                slug: "button",
                description: "Interactive button component",
            },
            {
                title: "Text",
                slug: "text",
                description: "Typography component",
            },
            {
                title: "Card",
                slug: "card",
                description: "Card container component",
            },
            {
                title: "Input",
                slug: "input",
                description: "Text input component",
            },
            {
                title: "Checkbox",
                slug: "checkbox",
                description: "Checkbox with label",
                badge: "New",
            },
            {
                title: "Radio",
                slug: "radio",
                description: "Radio button for groups",
                badge: "New",
            },
            {
                title: "Switch",
                slug: "switch",
                description: "Toggle switch",
                badge: "New",
            },
            {
                title: "Select",
                slug: "select",
                description: "Dropdown select",
                badge: "New",
            },
            {
                title: "Slider",
                slug: "slider",
                description: "Range slider input",
                badge: "New",
            },
            {
                title: "TextArea",
                slug: "textarea",
                description: "Multi-line text input",
                badge: "New",
            },
            {
                title: "Avatar",
                slug: "avatar",
                description: "User image or initials",
                badge: "New",
            },
            {
                title: "Chip",
                slug: "chip",
                description: "Tag or filter element",
                badge: "New",
            },
            {
                title: "Image",
                slug: "image",
                description: "Enhanced image component",
                badge: "New",
            },
            {
                title: "Link",
                slug: "link",
                description: "Styled anchor link",
                badge: "New",
            },
            {
                title: "Divider",
                slug: "divider",
                description: "Visual separator",
            },
            {
                title: "Icon",
                slug: "icon",
                description: "Lucide icon component",
            },
            {
                title: "Tooltip",
                slug: "tooltip",
                description: "Tooltip overlay",
            },
            {
                title: "Progress",
                slug: "progress",
                description: "Linear progress bar",
                badge: "New",
            },
            {
                title: "Circular Progress",
                slug: "circularprogress",
                description: "Circular progress indicator",
                badge: "New",
            },
            {
                title: "Spinner",
                slug: "spinner",
                description: "Loading spinner",
                badge: "New",
            },
            {
                title: "Modal",
                slug: "modal",
                description: "Modal dialog container",
                badge: "New",
            },
            {
                title: "Popup",
                slug: "popup",
                description: "Floating positioned container",
                badge: "New",
            },
            {
                title: "Head",
                slug: "head",
                description: "SEO meta tag management",
                badge: "New",
            },
        ],
    },
    {
        title: "Layout",
        slug: "layout",
        icon: "Layout",
        items: [
            {
                title: "Box",
                slug: "box",
                description: "Fundamental layout container",
            },
            { title: "Flex", slug: "flex", description: "Flexbox container" },
            {
                title: "Stack",
                slug: "stack",
                description: "Stacked layout (absolute)",
            },
            {
                title: "Column",
                slug: "column",
                description: "Vertical flex container",
            },
            {
                title: "Row",
                slug: "row",
                description: "Horizontal flex container",
            },
            { title: "Center", slug: "center", description: "Center content" },
            { title: "Spacer", slug: "spacer", description: "Flexible space" },
            {
                title: "Expanded",
                slug: "expanded",
                description: "Expand to fill space",
            },
            {
                title: "Container",
                slug: "container",
                description: "Max-width container",
            },
            {
                title: "Grid",
                slug: "grid",
                description: "CSS Grid layout",
                badge: "New",
            },
        ],
    },
    {
        title: "Primitives",
        slug: "primitives",
        icon: "Layers",
        items: [
            {
                title: "Clickable",
                slug: "clickable",
                description: "Make anything clickable",
            },
            {
                title: "Hoverable",
                slug: "hoverable",
                description: "Hover state wrapper",
            },
            {
                title: "Draggable",
                slug: "draggable",
                description: "Drag interaction",
            },
            {
                title: "Followable",
                slug: "followable",
                description: "Mouse follow effect",
            },
            {
                title: "Keyboard",
                slug: "keyboard",
                description: "Keyboard shortcuts",
            },
            {
                title: "Ripple",
                slug: "ripple",
                description: "Material ripple effect",
            },
            {
                title: "Visible",
                slug: "visible",
                description: "Visibility observer",
            },
            {
                title: "Portal",
                slug: "portal",
                description: "Render outside DOM tree",
            },
            {
                title: "Animate",
                slug: "animate",
                description: "Entry/exit animations",
            },
            {
                title: "Overlay",
                slug: "overlay",
                description: "Backdrop for modals",
                badge: "New",
            },
            {
                title: "Focus Ring",
                slug: "focusring",
                description: "Focus indicator wrapper",
                badge: "New",
            },
            {
                title: "Visually Hidden",
                slug: "visuallyhidden",
                description: "Screen reader only content",
                badge: "New",
            },
        ],
    },
    {
        title: "Widgets",
        slug: "widgets",
        icon: "Package",
        items: [
            {
                title: "Badge",
                slug: "badge",
                description: "Notification badge",
            },
            {
                title: "Tabs",
                slug: "tabs",
                description: "Tabbed navigation",
                badge: "New",
            },
            {
                title: "Breadcrumb",
                slug: "breadcrumb",
                description: "Navigation trail",
                badge: "New",
            },
            {
                title: "Pagination",
                slug: "pagination",
                description: "Page navigation",
                badge: "New",
            },
            {
                title: "Accordion",
                slug: "accordion",
                description: "Collapsible sections",
                badge: "New",
            },
            {
                title: "Alert",
                slug: "alert",
                description: "Message alerts",
                badge: "New",
            },
            {
                title: "Toast",
                slug: "toast",
                description: "Notification toast",
                badge: "New",
            },
            {
                title: "Skeleton",
                slug: "skeleton",
                description: "Loading placeholder",
                badge: "New",
            },
            {
                title: "Dialog",
                slug: "dialog",
                description: "Modal dialog",
                badge: "New",
            },
            {
                title: "Drawer",
                slug: "drawer",
                description: "Slide-in panel",
                badge: "New",
            },
            {
                title: "Menu",
                slug: "menu",
                description: "Dropdown menu list",
                badge: "New",
            },
            {
                title: "Dropdown",
                slug: "dropdown",
                description: "Trigger + popup combo",
                badge: "New",
            },
            {
                title: "Form",
                slug: "form",
                description: "Form wrapper",
                badge: "New",
            },
            {
                title: "Form Field",
                slug: "formfield",
                description: "Label + input wrapper",
                badge: "New",
            },
            {
                title: "Search Input",
                slug: "searchinput",
                description: "Search field",
                badge: "New",
            },
            {
                title: "List",
                slug: "list",
                description: "List container",
                badge: "New",
            },
            {
                title: "List Item",
                slug: "listitem",
                description: "List entry",
                badge: "New",
            },
            {
                title: "Table",
                slug: "table",
                description: "Data table",
                badge: "New",
            },
            {
                title: "Hero",
                slug: "hero",
                description: "Landing page section",
                badge: "New",
            },
            {
                title: "Split Section",
                slug: "splitsection",
                description: "Two-pane layout",
                badge: "New",
            },
            {
                title: "Theme Toggle",
                slug: "themetoggle",
                description: "Dark/light toggle",
                badge: "New",
            },
            {
                title: "Back To Top",
                slug: "backtotop",
                description: "Scroll to top button",
                badge: "New",
            },
            {
                title: "FAB",
                slug: "floatingactionbutton",
                description: "Floating action button",
                badge: "New",
            },
        ],
    },
    {
        title: "Utilities",
        slug: "utils",
        icon: "Wrench",
        items: [
            {
                title: "Color Functions",
                slug: "color-functions",
                description: "SCSS-like color manipulation",
            },
            {
                title: "Style Utilities",
                slug: "style-utilities",
                description: "Theme resolution helpers",
            },
        ],
    },
];

/**
 * Get all navigation items flat
 */
export function getAllNavItems(): { category: NavCategory; item: NavItem }[] {
    return navigation.flatMap((category) =>
        category.items.map((item) => ({ category, item }))
    );
}

/**
 * Find a nav item by slug
 */
export function findNavItem(
    categorySlug: string,
    itemSlug: string
): { category: NavCategory; item: NavItem } | undefined {
    const category = navigation.find((c) => c.slug === categorySlug);
    if (!category) return undefined;
    const item = category.items.find((i) => i.slug === itemSlug);
    if (!item) return undefined;
    return { category, item };
}

/**
 * Get previous and next items for pagination
 */
export function getAdjacentItems(
    categorySlug: string,
    itemSlug: string
): {
    prev?: { category: NavCategory; item: NavItem };
    next?: { category: NavCategory; item: NavItem };
} {
    const allItems = getAllNavItems();
    const currentIndex = allItems.findIndex(
        ({ category, item }) =>
            category.slug === categorySlug && item.slug === itemSlug
    );

    return {
        prev: currentIndex > 0 ? allItems[currentIndex - 1] : undefined,
        next:
            currentIndex < allItems.length - 1
                ? allItems[currentIndex + 1]
                : undefined,
    };
}

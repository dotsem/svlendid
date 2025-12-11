<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Accordion - Collapsible content sections
     * Use with AccordionItem children for a cleaner API
     */
    interface Props {
        children: Snippet;
        /** Allow multiple items open */
        multiple?: boolean;
        /** Initially expanded item IDs */
        expanded?: string[];
        /** Color scheme for active state */
        color?: ColorPalette;
        /** Variant style */
        variant?: "default" | "bordered" | "separated";
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        multiple = false,
        expanded = $bindable([]),
        color = "primary",
        variant = "default",
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));

    function toggle(id: string) {
        if (expanded.includes(id)) {
            expanded = expanded.filter((i) => i !== id);
        } else {
            if (multiple) {
                expanded = [...expanded, id];
            } else {
                expanded = [id];
            }
        }
    }

    setContext("accordion", {
        get expanded() {
            return expanded;
        },
        toggle,
        get color() {
            return computedColor;
        },
        transition: theme.transitions.fast,
        radius: theme.radius.m,
        border: theme.colors.outline,
    });
</script>

<div
    class="accordion"
    class:bordered={variant === "bordered"}
    class:separated={variant === "separated"}
    style:--accordion-color={computedColor}
    style:--accordion-transition={theme.transitions.fast}
    style:--accordion-radius={theme.radius.m}
    style:--accordion-border={theme.colors.outline}
    {...props}
>
    {@render children()}
</div>

<style>
    .accordion {
        width: 100%;
    }

    .accordion.bordered {
        border: 1px solid var(--accordion-border);
        border-radius: var(--accordion-radius);
        overflow: hidden;
    }

    .accordion.separated :global(.accordion-item) {
        border: 1px solid var(--accordion-border);
        border-radius: var(--accordion-radius);
        margin-bottom: 0.5rem;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * ListItem - An individual list item
     */
    interface Props {
        children: Snippet;
        /** Make item clickable */
        clickable?: boolean;
        /** Selected state */
        selected?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Leading content slot */
        leading?: Snippet;
        /** Trailing content slot */
        trailing?: Snippet;
        /** Secondary text */
        secondary?: string;
        /** Color for selected state */
        color?: ColorPalette;
        /** Click handler */
        onclick?: () => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        clickable = false,
        selected = false,
        disabled = false,
        leading,
        trailing,
        secondary,
        color = "primary",
        onclick,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const computedColor = $derived(resolveColor(color, theme));
</script>

<li
    class="list-item"
    class:clickable
    class:selected
    class:disabled
    style:--item-color={computedColor}
    style:--item-transition={theme.transitions.fast}
    {...props}
>
    <svelte:element
        this={clickable ? "button" : "div"}
        class="list-item-content"
        onclick={clickable ? onclick : undefined}
        disabled={clickable ? disabled : undefined}
        role={clickable ? "button" : undefined}
    >
        {#if leading}
            <span class="list-item-leading">{@render leading()}</span>
        {/if}

        <span class="list-item-text">
            <span class="list-item-primary">{@render children()}</span>
            {#if secondary}
                <span class="list-item-secondary">{secondary}</span>
            {/if}
        </span>

        {#if trailing}
            <span class="list-item-trailing">{@render trailing()}</span>
        {/if}
    </svelte:element>
</li>

<style>
    .list-item {
        display: block;
    }

    .list-item-content {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        width: 100%;
        padding: 0.75rem 1rem;
        text-align: left;
        font-family: inherit;
        font-size: inherit;
        color: inherit;
        background: transparent;
        border: none;
        transition: background var(--item-transition) ease;
    }

    .clickable .list-item-content {
        cursor: pointer;

        &:hover:not(:disabled) {
            background: color-mix(in srgb, var(--item-color) 8%, transparent);
        }

        &:focus-visible {
            outline: 2px solid var(--item-color);
            outline-offset: -2px;
        }
    }

    .selected .list-item-content {
        background: color-mix(in srgb, var(--item-color) 12%, transparent);
    }

    .disabled .list-item-content {
        opacity: 0.5;
        cursor: not-allowed;
    }

    .list-item-leading,
    .list-item-trailing {
        flex-shrink: 0;
        display: flex;
        align-items: center;
    }

    .list-item-text {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
    }

    .list-item-primary {
        font-weight: 400;
    }

    .list-item-secondary {
        font-size: 0.875em;
        opacity: 0.7;
    }
</style>

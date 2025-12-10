<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import Popup from "$package/components/base/Popup.svelte";

    /**
     * Dropdown - A trigger + popup menu combination
     */
    type DropdownPlacement =
        | "bottom"
        | "bottom-start"
        | "bottom-end"
        | "top"
        | "top-start"
        | "top-end";

    interface Props {
        /** Trigger element slot */
        trigger: Snippet;
        /** Menu content slot */
        children: Snippet;
        /** Dropdown placement */
        placement?: DropdownPlacement;
        /** Offset from trigger */
        offset?: number;
        /** Close on content click */
        closeOnClick?: boolean;
        /** Disabled state */
        disabled?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        trigger,
        children,
        placement = "bottom-start",
        offset = 4,
        closeOnClick = true,
        disabled = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let open = $state(false);
    let triggerEl = $state<HTMLElement>();

    function toggle() {
        if (!disabled) {
            open = !open;
        }
    }

    function close() {
        open = false;
    }

    function handleContentClick() {
        if (closeOnClick) {
            close();
        }
    }

    function handleClickOutside(event: MouseEvent) {
        if (!triggerEl?.contains(event.target as Node)) {
            close();
        }
    }

    $effect(() => {
        if (open) {
            document.addEventListener("click", handleClickOutside, true);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
        };
    });
</script>

<div class="dropdown" class:disabled {...props}>
    <div
        bind:this={triggerEl}
        class="dropdown-trigger"
        onclick={toggle}
        onkeydown={(e) => e.key === "Enter" && toggle()}
        role="button"
        tabindex={disabled ? -1 : 0}
        aria-haspopup="true"
        aria-expanded={open}
    >
        {@render trigger()}
    </div>

    <Popup {open} anchor={triggerEl} {placement} {offset} onclose={close}>
        <div
            class="dropdown-content"
            style:--dropdown-radius={theme.radius.m}
            onclick={handleContentClick}
            onkeydown={(e) => e.key === "Escape" && close()}
            role="menu"
            tabindex="-1"
        >
            {@render children()}
        </div>
    </Popup>
</div>

<style>
    .dropdown {
        display: inline-block;
        position: relative;

        &.disabled {
            opacity: 0.5;
            pointer-events: none;
        }
    }

    .dropdown-trigger {
        cursor: pointer;

        &:focus-visible {
            outline: 2px solid currentColor;
            outline-offset: 2px;
            border-radius: 4px;
        }
    }

    .dropdown-content {
        border-radius: var(--dropdown-radius);
        overflow: hidden;
    }
</style>

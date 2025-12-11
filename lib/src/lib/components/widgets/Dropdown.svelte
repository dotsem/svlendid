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
        /** Open on hover instead of click */
        triggerOnHover?: boolean;
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
        triggerOnHover = false,
        disabled = false,
        ...props
    }: Props = $props();

    const theme = getTheme();

    let open = $state(false);
    let triggerEl = $state<HTMLElement>();
    let hoverTimeout: ReturnType<typeof setTimeout> | null = null;

    function toggle() {
        if (!disabled && !triggerOnHover) {
            open = !open;
        }
    }

    function openDropdown() {
        if (!disabled) {
            open = true;
        }
    }

    function close() {
        open = false;
    }

    function handleMouseEnter() {
        if (triggerOnHover && !disabled) {
            if (hoverTimeout) clearTimeout(hoverTimeout);
            openDropdown();
        }
    }

    function handleMouseLeave() {
        if (triggerOnHover) {
            // Small delay to allow moving to dropdown content
            hoverTimeout = setTimeout(() => {
                close();
            }, 150);
        }
    }

    function handleContentMouseEnter() {
        if (triggerOnHover && hoverTimeout) {
            clearTimeout(hoverTimeout);
        }
    }

    function handleContentMouseLeave() {
        if (triggerOnHover) {
            close();
        }
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
        if (open && !triggerOnHover) {
            document.addEventListener("click", handleClickOutside, true);
        }

        return () => {
            document.removeEventListener("click", handleClickOutside, true);
            if (hoverTimeout) clearTimeout(hoverTimeout);
        };
    });
</script>

<div
    class="dropdown"
    class:disabled
    onmouseenter={handleMouseEnter}
    onmouseleave={handleMouseLeave}
    {...props}
>
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
            style:--dropdown-z-index={theme.zIndex.popover}
            style:--dropdown-bg={theme.colors.card}
            style:--dropdown-shadow={theme.boxShadow.l}
            onclick={handleContentClick}
            onmouseenter={handleContentMouseEnter}
            onmouseleave={handleContentMouseLeave}
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
        background: var(--dropdown-bg);
        box-shadow: var(--dropdown-shadow);
        z-index: var(--dropdown-z-index);
        overflow: hidden;
    }
</style>

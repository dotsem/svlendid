<script module lang="ts">
    // Global registry for open dropdowns - shared across all instances
    const openDropdowns = new Set<() => void>();
</script>

<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import Portal from "$package/components/primitives/visibility/Portal.svelte";

    /**
     * Dropdown - A trigger + positioned menu combination
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
    let dropdownEl = $state<HTMLElement>();
    let position = $state({ top: 0, left: 0 });
    let hoverTimeout: ReturnType<typeof setTimeout> | null = null;
    let positionCalculated = $state(false);

    function calculatePosition() {
        if (!triggerEl || !dropdownEl) return;

        const triggerRect = triggerEl.getBoundingClientRect();
        const dropdownRect = dropdownEl.getBoundingClientRect();

        let top = 0;
        let left = 0;

        // Vertical positioning
        if (placement.startsWith("top")) {
            // For top placement, position menu above trigger
            top = triggerRect.top - dropdownRect.height - offset;
        } else {
            // For bottom placement, position menu below trigger
            top = triggerRect.bottom + offset;
        }

        // Horizontal positioning
        if (placement.endsWith("-start")) {
            left = triggerRect.left;
        } else if (placement.endsWith("-end")) {
            left = triggerRect.right - dropdownRect.width;
        } else {
            // center
            left =
                triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
        }

        position = { top, left };
        positionCalculated = true;
    }

    function closeOtherDropdowns() {
        openDropdowns.forEach((closeFunc) => closeFunc());
        openDropdowns.clear();
    }

    function toggle(event: MouseEvent) {
        event.stopPropagation();
        if (!disabled && !triggerOnHover) {
            if (!open) {
                closeOtherDropdowns();
            }
            open = !open;
        }
    }

    function openDropdown() {
        if (!disabled) {
            closeOtherDropdowns();
            open = true;
        }
    }

    function close() {
        open = false;
        positionCalculated = false;
        openDropdowns.delete(close);
    }

    function handleMouseEnter() {
        if (triggerOnHover && !disabled) {
            if (hoverTimeout) clearTimeout(hoverTimeout);
            openDropdown();
        }
    }

    function handleMouseLeave() {
        if (triggerOnHover) {
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

    function handleContentClick(event: MouseEvent) {
        event.stopPropagation();
        if (closeOnClick) {
            close();
        }
    }

    function handleClickOutside(event: MouseEvent) {
        const target = event.target as Node;
        if (!triggerEl?.contains(target) && !dropdownEl?.contains(target)) {
            close();
        }
    }

    function handleKeydown(event: KeyboardEvent) {
        if (event.key === "Escape") {
            close();
        }
    }

    $effect(() => {
        if (open) {
            // Register this dropdown's close function
            openDropdowns.add(close);

            // Use requestAnimationFrame to calculate position after render
            requestAnimationFrame(() => {
                calculatePosition();
            });

            window.addEventListener("resize", calculatePosition);
            window.addEventListener("scroll", calculatePosition, true);
            window.addEventListener("keydown", handleKeydown);

            // Delay click-outside registration to avoid capturing the opening click
            const clickTimeout = setTimeout(() => {
                document.addEventListener("click", handleClickOutside);
            }, 10);

            return () => {
                clearTimeout(clickTimeout);
                window.removeEventListener("resize", calculatePosition);
                window.removeEventListener("scroll", calculatePosition, true);
                document.removeEventListener("click", handleClickOutside);
                window.removeEventListener("keydown", handleKeydown);
                if (hoverTimeout) clearTimeout(hoverTimeout);
                openDropdowns.delete(close);
            };
        }
    });

    // Recalculate position when dropdown element changes (after render)
    $effect(() => {
        if (open && dropdownEl) {
            calculatePosition();
        }
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
        onkeydown={(e) =>
            e.key === "Enter" && toggle(e as unknown as MouseEvent)}
        role="button"
        tabindex={disabled ? -1 : 0}
        aria-haspopup="true"
        aria-expanded={open}
    >
        {@render trigger()}
    </div>

    {#if open}
        <Portal>
            <div
                bind:this={dropdownEl}
                class="dropdown-content"
                class:visible={positionCalculated}
                style:top="{position.top}px"
                style:left="{position.left}px"
                style:--dropdown-radius={theme.radius.m}
                style:--dropdown-z-index={theme.zIndex.popover}
                style:--dropdown-bg={theme.colors.card}
                style:--dropdown-shadow={theme.boxShadow.l}
                onclick={handleContentClick}
                onkeydown={(e) =>
                    e.key === "Enter" &&
                    handleContentClick(e as unknown as MouseEvent)}
                onmouseenter={handleContentMouseEnter}
                onmouseleave={handleContentMouseLeave}
                role="menu"
                tabindex="-1"
            >
                {@render children()}
            </div>
        </Portal>
    {/if}
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
        position: fixed;
        border-radius: var(--dropdown-radius);
        background: var(--dropdown-bg);
        box-shadow: var(--dropdown-shadow);
        z-index: var(--dropdown-z-index);
        overflow: hidden;
        opacity: 0;
        transition: opacity 0.1s ease;

        &.visible {
            opacity: 1;
            animation: dropdown-enter 0.15s ease-out;
        }
    }

    @keyframes dropdown-enter {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>

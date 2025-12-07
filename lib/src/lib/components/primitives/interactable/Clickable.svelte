<script lang="ts">
    import type { Snippet } from "svelte";

    /**
     * Clickable primitive - wraps content and handles click interactions
     */
    interface Props {
        children: Snippet;
        /** Single click handler */
        onclick?: (event: MouseEvent) => void;
        /** Double click handler */
        ondoubleclick?: (event: MouseEvent) => void;
        /** Right click / context menu handler */
        oncontextmenu?: (event: MouseEvent) => void;
        /** Mouse enter handler */
        onmouseenter?: (event: MouseEvent) => void;
        /** Mouse leave handler */
        onmouseleave?: (event: MouseEvent) => void;
        /** Long press handler (hold for 500ms) */
        onlongpress?: (event: MouseEvent) => void;
        /** Long press duration in ms */
        longPressDuration?: number;
        /** Disable all interactions */
        disabled?: boolean;
        /** Cursor style when hovering */
        cursor?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onclick,
        ondoubleclick,
        oncontextmenu,
        onmouseenter,
        onmouseleave,
        onlongpress,
        longPressDuration = 500,
        disabled = false,
        cursor = "pointer",
        ...props
    }: Props = $props();

    let longPressTimer: ReturnType<typeof setTimeout> | null = null;
    let clickTimer: ReturnType<typeof setTimeout> | null = null;
    let isLongPress = false;
    let clickCount = 0;
    let pendingClickEvent: MouseEvent | null = null;

    /** Delay before single click fires (to detect double-click) */
    const DOUBLE_CLICK_DELAY = 250;

    function handleMouseDown(event: MouseEvent) {
        if (disabled || !onlongpress) return;
        
        isLongPress = false;
        longPressTimer = setTimeout(() => {
            isLongPress = true;
            onlongpress?.(event);
        }, longPressDuration);
    }

    function handleMouseUp() {
        if (longPressTimer) {
            clearTimeout(longPressTimer);
            longPressTimer = null;
        }
    }

    function handleClick(event: MouseEvent) {
        if (disabled || isLongPress) return;
        
        clickCount++;
        
        // If we have a double-click handler, delay single click
        if (ondoubleclick) {
            if (clickCount === 1) {
                pendingClickEvent = event;
                clickTimer = setTimeout(() => {
                    // Single click - no double click happened
                    if (clickCount === 1) {
                        onclick?.(pendingClickEvent!);
                    }
                    clickCount = 0;
                    pendingClickEvent = null;
                }, DOUBLE_CLICK_DELAY);
            } else if (clickCount === 2) {
                // Double click detected
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                }
                clickCount = 0;
                pendingClickEvent = null;
                ondoubleclick(event);
            }
        } else {
            // No double-click handler, fire immediately
            onclick?.(event);
            clickCount = 0;
        }
    }

    function handleContextMenu(event: MouseEvent) {
        if (disabled) return;
        if (oncontextmenu) {
            event.preventDefault();
            oncontextmenu(event);
        }
    }
</script>

<div
    class="clickable"
    class:disabled
    style:cursor={disabled ? "not-allowed" : cursor}
    role="button"
    tabindex={disabled ? -1 : 0}
    onclick={handleClick}
    oncontextmenu={handleContextMenu}
    onmouseenter={disabled ? undefined : onmouseenter}
    onmouseleave={disabled ? undefined : onmouseleave}
    onmousedown={handleMouseDown}
    onmouseup={handleMouseUp}
    onkeydown={(e) => {
        if (!disabled && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onclick?.(e as unknown as MouseEvent);
        }
    }}
    {...props}
>
    {@render children()}
</div>

<style>
    .clickable {
        display: contents;
    }

    .clickable:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }

    .disabled {
        pointer-events: none;
        opacity: 0.5;
    }
</style>
<!-- filepath: /home/sem/prog/html/svlendid/lib/src/lib/components/primitives/interactable/Keyboard.svelte -->
<script lang="ts">
    import type { Snippet } from "svelte";
    import { onMount, onDestroy } from "svelte";

    /**
     * Keyboard primitive - handles keyboard shortcuts and key events
     */
    interface Props {
        children?: Snippet;
        /** Called on any key down */
        onkeydown?: (event: KeyboardEvent) => void;
        /** Called on any key up */
        onkeyup?: (event: KeyboardEvent) => void;
        /** Map of key combinations to handlers. Format: "ctrl+s", "shift+enter", "escape" */
        shortcuts?: Record<string, (event: KeyboardEvent) => void>;
        /** Listen globally (window) instead of just when focused */
        global?: boolean;
        /** Prevent default behavior for matched shortcuts */
        preventDefault?: boolean;
        /** Stop propagation for matched shortcuts */
        stopPropagation?: boolean;
        /** Disable keyboard handling */
        disabled?: boolean;
        /** Make focusable */
        focusable?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onkeydown,
        onkeyup,
        shortcuts = {},
        global: isGlobal = false,
        preventDefault = true,
        stopPropagation = false,
        disabled = false,
        focusable = true,
        ...props
    }: Props = $props();

    function normalizeKey(event: KeyboardEvent): string {
        const parts: string[] = [];
        if (event.ctrlKey || event.metaKey) parts.push("ctrl");
        if (event.altKey) parts.push("alt");
        if (event.shiftKey) parts.push("shift");
        parts.push(event.key.toLowerCase());
        return parts.join("+");
    }

    function handleKeyDown(event: KeyboardEvent) {
        if (disabled) return;

        onkeydown?.(event);

        const key = normalizeKey(event);
        const handler = shortcuts[key];
        
        if (handler) {
            if (preventDefault) event.preventDefault();
            if (stopPropagation) event.stopPropagation();
            handler(event);
        }
    }

    function handleKeyUp(event: KeyboardEvent) {
        if (disabled) return;
        onkeyup?.(event);
    }

    onMount(() => {
        if (isGlobal) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        }
    });

    onDestroy(() => {
        if (isGlobal) {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        }
    });
</script>

{#if isGlobal}
    {#if children}
        {@render children()}
    {/if}
{:else}
    <div
        class="keyboard-listener"
        role="application"
        tabindex={focusable && !disabled ? 0 : -1}
        onkeydown={handleKeyDown}
        onkeyup={handleKeyUp}
        {...props}
    >
        {#if children}
            {@render children()}
        {/if}
    </div>
{/if}

<style>
    .keyboard-listener {
        display: contents;
    }

    .keyboard-listener:focus {
        outline: none;
    }

    .keyboard-listener:focus-visible {
        outline: 2px solid currentColor;
        outline-offset: 2px;
    }
</style>

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
        /** auto-focus the keyboard listener */
        autoFocus?: boolean;
        /** Key to unfocus the keyboard listener */
        unfocusKey?: string;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onkeydown,
        onkeyup,
        shortcuts = {},
        global: isGlobal = false,
        autoFocus = false,
        preventDefault = true,
        stopPropagation = false,
        disabled = false,
        focusable = true,
        ...props
    }: Props = $props();

    let el: HTMLElement | null = $state(null);

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

        if (key === props.unfocusKey) {
            
            return;
        }

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

    function focus() {
        if (el && focusable && !disabled) {
            el.focus();
        }
    }

    function blur() {
        if (el && focusable && !disabled) {
            el.blur();
        }
    }

    onMount(() => {
        if (isGlobal) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        }

        if (autoFocus) focus();
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
        role="button"
        tabindex={focusable && !disabled ? 0 : null}
        onkeydown={handleKeyDown}
        onkeyup={handleKeyUp}
        bind:this={el}
        onclick={focus}
        {...props}
    >
        {#if children}
            {@render children()}
        {/if}
    </div>
{/if}

<style>
    .keyboard-listener:focus {
        outline: auto;
    }
</style>

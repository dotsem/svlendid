<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";
    import type { Spacing, Radius } from "$package/types/layout.type.js";
    import { resolveSpacing, resolveRadius } from "$package/utils/style.js";

    /**
     * Form - A form wrapper with validation context
     */
    interface Props {
        children: Snippet;
        /** Form submission handler */
        onsubmit?: (event: SubmitEvent) => void;
        /** Form reset handler */
        onreset?: () => void;
        /** Gap between form fields */
        gap?: Spacing | string;
        /** Form layout direction */
        direction?: "column" | "row";
        /** Disable native browser validation */
        novalidate?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        onsubmit,
        onreset,
        gap = "m",
        direction = "column",
        novalidate = false,
        ...props
    }: Props = $props();

    const theme = getTheme();
    const computedGap = $derived(resolveSpacing(gap, theme));

    function handleSubmit(event: SubmitEvent) {
        event.preventDefault();
        onsubmit?.(event);
    }

    function handleReset() {
        onreset?.();
    }
</script>

<form
    class="form"
    class:row={direction === "row"}
    style:--form-gap={computedGap}
    {novalidate}
    onsubmit={handleSubmit}
    onreset={handleReset}
    {...props}
>
    {@render children()}
</form>

<style>
    .form {
        display: flex;
        flex-direction: column;
        gap: var(--form-gap);
        width: 100%;

        &.row {
            flex-direction: row;
            flex-wrap: wrap;
        }
    }
</style>

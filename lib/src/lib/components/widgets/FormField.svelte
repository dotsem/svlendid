<script lang="ts">
    import type { Snippet } from "svelte";
    import { getTheme } from "$package/config/theme.js";

    /**
     * FormField - A form field wrapper with label, input, and error message
     */
    interface Props {
        children: Snippet;
        /** Field label */
        label?: string;
        /** Help text */
        description?: string;
        /** Error message */
        error?: string;
        /** Required field indicator */
        required?: boolean;
        /** Field ID (for label association) */
        id?: string;
        /** Horizontal layout */
        horizontal?: boolean;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        children,
        label,
        description,
        error,
        required = false,
        id,
        horizontal = false,
        ...props
    }: Props = $props();

    const theme = getTheme();
</script>

<div
    class="form-field"
    class:horizontal
    class:has-error={!!error}
    style:--field-error-color={theme.colors.error}
    {...props}
>
    {#if label}
        <label class="form-field-label" for={id}>
            {label}
            {#if required}
                <span class="required-indicator" aria-hidden="true">*</span>
            {/if}
        </label>
    {/if}

    <div class="form-field-content">
        <div class="form-field-input">
            {@render children()}
        </div>

        {#if description && !error}
            <p class="form-field-description">{description}</p>
        {/if}

        {#if error}
            <p class="form-field-error" role="alert">{error}</p>
        {/if}
    </div>
</div>

<style>
    .form-field {
        display: flex;
        flex-direction: column;
        gap: 0.375rem;
        width: 100%;

        &.horizontal {
            flex-direction: row;
            align-items: flex-start;
            gap: 1rem;

            .form-field-label {
                flex: 0 0 auto;
                min-width: 120px;
                padding-top: 0.5rem;
            }

            .form-field-content {
                flex: 1;
            }
        }
    }

    .form-field-label {
        display: flex;
        align-items: center;
        gap: 0.25rem;
        font-size: 0.875rem;
        font-weight: 500;
    }

    .required-indicator {
        color: var(--field-error-color);
    }

    .form-field-content {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
    }

    .form-field-input {
        width: 100%;
    }

    .form-field-description,
    .form-field-error {
        margin: 0;
        font-size: 0.75rem;
    }

    .form-field-description {
        opacity: 0.7;
    }

    .form-field-error {
        color: var(--field-error-color);
    }
</style>

<script lang="ts">
    import { getTheme } from "$package/config/theme.js";
    import type { ColorPalette } from "$package/types/colorPalette.type.js";
    import { resolveColor } from "$package/utils/style.js";

    /**
     * Switch - A toggle switch component
     */
    type SwitchSize = "s" | "m" | "l";

    interface Props {
        /** Whether the switch is on */
        checked?: boolean;
        /** Label text */
        label?: string;
        /** Disabled state */
        disabled?: boolean;
        /** Color when switch is on */
        color?: ColorPalette;
        /** Switch size */
        size?: SwitchSize;
        /** Name attribute for form submission */
        name?: string;
        /** Change handler */
        onchange?: (checked: boolean) => void;
        /** Additional HTML attributes */
        [key: string]: unknown;
    }

    let {
        checked = $bindable(false),
        label,
        disabled = false,
        color = "primary",
        size = "m",
        name,
        onchange,
        ...props
    }: Props = $props();

    const theme = getTheme();

    const sizeConfig = {
        s: {
            width: "36px",
            height: "20px",
            thumb: "16px",
            translate: "16px",
            fontSize: "0.875rem",
        },
        m: {
            width: "44px",
            height: "24px",
            thumb: "20px",
            translate: "20px",
            fontSize: "1rem",
        },
        l: {
            width: "52px",
            height: "28px",
            thumb: "24px",
            translate: "24px",
            fontSize: "1.125rem",
        },
    };

    const computedColor = $derived(resolveColor(color, theme));

    function handleChange(event: Event) {
        const target = event.target as HTMLInputElement;
        checked = target.checked;
        onchange?.(checked);
    }
</script>

<label
    class="switch-wrapper"
    class:disabled
    style:--switch-width={sizeConfig[size].width}
    style:--switch-height={sizeConfig[size].height}
    style:--switch-thumb-size={sizeConfig[size].thumb}
    style:--switch-translate={sizeConfig[size].translate}
    style:--switch-color={computedColor}
    style:--switch-font-size={sizeConfig[size].fontSize}
    style:--switch-transition={theme.transitions.fast}
    style:--switch-bg-off={theme.colors.outline}
    {...props}
>
    <input
        type="checkbox"
        class="switch-input"
        {checked}
        {disabled}
        {name}
        onchange={handleChange}
        role="switch"
        aria-checked={checked}
    />
    <span class="switch-track">
        <span class="switch-thumb"></span>
    </span>
    {#if label}
        <span class="switch-label">{label}</span>
    {/if}
</label>

<style>
    .switch-wrapper {
        display: inline-flex;
        align-items: center;
        gap: 0.75rem;
        cursor: pointer;
        font-size: var(--switch-font-size);
        user-select: none;

        &.disabled {
            opacity: 0.5;
            cursor: not-allowed;
        }
    }

    .switch-input {
        position: absolute;
        opacity: 0;
        width: 0;
        height: 0;
    }

    .switch-track {
        position: relative;
        width: var(--switch-width);
        height: var(--switch-height);
        background: var(--switch-bg-off);
        border-radius: calc(var(--switch-height) / 2);
        transition: background var(--switch-transition) ease;

        .switch-input:checked + & {
            background: var(--switch-color);
        }

        .switch-input:focus-visible + & {
            outline: 2px solid var(--switch-color);
            outline-offset: 2px;
        }
    }

    .switch-thumb {
        position: absolute;
        top: 2px;
        left: 2px;
        width: var(--switch-thumb-size);
        height: var(--switch-thumb-size);
        background: white;
        border-radius: 50%;
        transition: transform var(--switch-transition) ease;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);

        .switch-input:checked + .switch-track & {
            transform: translateX(var(--switch-translate));
        }
    }

    .switch-label {
        color: inherit;
    }
</style>

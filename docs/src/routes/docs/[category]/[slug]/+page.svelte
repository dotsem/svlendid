<script lang="ts">
    import { DocPage } from '$lib';
    import type { PageData } from './$types';
    
    // Import all doc content components
    import GettingStartedIntroduction from '$lib/content/getting-started/introduction.svelte';
    import GettingStartedInstallation from '$lib/content/getting-started/installation.svelte';
    import GettingStartedQuickStart from '$lib/content/getting-started/quick-start.svelte';
    
    import ConfigThemeProvider from '$lib/content/config/theme-provider.svelte';
    import ConfigColors from '$lib/content/config/colors.svelte';
    import ConfigSpacing from '$lib/content/config/spacing.svelte';
    import ConfigTypography from '$lib/content/config/typography.svelte';
    import ConfigShadows from '$lib/content/config/shadows.svelte';
    import ConfigRadius from '$lib/content/config/radius.svelte';
    
    import BaseButton from '$lib/content/base/button.svelte';
    import BaseText from '$lib/content/base/text.svelte';
    import BaseCard from '$lib/content/base/card.svelte';
    import BaseInput from '$lib/content/base/input.svelte';
    import BaseDivider from '$lib/content/base/divider.svelte';
    import BaseIcon from '$lib/content/base/icon.svelte';
    import BaseTooltip from '$lib/content/base/tooltip.svelte';
    
    import LayoutBox from '$lib/content/layout/box.svelte';
    import LayoutFlex from '$lib/content/layout/flex.svelte';
    import LayoutStack from '$lib/content/layout/stack.svelte';
    import LayoutColumn from '$lib/content/layout/column.svelte';
    import LayoutRow from '$lib/content/layout/row.svelte';
    import LayoutCenter from '$lib/content/layout/center.svelte';
    import LayoutSpacer from '$lib/content/layout/spacer.svelte';
    import LayoutExpanded from '$lib/content/layout/expanded.svelte';
    import LayoutContainer from '$lib/content/layout/container.svelte';
    
    import PrimitivesClickable from '$lib/content/primitives/clickable.svelte';
    import PrimitivesHoverable from '$lib/content/primitives/hoverable.svelte';
    import PrimitivesDraggable from '$lib/content/primitives/draggable.svelte';
    import PrimitivesFollowable from '$lib/content/primitives/followable.svelte';
    import PrimitivesKeyboard from '$lib/content/primitives/keyboard.svelte';
    import PrimitivesRipple from '$lib/content/primitives/ripple.svelte';
    import PrimitivesVisible from '$lib/content/primitives/visible.svelte';
    import PrimitivesPortal from '$lib/content/primitives/portal.svelte';
    import PrimitivesAnimate from '$lib/content/primitives/animate.svelte';
    
    import WidgetsBadge from '$lib/content/widgets/badge.svelte';
    
    import UtilsColorFunctions from '$lib/content/utils/color-functions.svelte';
    import UtilsStyleUtilities from '$lib/content/utils/style-utilities.svelte';

    let { data }: { data: PageData } = $props();

    // Content mapping
    const contentMap: Record<string, Record<string, any>> = {
        'getting-started': {
            'introduction': GettingStartedIntroduction,
            'installation': GettingStartedInstallation,
            'quick-start': GettingStartedQuickStart,
        },
        'config': {
            'theme-provider': ConfigThemeProvider,
            'colors': ConfigColors,
            'spacing': ConfigSpacing,
            'typography': ConfigTypography,
            'shadows': ConfigShadows,
            'radius': ConfigRadius,
        },
        'base': {
            'button': BaseButton,
            'text': BaseText,
            'card': BaseCard,
            'input': BaseInput,
            'divider': BaseDivider,
            'icon': BaseIcon,
            'tooltip': BaseTooltip,
        },
        'layout': {
            'box': LayoutBox,
            'flex': LayoutFlex,
            'stack': LayoutStack,
            'column': LayoutColumn,
            'row': LayoutRow,
            'center': LayoutCenter,
            'spacer': LayoutSpacer,
            'expanded': LayoutExpanded,
            'container': LayoutContainer,
        },
        'primitives': {
            'clickable': PrimitivesClickable,
            'hoverable': PrimitivesHoverable,
            'draggable': PrimitivesDraggable,
            'followable': PrimitivesFollowable,
            'keyboard': PrimitivesKeyboard,
            'ripple': PrimitivesRipple,
            'visible': PrimitivesVisible,
            'portal': PrimitivesPortal,
            'animate': PrimitivesAnimate,
        },
        'widgets': {
            'badge': WidgetsBadge,
        },
        'utils': {
            'color-functions': UtilsColorFunctions,
            'style-utilities': UtilsStyleUtilities,
        },
    };

    const ContentComponent = $derived(contentMap[data.category.slug]?.[data.item.slug]);
</script>

<svelte:head>
    <title>{data.item.title} - Svlendid Docs</title>
</svelte:head>

<DocPage
    title={data.item.title}
    description={data.item.description}
    category={data.category.title}
    slug={data.item.slug}
>
    {#if ContentComponent}
        <ContentComponent />
    {:else}
        <p>Documentation coming soon...</p>
    {/if}
</DocPage>

<script lang="ts">
    import { DocPage } from "$lib";
    import type { PageData } from "./$types";

    // Import all doc content components
    import GettingStartedIntroduction from "$lib/content/getting-started/introduction.svelte";
    import GettingStartedInstallation from "$lib/content/getting-started/installation.svelte";
    import GettingStartedQuickStart from "$lib/content/getting-started/quick-start.svelte";

    import ConfigThemeProvider from "$lib/content/config/theme-provider.svelte";
    import ConfigColors from "$lib/content/config/colors.svelte";
    import ConfigSpacing from "$lib/content/config/spacing.svelte";
    import ConfigTypography from "$lib/content/config/typography.svelte";
    import ConfigShadows from "$lib/content/config/shadows.svelte";
    import ConfigRadius from "$lib/content/config/radius.svelte";

    import BaseButton from "$lib/content/base/button.svelte";
    import BaseText from "$lib/content/base/text.svelte";
    import BaseCard from "$lib/content/base/card.svelte";
    import BaseInput from "$lib/content/base/input.svelte";
    import BaseDivider from "$lib/content/base/divider.svelte";
    import BaseIcon from "$lib/content/base/icon.svelte";
    import BaseTooltip from "$lib/content/base/tooltip.svelte";
    // New base components
    import BaseCheckbox from "$lib/content/base/checkbox.svelte";
    import BaseRadio from "$lib/content/base/radio.svelte";
    import BaseSwitch from "$lib/content/base/switch.svelte";
    import BaseSelect from "$lib/content/base/select.svelte";
    import BaseSlider from "$lib/content/base/slider.svelte";
    import BaseTextArea from "$lib/content/base/textarea.svelte";
    import BaseAvatar from "$lib/content/base/avatar.svelte";
    import BaseChip from "$lib/content/base/chip.svelte";
    import BaseImage from "$lib/content/base/image.svelte";
    import BaseLink from "$lib/content/base/link.svelte";
    import BaseProgress from "$lib/content/base/progress.svelte";
    import BaseCircularProgress from "$lib/content/base/circularprogress.svelte";
    import BaseSpinner from "$lib/content/base/spinner.svelte";
    import BaseModal from "$lib/content/base/modal.svelte";
    import BasePopup from "$lib/content/base/popup.svelte";
    import BaseHead from "$lib/content/base/head.svelte";

    import LayoutBox from "$lib/content/layout/box.svelte";
    import LayoutFlex from "$lib/content/layout/flex.svelte";
    import LayoutStack from "$lib/content/layout/stack.svelte";
    import LayoutColumn from "$lib/content/layout/column.svelte";
    import LayoutRow from "$lib/content/layout/row.svelte";
    import LayoutCenter from "$lib/content/layout/center.svelte";
    import LayoutSpacer from "$lib/content/layout/spacer.svelte";
    import LayoutExpanded from "$lib/content/layout/expanded.svelte";
    import LayoutContainer from "$lib/content/layout/container.svelte";
    import LayoutGrid from "$lib/content/layout/grid.svelte";

    import PrimitivesClickable from "$lib/content/primitives/clickable.svelte";
    import PrimitivesHoverable from "$lib/content/primitives/hoverable.svelte";
    import PrimitivesDraggable from "$lib/content/primitives/draggable.svelte";
    import PrimitivesFollowable from "$lib/content/primitives/followable.svelte";
    import PrimitivesKeyboard from "$lib/content/primitives/keyboard.svelte";
    import PrimitivesRipple from "$lib/content/primitives/ripple.svelte";
    import PrimitivesVisible from "$lib/content/primitives/visible.svelte";
    import PrimitivesPortal from "$lib/content/primitives/portal.svelte";
    import PrimitivesAnimate from "$lib/content/primitives/animate.svelte";
    import PrimitivesOverlay from "$lib/content/primitives/overlay.svelte";
    import PrimitivesFocusRing from "$lib/content/primitives/focusring.svelte";
    import PrimitivesVisuallyHidden from "$lib/content/primitives/visuallyhidden.svelte";
    import PrimitivesViewPort from "$lib/content/primitives/viewport.svelte";

    import WidgetsBadge from "$lib/content/widgets/badge.svelte";
    import WidgetsTabs from "$lib/content/widgets/tabs.svelte";
    import WidgetsBreadcrumb from "$lib/content/widgets/breadcrumb.svelte";
    import WidgetsPagination from "$lib/content/widgets/pagination.svelte";
    import WidgetsAccordion from "$lib/content/widgets/accordion.svelte";
    import WidgetsAlert from "$lib/content/widgets/alert.svelte";
    import WidgetsDialog from "$lib/content/widgets/dialog.svelte";
    import WidgetsDrawer from "$lib/content/widgets/drawer.svelte";
    import WidgetsMenu from "$lib/content/widgets/menu.svelte";
    import WidgetsDropdown from "$lib/content/widgets/dropdown.svelte";
    import WidgetsSkeleton from "$lib/content/widgets/skeleton.svelte";
    import WidgetsToast from "$lib/content/widgets/toast.svelte";
    import WidgetsForm from "$lib/content/widgets/form.svelte";
    import WidgetsFormField from "$lib/content/widgets/formfield.svelte";
    import WidgetsSearchInput from "$lib/content/widgets/searchinput.svelte";
    import WidgetsList from "$lib/content/widgets/list.svelte";
    import WidgetsListItem from "$lib/content/widgets/listitem.svelte";
    import WidgetsTable from "$lib/content/widgets/table.svelte";
    import WidgetsHero from "$lib/content/widgets/hero.svelte";
    import WidgetsSplitSection from "$lib/content/widgets/splitsection.svelte";
    import WidgetsThemeToggle from "$lib/content/widgets/themetoggle.svelte";
    import WidgetsBackToTop from "$lib/content/widgets/backtotop.svelte";
    import WidgetsFloatingActionButton from "$lib/content/widgets/floatingactionbutton.svelte";

    import UtilsColorFunctions from "$lib/content/utils/color-functions.svelte";
    import UtilsStyleUtilities from "$lib/content/utils/style-utilities.svelte";

    let { data }: { data: PageData } = $props();

    // Content mapping
    const contentMap: Record<string, Record<string, any>> = {
        "getting-started": {
            introduction: GettingStartedIntroduction,
            installation: GettingStartedInstallation,
            "quick-start": GettingStartedQuickStart,
        },
        config: {
            "theme-provider": ConfigThemeProvider,
            colors: ConfigColors,
            spacing: ConfigSpacing,
            typography: ConfigTypography,
            shadows: ConfigShadows,
            radius: ConfigRadius,
        },
        base: {
            button: BaseButton,
            text: BaseText,
            card: BaseCard,
            input: BaseInput,
            divider: BaseDivider,
            icon: BaseIcon,
            tooltip: BaseTooltip,
            checkbox: BaseCheckbox,
            radio: BaseRadio,
            switch: BaseSwitch,
            select: BaseSelect,
            slider: BaseSlider,
            textarea: BaseTextArea,
            avatar: BaseAvatar,
            chip: BaseChip,
            image: BaseImage,
            link: BaseLink,
            progress: BaseProgress,
            circularprogress: BaseCircularProgress,
            spinner: BaseSpinner,
            modal: BaseModal,
            popup: BasePopup,
            head: BaseHead,
        },
        layout: {
            box: LayoutBox,
            flex: LayoutFlex,
            stack: LayoutStack,
            column: LayoutColumn,
            row: LayoutRow,
            center: LayoutCenter,
            spacer: LayoutSpacer,
            expanded: LayoutExpanded,
            container: LayoutContainer,
            grid: LayoutGrid,
        },
        primitives: {
            clickable: PrimitivesClickable,
            hoverable: PrimitivesHoverable,
            draggable: PrimitivesDraggable,
            followable: PrimitivesFollowable,
            keyboard: PrimitivesKeyboard,
            ripple: PrimitivesRipple,
            visible: PrimitivesVisible,
            portal: PrimitivesPortal,
            animate: PrimitivesAnimate,
            overlay: PrimitivesOverlay,
            focusring: PrimitivesFocusRing,
            visuallyhidden: PrimitivesVisuallyHidden,
            viewport: PrimitivesViewPort,
        },
        widgets: {
            badge: WidgetsBadge,
            tabs: WidgetsTabs,
            breadcrumb: WidgetsBreadcrumb,
            pagination: WidgetsPagination,
            accordion: WidgetsAccordion,
            alert: WidgetsAlert,
            dialog: WidgetsDialog,
            drawer: WidgetsDrawer,
            menu: WidgetsMenu,
            dropdown: WidgetsDropdown,
            skeleton: WidgetsSkeleton,
            toast: WidgetsToast,
            form: WidgetsForm,
            formfield: WidgetsFormField,
            searchinput: WidgetsSearchInput,
            list: WidgetsList,
            listitem: WidgetsListItem,
            table: WidgetsTable,
            hero: WidgetsHero,
            splitsection: WidgetsSplitSection,
            themetoggle: WidgetsThemeToggle,
            backtotop: WidgetsBackToTop,
            floatingactionbutton: WidgetsFloatingActionButton,
        },
        utils: {
            "color-functions": UtilsColorFunctions,
            "style-utilities": UtilsStyleUtilities,
        },
    };

    const ContentComponent = $derived(
        contentMap[data.category.slug]?.[data.item.slug]
    );
</script>

<svelte:head>
    <title>{data.item.title} - Svlendid Docs</title>
</svelte:head>

<DocPage
    title={data.item.title}
    description={data.item.description}
    categorySlug={data.category.slug}
    categoryTitle={data.category.title}
    slug={data.item.slug}
>
    {#if ContentComponent}
        <ContentComponent />
    {:else}
        <p>Documentation coming soon...</p>
    {/if}
</DocPage>

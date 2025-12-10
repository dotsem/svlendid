<script lang="ts">
    /**
     * Head - SEO and meta tag management component
     * Uses svelte:head to inject meta tags into the document head
     */
    interface Props {
        /** Page title */
        title?: string;
        /** Title template (e.g., "%s | My Site") */
        titleTemplate?: string;
        /** Meta description */
        description?: string;
        /** Meta keywords */
        keywords?: string | string[];
        /** Canonical URL */
        canonical?: string;
        /** Open Graph image URL */
        ogImage?: string;
        /** Open Graph type */
        ogType?: "website" | "article" | "product";
        /** Twitter card type */
        twitterCard?: "summary" | "summary_large_image";
        /** Robots directive */
        robots?: string;
        /** Theme color for mobile browsers */
        themeColor?: string;
        /** Favicon URL */
        favicon?: string;
    }

    let {
        title,
        titleTemplate,
        description,
        keywords,
        canonical,
        ogImage,
        ogType = "website",
        twitterCard = "summary_large_image",
        robots,
        themeColor,
        favicon,
    }: Props = $props();

    const computedTitle = $derived.by(() => {
        if (!title) return undefined;
        if (titleTemplate) {
            return titleTemplate.replace("%s", title);
        }
        return title;
    });

    const computedKeywords = $derived.by(() => {
        if (!keywords) return undefined;
        if (Array.isArray(keywords)) {
            return keywords.join(", ");
        }
        return keywords;
    });
</script>

<svelte:head>
    {#if computedTitle}
        <title>{computedTitle}</title>
        <meta property="og:title" content={computedTitle} />
        <meta name="twitter:title" content={computedTitle} />
    {/if}

    {#if description}
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />
    {/if}

    {#if computedKeywords}
        <meta name="keywords" content={computedKeywords} />
    {/if}

    {#if canonical}
        <link rel="canonical" href={canonical} />
        <meta property="og:url" content={canonical} />
    {/if}

    {#if ogImage}
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
    {/if}

    <meta property="og:type" content={ogType} />
    <meta name="twitter:card" content={twitterCard} />

    {#if robots}
        <meta name="robots" content={robots} />
    {/if}

    {#if themeColor}
        <meta name="theme-color" content={themeColor} />
    {/if}

    {#if favicon}
        <link rel="icon" href={favicon} />
    {/if}
</svelte:head>

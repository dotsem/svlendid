<script lang="ts">
    import { Breadcrumb } from "lib";

    const items = [
        { label: "Home", href: "#" },
        { label: "Products", href: "#" },
        { label: "Category", href: "#" },
        { label: "Current Page" },
    ];
</script>

<Breadcrumb {items} />

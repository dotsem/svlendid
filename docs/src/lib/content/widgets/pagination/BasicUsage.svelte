<script lang="ts">
    import { Pagination } from "lib";

    let page = $state(1);
</script>

<Pagination bind:page totalPages={10} />

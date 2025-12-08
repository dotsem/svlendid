<script lang="ts">
    import { goto } from '$app/navigation';
    import { onMount } from 'svelte';

    onMount(() => {
        goto('/docs');
    });
</script>

<p>Redirecting to documentation...</p>

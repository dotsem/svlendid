<!-- Demo: Button Loading State -->
<script>
    import { Button, Row } from 'lib';
    
    let isLoading = $state(false);
    
    function simulateLoading() {
        isLoading = true;
        setTimeout(() => isLoading = false, 2000);
    }
</script>

<Row gap="m" wrap>
    <Button loading={isLoading} onclick={simulateLoading} width="140px">
        {isLoading ? 'Loading...' : 'Click to load'}
    </Button>
    <Button loading={true} color="secondary" width="120px">
        Loading
    </Button>
</Row>

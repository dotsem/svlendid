<!-- Demo: Button with Icons -->
<script>
    import { Button, Row, Icon } from 'lib';
</script>

<Row gap="m" wrap>
    <Button color="primary">
        {#snippet leadingIcon()}<Icon name="Download" size={18} />{/snippet}
        Download
    </Button>
    <Button color="secondary">
        Next
        {#snippet trailingIcon()}<Icon name="ArrowRight" size={18} />{/snippet}
    </Button>
    <Button variant="outlined" color="primary">
        {#snippet leadingIcon()}<Icon name="Star" size={18} />{/snippet}
        Star
        {#snippet trailingIcon()}<Icon name="ExternalLink" size={18} />{/snippet}
    </Button>
</Row>

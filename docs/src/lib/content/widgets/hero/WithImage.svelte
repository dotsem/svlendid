<script lang="ts">
    import { Hero, Text, Button, Column } from "lib";
</script>

<Hero
    size="s"
    backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200"
    overlay="rgba(0, 0, 0, 0.5)"
>
    <Column gap="m" alignItems="center" style="color: white;">
        <Text variant="h1">Mountain Adventures</Text>
        <Text>Discover breathtaking views and unforgettable experiences.</Text>
        <Button color="primary">Explore Now</Button>
    </Column>
</Hero>

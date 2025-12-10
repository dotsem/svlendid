<script lang="ts">
    import { Image, Row } from "lib";
</script>

<Row gap="m" wrap>
    <Image
        src="https://picsum.photos/200/150"
        alt="Random image"
        width="200px"
        radius="m"
    />
    <Image src="invalid-url" alt="Broken image" width="200px" radius="m" />
</Row>

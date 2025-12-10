<script lang="ts">
    import { Avatar, Row } from "lib";
</script>

<Row gap="m" alignItems="center" wrap>
    <Avatar src="https://i.pravatar.cc/150?u=1" alt="User Avatar" />
    <Avatar initials="JD" />
    <Avatar src="invalid-url" fallback="AB" />
</Row>

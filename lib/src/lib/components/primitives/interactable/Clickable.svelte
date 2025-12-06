<script lang="ts">
    interface Props {
        onClick?: () => void;
        onDoubleClick?: () => void;
        onRightClick?: () => void;
        onHover?: () => void;
    }

    let {
        onClick, onDoubleClick, onRightClick}: Props = {};
</script>
<template>
    <table class="table">
        <caption>
            <slot name="caption"></slot>
        </caption>
        <thead>
            <slot name="header"></slot>
        </thead>

        <draggable v-model="manager.list" group="ItemList" tag="tbody" @start="drag = true" @end="drag = false">
            <slot name="body"></slot>
        </draggable>

        <tfoot>
            <slot name="footer"></slot>
        </tfoot>
    </table>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'ItemList',
    components: {
        draggable,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            drag: false,
        }
    },
}
</script>

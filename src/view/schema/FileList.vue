<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>File</h3>
        </caption>
        <thead>
            <tr>
                <th>Layer</th>
                <th>Class</th>
                <th>File</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="layer in layerxx" :key="layer.name">
                <td>{{ layer.name }}</td>
                <td>{{ layer.getClassName(entity) }}</td>
                <td>
                    <b-button-group class="mr11">
                        <b-button @click="add" variant="outline-primary"> ▼ </b-button>
                        <RenderButton :entity="entity" :layer="layer"></RenderButton>
                    </b-button-group>

                    <span>{{ layer.getFileName(entity) }}</span>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import RenderButton from '../button/RenderButton.vue'

export default {
    name: 'FileList',
    components: {
        RenderButton,
    },
    props: {
        layerxx: {
            type: Array,
            required: true,
        },
        project: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: true,
        },
    },
    methods: {
        add() {
            //
        },
    },
}
</script>

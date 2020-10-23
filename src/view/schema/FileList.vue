<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">File</h3>
            <span>generate PHP file</span>
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
                        <WriteButton :entity="entity" :layer="layer"></WriteButton>
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
import WriteButton from '../button/WriteButton.vue'

export default {
    name: 'FileList',
    components: {
        RenderButton,
        WriteButton,
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
}
</script>

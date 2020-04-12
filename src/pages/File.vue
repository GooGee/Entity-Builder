<template>
    <div>
        <div v-for="layer in layerxx" :key="layer.name">
            <hr />
            <Render :manager="sidebar.item.FileManager" :layer="layer.name"></Render>
        </div>
    </div>
</template>

<script>
import Render from '../components/Render.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'File',
    components: { Render },
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Entity', builder.project.EntityManager)
    },
    computed: {
        layerxx() {
            const exclude = ['Migration', 'Model', 'Factory']
            return builder.project.LayerManager.list.filter(layer => {
                return exclude.indexOf(layer.name) === -1
            })
        },
    },
}
</script>

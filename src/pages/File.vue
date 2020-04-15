<template>
    <div>
        <h1>File</h1>

        <b-tabs>
            <b-tab
                v-for="layer in layerxx"
                @click="selected = layer"
                :title="layer.name"
                :class="{ active: selected.name === layer.name }"
            >
                <Render :manager="sidebar.item.FileManager" :layer="layer.name"></Render>
            </b-tab>
        </b-tabs>
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
            selected: null,
        }
    },
    created() {
        sidebar.show('Entity', builder.project.EntityManager)
        this.selected = this.layerxx[0]
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

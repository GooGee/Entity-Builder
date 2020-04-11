<template>
    <div>
        <Render :manager="sidebar.item.FileManager" :layer="layer"></Render>
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
            layer: '',
        }
    },
    created() {
        this.layer = this.$route.params.layer
        sidebar.show('Entity', builder.project.EntityManager)
    },
}
</script>

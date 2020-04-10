<template>
    <div>
        <h1>{{ name }}</h1>
    </div>
</template>

<script>
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'File',
    data() {
        return {
            builder,
            sidebar,
            name: '',
            layer: null,
        }
    },
    created() {
        this.name = this.$route.query.name
        sidebar.show('Entity', this.manager)
        if (sidebar.item) {
            this.layer = sidebar.item.FileManager.findByLayer(this.name)
        }
    },
    computed: {
        manager() {
            return builder.project.EntityManager
        },
    },
    methods: {},
}
</script>

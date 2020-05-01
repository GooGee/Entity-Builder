<template>
    <Manager name="Entity" :manager="builder.project.EntityManager">
        <FileList v-if="ready" :manager="sidebar.item.FileManager"></FileList>
        <PropertyList v-if="ready" :manager="sidebar.item.PropertyManager"></PropertyList>
    </Manager>
</template>

<script>
import FileList from '../components/FileList.vue'
import Manager from '../components/Manager.vue'
import PropertyList from '../components/PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Entity',
    components: {
        FileList,
        Manager,
        PropertyList,
    },
    data() {
        return {
            builder,
            sidebar,
            ready: false,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

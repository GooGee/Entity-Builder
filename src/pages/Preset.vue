<template>
    <Manager name="Preset" :manager="builder.project.PresetManager">
        <PropertyList v-if="ready" :manager="sidebar.item.PropertyManager"></PropertyList>
    </Manager>
</template>

<script>
import Manager from '../components/Manager.vue'
import PropertyList from '../components/PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Preset',
    components: {
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

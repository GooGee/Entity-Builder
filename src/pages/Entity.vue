<template>
    <Manager name="Entity" :manager="builder.project.EntityManager">
        <FileList v-if="ready" :manager="sidebar.item.FileManager"></FileList>
        <PropertyList v-if="ready" :manager="sidebar.item.PropertyManager"></PropertyList>
        <div>
            <h2 class="inline mr11px">Script</h2>
            <ScriptButton :item="builder.project" name="scriptEntity" :cb="cb"></ScriptButton>
        </div>
    </Manager>
</template>

<script>
import FileList from '../components/FileList.vue'
import Manager from '../components/Manager.vue'
import PropertyList from '../components/PropertyList.vue'
import ScriptButton from '../components/ScriptButton.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Entity',
    components: {
        FileList,
        Manager,
        PropertyList,
        ScriptButton,
    },
    data() {
        return {
            builder,
            sidebar,
            ready: false,
            cb: fff => fff(sidebar.item, builder.project),
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

<template>
    <Render :manager="sidebar.item.FileManager" layer="Migration">
        <FieldList :manager="sidebar.item.FieldManager"></FieldList>
        <IndexList :manager="sidebar.item.IndexManager" :entity="sidebar.item"></IndexList>
    </Render>
</template>

<script>
import FieldList from '../components/FieldList.vue'
import IndexList from '../components/IndexList.vue'
import Render from '../components/Render.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Migration',
    components: { FieldList, IndexList, Render },
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Entity', builder.project.EntityManager)
    },
}
</script>

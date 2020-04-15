<template>
    <Render :manager="sidebar.item.FileManager" layer="Model">
        <CastList :manager="sidebar.item.FieldManager"></CastList>
        <RelationList :manager="sidebar.item.RelationManager"></RelationList>
        <ValidationList :manager="sidebar.item.FieldManager" :entity="sidebar.item"></ValidationList>
    </Render>
</template>

<script>
import CastList from '../components/CastList.vue'
import RelationList from '../components/RelationList.vue'
import ValidationList from '../components/ValidationList.vue'
import Render from '../components/Render.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Model',
    components: { CastList, RelationList, ValidationList, Render },
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

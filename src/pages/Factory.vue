<template>
    <Render :manager="sidebar.item.FileManager" layer="Factory">
        <Faker :manager="sidebar.item.FieldManager"></Faker>
    </Render>
</template>

<script>
import Faker from '../components/Faker.vue'
import Render from '../components/Render.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Factory',
    components: { Faker, Render },
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

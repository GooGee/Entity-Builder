<template>
    <div>
        <Field :manager="sidebar.item.FieldManager"></Field>
        <Index :manager="sidebar.item.IndexManager" :entity="sidebar.item"></Index>
    </div>
</template>

<script>
import Field from '../components/Field.vue'
import Index from '../components/Index.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Migration',
    components: { Field,Index },
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Entity', this.manager)
    },
    computed: {
        manager() {
            return builder.project.EntityManager
        },
    },
}
</script>

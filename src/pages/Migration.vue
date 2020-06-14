<template>
    <Render :manager="sidebar.item.FileManager" layer="Migration">
        <FieldList :manager="sidebar.item.FieldManager"></FieldList>
        <IndexList :manager="sidebar.item.IndexManager" :entity="sidebar.item"></IndexList>

        <template slot="property">
            <tr>
                <td>entity.tableName</td>
                <td>
                    <ChangeButton :item="sidebar.item" name="tableName"></ChangeButton>
                </td>
                <td></td>
            </tr>
        </template>
    </Render>
</template>

<script>
import ChangeButton from '../components/button/ChangeButton.vue'
import FieldList from '../components/FieldList.vue'
import IndexList from '../components/IndexList.vue'
import Render from '../components/Render.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Migration',
    components: {
        ChangeButton,
        FieldList,
        IndexList,
        Render,
    },
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

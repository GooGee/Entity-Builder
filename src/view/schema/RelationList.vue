<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Relation</h3>
            <span>model relationship</span>
        </caption>
        <thead>
            <tr>
                <th>Method Name</th>
                <th>Type</th>
                <th>Parameter List</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="relation" handle=".drag-handle" tag="tbody">
            <Relation
                v-for="relation in manager.list"
                :relation="relation"
                :relationxx="relationxx"
                :manager="manager"
                :key="relation.name"
            ></Relation>
        </draggable>

        <tfoot>
            <tr>
                <td>
                    <SelectButton :list="entityManager.list" :callback="add"></SelectButton>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import draggable from 'vuedraggable'
import SelectButton from '../button/SelectButton.vue'
import Relation from './Relation.vue'
import sss from '@/state.js'

export default {
    name: 'RelationList',
    components: {
        draggable,
        SelectButton,
        Relation,
    },
    computed: {
        manager() {
            return sss.sidebar.item.relationManager
        },
    },
    data() {
        return {
            entityManager: sss.project.entityManager,
            relationxx: sss.getPreset('RelationType').propertyManager.list,
        }
    },
    methods: {
        add(name) {
            if (!name) {
                return
            }
            const found = this.entityManager.find(name)
            const relation = this.manager.link(found, sss.project)
            this.manager.add(relation)
        },
    },
}
</script>

<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Index</h3>
            <span>database table index</span>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th width="120px">Type</th>
                <th>Field List</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="index in manager.list" :key="index.name">
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="index"></DeleteButton>
                        <b-button @click="manager.moveUp(index)" variant="outline-primary"> ↑ </b-button>
                        <b-button @click="manager.moveDown(index)" variant="outline-primary"> ↓ </b-button>
                    </b-button-group>
                </td>
                <td>
                    <select v-model="index.type" class="form-control">
                        <option value="primary">primary</option>
                        <option value="unique">unique</option>
                        <option value="index">index</option>
                    </select>
                </td>
                <td>
                    <draggable v-model="index.fieldManager.list" group="index" tag="span">
                        <b-button-group v-for="field in index.fieldManager.list" :key="field.name" class="inline mr11">
                            <DeleteButton :manager="index.fieldManager" :item="field"></DeleteButton>
                            <b-button variant="outline-secondary"> ✥ {{ field.name }} </b-button>
                        </b-button-group>
                    </draggable>

                    <b-button @click="addField(index)" variant="outline-primary"> + </b-button>
                </td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <td></td>
                <td>
                    <AddButton :manager="manager" name=""></AddButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import draggable from 'vuedraggable'
import sss from '@/state.js'

export default {
    name: 'IndexList',
    components: {
        AddButton,
        draggable,
        DeleteButton,
    },
    computed: {
        manager() {
            return sss.sidebar.item.indexManager
        },
    },
    methods: {
        addField(index) {
            sss.listDialogue.showList(sss.sidebar.item.fieldManager.list, 'Select a Field', () => {
                try {
                    const selected = sss.listDialogue.selected
                    const field = index.fieldManager.make(selected.name)
                    index.fieldManager.add(field)
                } catch (error) {
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            })
        },
    },
}
</script>

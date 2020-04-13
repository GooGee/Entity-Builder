<template>
    <table class="table">
        <caption>
            <h3>Index</h3>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th width="120px">Type</th>
                <th>Field</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="index in manager.list" :key="index.name">
                <td class="button-cell">
                    <b-button-group>
                        <b-button @click="remove(index)" variant="outline-danger"> - </b-button>
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
                    <IndexField
                        v-for="field in index.FieldManager.list"
                        :key="field.name"
                        :index="index"
                        :field="field"
                        class="inline mr11px"
                    ></IndexField>

                    <b-button @click="addField(index)" variant="outline-primary"> + </b-button>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <b-button @click="add" variant="outline-primary"> + </b-button>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import IndexField from './IndexField.vue'
import builder from '../states/builder.js'
import dialogue from '../states/listdialogue.js'

export default {
    name: 'IndexList',
    components: { IndexField },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: true,
        },
    },
    methods: {
        add() {
            const name = 'index' + Date.now()
            const index = this.manager.make(name)
            this.manager.add(index)
        },
        addField(index) {
            dialogue.show(this.entity.FieldManager.list, 'name', 'Select a Field', ok => {
                try {
                    const fff = index.FieldManager.make(dialogue.selected.name)
                    index.FieldManager.add(fff)
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            })
        },
        remove(index) {
            if (confirm('Are you sure?')) {
                this.manager.remove(index)
            }
        },
    },
}
</script>

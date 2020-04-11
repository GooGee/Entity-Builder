<template>
    <table class="table">
        <caption>
            <h3>Relation</h3>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th width="180px">Type</th>
                <th>Model</th>
                <th>Method Name</th>
                <th>Other Parameters</th>
            </tr>
        </thead>
        <tbody>
            <Relation
                v-for="relation in manager.list"
                :relation="relation"
                :manager="manager"
                :key="relation.name"
            ></Relation>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td>
                    <select @change="add($event.target.value)" class="form-control">
                        <option selected="true" disabled="disabled"> ---- </option>
                        <option v-for="entity in EntityList" :value="entity.name" :key="entity.name">
                            {{ entity.name }}
                        </option>
                    </select>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import Relation from './Relation.vue'
import builder from '../states/builder.js'

export default {
    name: 'RelationList',
    components: { Relation },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            EntityList: builder.project.EntityManager.list,
        }
    },
    methods: {
        add(name) {
            try {
                const found = this.EntityList.find(item => item.name === name)
                const relation = this.manager.link(found)
                this.manager.add(relation)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

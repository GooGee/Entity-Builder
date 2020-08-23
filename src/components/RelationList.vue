<template>
    <ItemList :manager="manager">
        <template slot="caption">
            <h3>Relation</h3>
        </template>

        <template slot="header">
            <tr>
                <th>Method Name</th>
                <th>Type</th>
                <th>Parameter List</th>
            </tr>
        </template>

        <template slot="body">
            <Relation
                v-for="relation in manager.list"
                :relation="relation"
                :manager="manager"
                :key="relation.name"
            ></Relation>
        </template>

        <template slot="footer">
            <tr>
                <td>
                    <select v-model="selected" @change="add($event.target.value)" class="form-control">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="entity in EntityList" :value="entity.name" :key="entity.name">
                            {{ entity.name }}
                        </option>
                    </select>
                </td>
                <td></td>
                <td></td>
            </tr>
        </template>
    </ItemList>
</template>

<script>
import ItemList from './ItemList.vue'
import Relation from './Relation.vue'
import builder from '../states/builder.js'

export default {
    name: 'RelationList',
    components: {
        ItemList,
        Relation,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            EntityList: builder.project.EntityManager.list,
            selected: '',
        }
    },
    methods: {
        add(name) {
            if (!name) {
                return
            }
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
            this.selected = ''
        },
    },
}
</script>

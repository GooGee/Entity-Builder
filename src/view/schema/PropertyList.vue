<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <slot></slot>
        </caption>
        <thead>
            <tr>
                <th @click="sort('name')" :aria-sort="sortText('name')">name</th>
                <th @click="sort('value')" :aria-sort="sortText('value')">value</th>
            </tr>
        </thead>

        <tbody>
            <tr v-for="item in manager.list" :key="item.name">
                <td>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="item"></DeleteButton>
                        <ChangeButton :item="item" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="item.value"></b-form-input>
                </td>
            </tr>
        </tbody>

        <tfoot>
            <tr v-if="mutable">
                <td>
                    <AddButton :manager="manager"></AddButton>
                </td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'

export default {
    name: 'PropertyList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        mutable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    data() {
        return {
            sortField: 'name',
            sortAsc: true,
        }
    },
    methods: {
        sort(field) {
            this.sortField = field
            this.sortAsc = !this.sortAsc
            if (this.sortAsc) {
                this.manager.list = this.manager.list.sort((one, two) => {
                    return one[field].localeCompare(two[field])
                })
            } else {
                this.manager.list = this.manager.list.sort((one, two) => {
                    return two[field].localeCompare(one[field])
                })
            }
        },
        sortText(field) {
            if (this.sortField === field) {
                return this.sortAsc ? 'ascending' : 'descending'
            }
            return 'none'
        },
    },
}
</script>

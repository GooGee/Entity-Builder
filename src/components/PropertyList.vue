<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th @click="sort('name')" :aria-sort="sortText('name')">name</th>
                <th @click="sort('value')" :aria-sort="sortText('value')">value</th>
                <th @click="sort('tag')" :aria-sort="sortText('tag')">tag</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
            <tr v-for="property in manager.list" :key="property.name">
                <td class="button-cell">
                    <b-button-group>
                        <b-button @click="remove(property)" variant="outline-danger"> - </b-button>
                        <b-button @click="manager.moveUp(property)" variant="outline-primary"> ↑ </b-button>
                        <b-button @click="manager.moveDown(property)" variant="outline-primary"> ↓ </b-button>
                    </b-button-group>
                </td>
                <td>
                    <b-button @click="setName(property)" variant="outline-primary"> {{ property.name }} </b-button>
                </td>
                <td>
                    <b-form-input v-model="property.value"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="property.tag"></b-form-input>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr v-if="mutable">
                <td></td>
                <td>
                    <b-button @click="add" variant="outline-primary"> + </b-button>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
export default {
    name: 'PropertyList',
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
        add() {
            const name = prompt('Please input the name')
            if (name) {
                try {
                    const property = this.manager.make(name)
                    this.manager.add(property)
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
        remove(property) {
            if (confirm('Are you sure?')) {
                this.manager.remove(property)
            }
        },
        setName(property) {
            const name = prompt('Please input the name', property.name)
            if (name) {
                try {
                    property.name = name
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
    },
}
</script>

<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th @click="sort('name')" :aria-sort="sortText('name')">name</th>
                <th @click="sort('value')" :aria-sort="sortText('value')">value</th>
                <th @click="sort('tag')" :aria-sort="sortText('tag')">tag</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="PropertyList" tag="tbody" @start="drag = true" @end="drag = false">
            <tr v-for="property in manager.list" :key="property.name">
                <td>
                    <b-button-group>
                        <b-button @click="remove(property)" variant="outline-danger"> - </b-button>
                        <b-button @click="setName(property)" variant="outline-primary"> {{ property.name }} </b-button>
                    </b-button-group>
                </td>
                <td>
                    <b-form-input v-model="property.value"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="property.tag"></b-form-input>
                </td>
            </tr>
            <slot slot="header"></slot>
        </draggable>

        <tfoot>
            <tr v-if="mutable">
                <td>
                    <b-button-group>
                        <b-button @click="add" variant="outline-primary"> + </b-button>
                        <b-button @click="visible = true" variant="outline-primary"> Import </b-button>
                    </b-button-group>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tfoot>

        <b-modal @ok="input" v-model="visible" title="Paste JSON here" size="xl">
            <textarea v-model="json" class="form-control" spellcheck="false" rows="11"></textarea>
            <b-form-group label="Unique Name">
                <b-form-radio v-model="skip" :value="true">Skip if exist</b-form-radio>
                <b-form-radio v-model="skip" :value="false">Replace if exist</b-form-radio>
            </b-form-group>
        </b-modal>
    </table>
</template>

<script>
import draggable from 'vuedraggable'

export default {
    name: 'PropertyList',
    components: {
        draggable,
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
            json: '',
            visible: false,
            skip: false,
            drag: false,
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
        input() {
            try {
                const list = JSON.parse(this.json)
                if (Array.isArray(list)) {
                    list.forEach(item => {
                        if ('string' === typeof item) {
                            item = { name: item }
                        }
                        let found = this.manager.find(item.name)
                        if (found) {
                            if (this.skip) {
                                return
                            }
                        } else {
                            found = this.manager.make(item.name)
                            this.manager.add(found)
                        }
                        if (item.value !== undefined) {
                            found.value = item.value
                        }
                        if (item.tag !== undefined) {
                            found.tag = item.tag
                        }
                        if (item.data) {
                            if ('object' === typeof item.data) {
                                found.data = item.data
                            }
                        }
                    })
                    return
                }
                throw new Error('JSON must be an Array')
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
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

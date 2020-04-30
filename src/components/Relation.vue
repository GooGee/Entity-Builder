<template>
    <tr>
        <td>
            <b-button-group>
                <b-button @click="remove(relation)" variant="outline-danger"> - </b-button>
                <b-button @click="rename" variant="outline-primary">
                    {{ relation.name }}
                </b-button>
            </b-button-group>
        </td>
        <td>
            <select v-model="relation.type" class="form-control">
                <option v-for="item in relationxx" :value="item.name"> {{ item.name }} </option>
            </select>
        </td>
        <td>
            <b-form-input v-model="relation.parameter"></b-form-input>
        </td>
    </tr>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Relation',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        relation: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            relationxx: builder.project.PresetManager.find('RelationType').PropertyManager.list,
        }
    },
    computed: {
        hasForeignKey() {
            return this.relation.type != 'belongsTo'
        },
        hasLocalKey() {
            return this.relation.type == 'belongsTo' || this.relation.type == 'belongsToMany'
        },
    },
    methods: {
        rename() {
            const name = prompt('Please input the Method name', this.relation.name)
            if (name) {
                try {
                    this.relation.name = name
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
        remove() {
            if (confirm('Are you sure?')) {
                this.manager.remove(this.relation)
            }
        },
    },
}
</script>

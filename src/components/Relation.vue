<template>
    <tr>
        <td class="button-cell">
            <b-button-group>
                <b-button @click="remove(relation)" variant="outline-danger"> - </b-button>
                <b-button @click="manager.moveUp(relation)" variant="outline-primary"> ↑ </b-button>
                <b-button @click="manager.moveDown(relation)" variant="outline-primary"> ↓ </b-button>
            </b-button-group>
        </td>
        <td>
            <select v-model="relation.type" class="form-control">
                <option value="belongsTo">belongsTo</option>
                <option value="belongsToMany">belongsToMany</option>
                <option value="hasOne">hasOne</option>
                <option value="hasMany">hasMany</option>
            </select>
        </td>
        <td>{{ relation.model }}</td>
        <td>
            <b-button @click="rename" variant="outline-primary">
                {{ relation.name }}
            </b-button>
        </td>
        <td>
            <b-form-input v-model="relation.parameter" placeholder="other parameters"></b-form-input>
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
        return {}
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

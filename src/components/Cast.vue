<template>
    <table class="table">
        <caption>
            <h3>Cast</h3>
        </caption>
        <thead>
            <tr>
                <th width="120px">Field</th>
                <th width="120px">Type</th>
                <th width="66px">Fillable</th>
                <th width="66px">Hidden</th>
                <th>Cast</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in manager.list" :key="field.name">
                <td>{{ field.name }}</td>
                <td>{{ field.type }}</td>
                <td><input v-model="field.fillable" class="checkbox" type="checkbox" /></td>
                <td><input v-model="field.hidden" class="checkbox" type="checkbox" /></td>
                <td>
                    <b-button-group>
                        <b-button @click="select(field)" variant="outline-primary"> {{ plus(field) }} </b-button>
                        <b-button @click="change(field)" variant="outline-primary"> * </b-button>
                    </b-button-group>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import Entity from '../states/entity.js'
import dialogue from '../states/listdialogue.js'

const CastTypeList = Array.from(Entity.PHPTypeCastMap.keys())

export default {
    name: 'Cast',
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    methods: {
        plus(field) {
            if (field.cast) {
                return field.cast
            }
            return '+'
        },
        select(field) {
            dialogue.showBlank = true
            dialogue.show(CastTypeList, '', 'Select a Type', ok => {
                if (dialogue.selected) {
                    field.cast = dialogue.selected
                } else {
                    field.cast = ''
                }
            })
        },
        change(field) {
            if (field.cast) {
                const text = prompt('Please input something', field.cast)
                if (text) {
                    field.cast = text
                }
            }
        },
    },
}
</script>

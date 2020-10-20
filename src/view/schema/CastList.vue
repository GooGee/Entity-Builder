<template>
    <table class="table b-table b-table-caption-top">
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
                <td>
                    <b-form-checkbox v-model="field.fillable"></b-form-checkbox>
                </td>
                <td>
                    <b-form-checkbox v-model="field.hidden"></b-form-checkbox>
                </td>
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
import sss from '@/state.js'

export default {
    name: 'CastList',
    computed: {
        manager() {
            return sss.sidebar.item.fieldManager
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
            const list = sss.getPreset('CastPHP').propertyManager.list
            sss.listDialogue.showList(list, 'Select a Type', () => {
                field.cast = sss.listDialogue.selected.name
            })
        },
        change(field) {
            const text = prompt('Please input something', field.cast)
            if ('string' === typeof text) {
                field.cast = text
            }
        },
    },
}
</script>

<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Faker</h3>
            <a href="https://github.com/fzaninotto/Faker" target="_blank">GitHub</a>
        </caption>
        <thead>
            <tr>
                <th width="120px">Field</th>
                <th width="120px">Type</th>
                <th>PHP / Faker</th>
                <th>Method / Property</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in manager.list" :key="field.name">
                <td>{{ field.name }}</td>
                <td>{{ field.type }}</td>
                <td>
                    <select v-model="field.seed.type" class="form-control">
                        <option value="raw">Raw</option>
                        <option value="property">Property</option>
                        <option value="method">Method</option>
                    </select>
                </td>
                <td>
                    <div v-if="'raw' === field.seed.type">
                        <b-form-input v-model="field.seed.value"></b-form-input>
                    </div>
                    <div v-else class="form-inline">
                        <b-form-checkbox v-model="field.seed.unique" class="mr11"> Unique </b-form-checkbox>

                        <template v-if="'method' === field.seed.type">
                            <b-button @click="setMethod(field)" variant="outline-primary" class="mr11">
                                {{ plus(field.seed) }}
                            </b-button>
                            (
                            <b-form-input v-model="field.seed.parameter"></b-form-input>
                            )
                        </template>

                        <b-button v-else @click="setProperty(field)" variant="outline-primary">
                            {{ plus(field.seed) }}
                        </b-button>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'Faker',
    computed: {
        manager() {
            return sss.sidebar.item.fieldManager
        },
    },
    methods: {
        plus(seed) {
            if (seed.value) {
                return seed.value
            }
            return '+'
        },
        setMethod(field) {
            const list = sss.getPreset('FakerMethod').propertyManager.list
            sss.listDialogue.showList(list, 'Select a Method', () => {
                field.seed.value = sss.listDialogue.selected.name
            })
        },
        setProperty(field) {
            const list = sss.getPreset('FakerProperty').propertyManager.list
            sss.listDialogue.showList(list, 'Select a Property', () => {
                field.seed.value = sss.listDialogue.selected.name
            })
        },
    },
}
</script>

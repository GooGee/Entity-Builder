<template>
    <table class="table">
        <caption>
            <h3>Faker</h3>
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
                    <div v-if="'raw' == field.seed.type">
                        <b-form-input v-model="field.seed.raw"></b-form-input>
                    </div>
                    <div v-else class="form-inline">
                        <b-form-checkbox v-model="field.seed.unique" class="mr11px"> Unique </b-form-checkbox>

                        <template v-if="'method' == field.seed.type">
                            <b-button @click="setMethod(field)" variant="outline-primary" class="mr11px">
                                {{ field.seed.method }}
                            </b-button>
                            (
                            <b-form-input v-model="field.seed.parameter"></b-form-input>
                            )
                        </template>

                        <template v-if="'property' == field.seed.type">
                            <b-button @click="setProperty(field)" variant="outline-primary">
                                {{ field.seed.property }}
                            </b-button>
                        </template>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import builder from '../states/builder.js'
import dialogue from '../states/listdialogue.js'

export default {
    name: 'Faker',
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    methods: {
        setMethod(field) {
            const list = builder.project.PresetManager.find('FakerMethod').PropertyManager.list
            dialogue.show(list, 'name', 'Select a Method', ok => {
                field.seed.method = dialogue.selected.name
            })
        },
        setProperty(field) {
            const list = builder.project.PresetManager.find('FakerProperty').PropertyManager.list
            dialogue.show(list, 'name', 'Select a Method', ok => {
                field.seed.property = dialogue.selected.name
            })
        },
    },
}
</script>

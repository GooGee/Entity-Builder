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
                        <input v-model="field.seed.raw" class="form-control" type="text" />
                    </div>
                    <div v-else class="form-inline">
                        <label><input v-model="field.seed.unique" type="checkbox" /> Unique </label>

                        <template v-if="'method' == field.seed.type">
                            <b-button @click="setMethod(field)" variant="outline-primary">
                                {{ field.seed.method }}
                            </b-button>
                            (
                            <input v-model="field.seed.parameter" class="form-control" type="text" />
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
            const list = builder.project.PresetManager.find('FakerMethod').DataManager.list
            dialogue.show(list, 'name', 'Select a Method', ok => {
                field.seed.method = dialogue.selected.name
            })
        },
        setProperty(field) {
            const list = builder.project.PresetManager.find('FakerProperty').DataManager.list
            dialogue.show(list, 'name', 'Select a Method', ok => {
                field.seed.property = dialogue.selected.name
            })
        },
    },
}
</script>

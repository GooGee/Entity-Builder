<template>
    <table class="table">
        <caption>
            <h3>Validation</h3>
        </caption>
        <thead>
            <tr>
                <th width="120px">Field</th>
                <th width="120px">Type</th>
                <th>Rule</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="field in manager.list" :key="field.name" :class="{ disabled: !field.included }">
                <td>
                    <b-form-checkbox v-model="field.included"> {{ field.name }} </b-form-checkbox>
                </td>
                <td>{{ field.type }}</td>
                <td>
                    <RuleTab :manager="field.RuleManager"></RuleTab>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td></td>
                <td></td>
                <td>
                    <b-button @click="setRule" variant="outline-primary"> Auto Set Rule </b-button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import setRule from '../helpers/rule.js'
import RuleTab from './RuleTab.vue'

export default {
    name: 'ValidationList',
    components: { RuleTab },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: true,
        },
    },
    methods: {
        setRule() {
            setRule(this.entity)
        },
    },
}
</script>

<style>
.table tr.disabled {
    color: #888888;
}

ul.rule {
    margin: 0;
    padding: 0;
}

.table tr.disabled ul.rule {
    display: none;
}

.table tr.disabled .none-rule {
    display: none;
}

ul.rule .editing {
    line-height: 3;
}

ul.rule input {
    width: 333px;
    display: inline-block;
}
</style>

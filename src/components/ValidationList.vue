<template>
    <table class="table">
        <caption>
            <h3>Validation</h3>
        </caption>
        <thead>
            <tr>
                <th width="120px">Field</th>
                <th width="120px">Type</th>
                <th>Rule List</th>
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
import { makePreset } from '../helpers/project.js'
import builder from '../states/builder.js'
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
            try {
                setRule(this.entity, builder.project)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

<style>
tr.disabled td {
    color: darkgray;
}
</style>

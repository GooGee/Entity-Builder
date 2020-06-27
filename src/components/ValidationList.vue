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
                <td colspan="3">
                    <span class="mr11px">Script</span>
                    <ScriptButton :item="builder.project" name="scriptSetValidationRule" :cb="cb"></ScriptButton>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import ScriptButton from '../components/button/ScriptButton.vue'
import { makePreset } from '../helpers/project.js'
import builder from '../states/builder.js'
import RuleTab from './RuleTab.vue'

export default {
    name: 'ValidationList',
    components: {
        RuleTab,
        ScriptButton,
    },
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
    data() {
        return {
            builder,
            cb: fff => fff(this.entity, builder.project),
        }
    },
}
</script>

<style>
tr.disabled td {
    color: darkgray;
}
</style>

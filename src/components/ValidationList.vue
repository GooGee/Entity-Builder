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
                    <b-button-group>
                        <b-button @click="setRule" variant="outline-primary"> Run </b-button>
                        <b-button @click="visible = !visible" variant="outline-primary"> Script </b-button>
                    </b-button-group>
                </td>
            </tr>
            <tr v-if="visible">
                <td colspan="3">
                    <textarea
                        v-model="builder.project.scriptSetValidationRule"
                        class="form-control"
                        spellcheck="false"
                        rows="22"
                    ></textarea>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
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
    data() {
        return {
            builder,
            visible: false,
        }
    },
    methods: {
        setRule() {
            try {
                const fff = new Function('return ' + builder.project.scriptSetValidationRule)()
                fff(this.entity, builder.project)
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

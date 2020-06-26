<template>
    <div @click="editing = true">
        <template v-if="hasParameter">
            <div v-if="editing">
                <span> Parameter: </span>
                <b-form-input v-model="field.length"></b-form-input>
            </div>
            <div v-else>
                <span v-if="field.length"> Parameter: {{ field.length }} </span>
            </div>
        </template>

        <div v-if="editing">
            <span> Collation: </span>
            <b-form-input v-model="field.collation"></b-form-input>
        </div>
        <div v-else>
            <span v-if="field.collation"> Collation: {{ field.comment }} </span>
        </div>

        <div v-if="editing">
            <span> Comment: </span>
            <b-form-input v-model="field.comment"></b-form-input>
        </div>
        <div v-else>
            <span v-if="field.comment"> Comment: {{ field.comment }} </span>
        </div>

        <div v-if="editing">
            <span> Default: </span>
            <b-form-input v-model="field.value"></b-form-input>
        </div>
        <div v-else>
            <span v-if="field.value"> Default: {{ field.value }} </span>
        </div>

        <div v-if="editing">
            <b-form-checkbox v-model="field.allowNull"> Allow Null </b-form-checkbox>
        </div>
        <div v-else>
            <span v-if="field.allowNull"> Allow Null </span>
        </div>

        <div v-if="editing">
            <b-form-checkbox v-model="field.useCurrent"> Current TimeStamp </b-form-checkbox>
        </div>
        <div v-else>
            <span v-if="field.useCurrent"> Current TimeStamp </span>
        </div>

        <div v-if="editing">
            <b-form-checkbox v-model="field.unsigned"> Unsigned </b-form-checkbox>
        </div>
        <div v-else>
            <span v-if="field.unsigned"> Unsigned </span>
        </div>

        <div v-if="editing">
            <b-button @click.stop="editing = false" variant="outline-primary"> OK </b-button>
        </div>
        <div v-else>....</div>
    </div>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'FieldPanel',
    props: {
        field: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            FieldTypeWithParameter: builder.project.PresetManager.find('FieldTypeWithParameter').PropertyManager,
        }
    },
    computed: {
        hasParameter() {
            return this.FieldTypeWithParameter.find(this.field.type)
        },
    },
}
</script>

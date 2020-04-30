<template>
    <div @click="editing = true">
        <div v-if="editing">
            <span> Default: </span>
            <b-form-input v-model="field.value"></b-form-input>
        </div>
        <div v-else>
            <span v-if="field.value"> Default: {{ field.value }} </span>
        </div>

        <div v-if="editing">
            <span> Comment: </span>
            <b-form-input v-model="field.comment"></b-form-input>
        </div>
        <div v-else>
            <span v-if="field.comment"> Comment: {{ field.comment }} </span>
        </div>

        <div v-if="editing">
            <b-form-checkbox v-model="field.allowNull"> Allow Null </b-form-checkbox>
        </div>
        <div v-else>
            <span v-if="field.allowNull"> Allow Null </span>
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
        }
    },
}
</script>

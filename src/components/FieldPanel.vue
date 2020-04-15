<template>
    <div @click="editing = true">
        <div v-if="editing">
            <label><input type="checkbox" @click="check(field)" :checked="field.value" /> Default: </label>
            <input v-model="field.value" class="form-control" type="text" />
        </div>
        <div v-else>
            <span v-if="field.value"> Default: {{ field.value }} </span>
        </div>

        <div v-if="editing">
            <span> Comment: </span>
            <input v-model="field.comment" class="form-control" type="text" />
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

        <template v-if="field.isNumber">
            <div v-if="editing">
                <b-form-checkbox v-model="field.unsigned"> Unsigned </b-form-checkbox>
            </div>
            <div v-else>
                <span v-if="field.unsigned"> Unsigned </span>
            </div>
        </template>

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
    methods: {
        check(field) {
            if (field.value === '') {
                if (field.isNumber) {
                    field.value = '0'
                } else {
                    field.value = "''"
                }
            } else {
                field.value = ''
            }
        },
    },
}
</script>

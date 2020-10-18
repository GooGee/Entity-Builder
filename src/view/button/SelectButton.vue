<template>
    <b-form-select v-model="selected" @change="add" :options="list" :value-field="name" :text-field="text">
        <template v-slot:first>
            <b-form-select-option value="" disabled>----</b-form-select-option>
        </template>
    </b-form-select>
</template>

<script>
export default {
    name: 'SelectButton',
    props: {
        list: {
            type: Array,
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: 'name',
        },
        text: {
            type: String,
            required: false,
            default: 'name',
        },
        callback: {
            type: Function,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            selected: '',
        }
    },
    methods: {
        add(text) {
            try {
                if (this.callback) {
                    this.callback(text)
                }
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
            this.selected = ''
        },
    },
}
</script>

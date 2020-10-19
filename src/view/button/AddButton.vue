<template>
    <b-button @click="add" variant="outline-primary"> + </b-button>
</template>

<script>
export default {
    name: 'AddButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: false,
            default: 'name',
        },
        value: {
            type: String,
            required: false,
            default: 'name',
        },
    },
    data() {
        return {
            index: 0,
        }
    },
    created() {
        if (this.name) {
            return
        }

        this.manager.list.forEach(item => {
            this.index += 1
            item.name = 'key' + this.index
        })
    },
    methods: {
        add() {
            let value = ''
            if (this.name) {
                value = prompt(`Please input the ${this.name}`, this.value)
            } else {
                this.index += 1
                value = 'key' + this.index
            }
            if (value) {
                try {
                    const item = this.manager.make(value)
                    if (this.name === '') {
                        item.name = value
                    }
                    this.manager.add(item)
                } catch (error) {
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
    },
}
</script>

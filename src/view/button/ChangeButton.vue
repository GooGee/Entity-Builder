<template>
    <b-button @click="change" variant="outline-primary"> {{ item[name] }} </b-button>
</template>

<script>
export default {
    name: 'ChangeButton',
    props: {
        item: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
    },
    methods: {
        change() {
            const value = prompt(`Please input the ${this.name}`, this.item[this.name])
            if (value) {
                try {
                    this.item[this.name] = value
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

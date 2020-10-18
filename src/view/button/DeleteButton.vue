<template>
    <b-button @click="remove" variant="outline-danger">
        -
    </b-button>
</template>

<script>
export default {
    name: 'DeleteButton',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        item: {
            type: Object,
            required: true,
        },
    },
    methods: {
        remove() {
            if (confirm('Are you sure?')) {
                try {
                    this.manager.remove(this.item)
                    this.$emit('deleted')
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

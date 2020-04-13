<template>
    <div>
        <div v-if="editing">
            <b-button-group>
                <b-button @click="save" variant="outline-primary"> OK </b-button>
                <b-button @click="editing = false" variant="outline-danger"> Cancel </b-button>
            </b-button-group>
            <textarea v-model="text" class="form-control" rows="11"></textarea>
        </div>

        <pre v-else @click="editing = true">{{ text }}</pre>
    </div>
</template>

<script>
export default {
    name: 'Data',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            text: '',
        }
    },
    created() {
        this.text = JSON.stringify(this.item.data)
    },
    methods: {
        save() {
            try {
                this.item.data = JSON.parse(this.text)
                this.editing = false
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

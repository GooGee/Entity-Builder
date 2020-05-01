<template>
    <div>
        <h1>
            <span class="mr11px">{{ name }}</span>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="change" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>
        </h1>

        <b-form-input v-model="sidebar.item.description" placeholder="Description"></b-form-input>

        <slot></slot>
    </div>
</template>

<script>
import sidebar from '../states/sidebar.js'

export default {
    name: 'Manager',
    props: {
        name: {
            type: String,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            sidebar,
        }
    },
    created() {
        sidebar.show(this.name, this.manager)
    },
    methods: {
        change() {
            const name = prompt('Please input the name', sidebar.item.name)
            if (name) {
                try {
                    sidebar.item.name = name
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
        remove() {
            if (confirm('Are you sure?')) {
                sidebar.remove(sidebar.item)
            }
        },
    },
}
</script>

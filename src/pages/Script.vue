<template>
    <div>
        <b-button-group>
            <b-button @click="change" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            <b-button @click="remove" variant="outline-danger"> X </b-button>
        </b-button-group>
        <textarea class="form-control" rows="33">{{ sidebar.item.text }}</textarea>
    </div>
</template>

<script>
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Script',
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Script', this.manager)
    },
    computed: {
        manager() {
            return builder.project.ScriptManager
        },
    },
    methods: {
        change() {
            const name = prompt('Please input the name', sidebar.item.name)
            if (name) {
                try {
                    sidebar.item.name = name
                } catch (error) {
                    console.error(error)
                    alert(error)
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

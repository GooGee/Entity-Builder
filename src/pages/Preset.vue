<template>
    <div>
        <div>
            <h1 class="inline mr11px">Preset</h1>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="change" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>
            <b-form-input v-model="sidebar.item.description" placeholder="Description"></b-form-input>
        </div>

        <PresetList :manager="sidebar.item.DataManager"></PresetList>
    </div>
</template>

<script>
import PresetList from '../components/PresetList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Preset',
    components: { PresetList },
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Preset', builder.project.PresetManager)
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

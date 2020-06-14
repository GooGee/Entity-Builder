<template>
    <Manager name="Entity" :manager="builder.project.EntityManager">
        <FileList v-if="ready" :manager="sidebar.item.FileManager"></FileList>
        <PropertyList v-if="ready" :manager="sidebar.item.PropertyManager"></PropertyList>
        <div>
            <b-button-group>
                <b-button @click="run" variant="outline-primary"> Run </b-button>
                <b-button @click="visible = !visible" variant="outline-primary"> Script </b-button>
            </b-button-group>
            <br />
            <br />
            <textarea
                v-if="visible"
                v-model="builder.project.scriptEntity"
                class="form-control"
                spellcheck="false"
                rows="22"
            ></textarea>
        </div>
    </Manager>
</template>

<script>
import FileList from '../components/FileList.vue'
import Manager from '../components/Manager.vue'
import PropertyList from '../components/PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Entity',
    components: {
        FileList,
        Manager,
        PropertyList,
    },
    data() {
        return {
            builder,
            sidebar,
            ready: false,
            visible: false,
        }
    },
    mounted() {
        this.ready = true
    },
    methods: {
        run() {
            try {
                const fff = new Function('return ' + builder.project.scriptEntity)()
                fff(sidebar.item, builder.project)
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

<template>
    <div>
        <div>
            <h1 class="inline mr11px">{{ layer }}</h1>
            <b-button-group v-if="file">
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="script" variant="outline-primary"> Script </b-button>
                <b-button @click="template" variant="outline-primary"> Template </b-button>
                <b-button @click="preview" variant="outline-primary"> Preview </b-button>
            </b-button-group>
            <b-button v-else @click="make" variant="outline-primary"> + </b-button>
        </div>

        <div v-if="file">
            <slot></slot>

            <PropertyList :manager="file.PropertyManager"></PropertyList>

            <b-modal v-model="visible" :title="title" size="xl" hide-footer>
                <pre>{{ code }}</pre>
            </b-modal>
        </div>
    </div>
</template>

<script>
import PropertyList from '../components/PropertyList.vue'
import render from '../helpers/render.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Render',
    components: { PropertyList },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        layer: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            builder,
            title: '',
            code: '',
            visible: false,
        }
    },
    computed: {
        file() {
            const found = this.manager.findByLayer(this.layer)
            if (found) {
                return found
            }
            return null
        },
    },
    methods: {
        script() {
            const script = builder.project.ScriptManager.find(this.file.layer.script)
            this.code = script.text
            this.title = script.name
            this.visible = true
        },
        template() {
            const template = builder.project.TemplateManager.find(this.file.layer.template)
            this.code = template.text
            this.title = template.name
            this.visible = true
        },
        preview() {
            try {
                this.code = render(builder.project, sidebar.item, this.file)
                this.title = this.file.fileName
                this.visible = true
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        make() {
            try {
                const file = this.manager.make(this.layer)
                this.manager.add(file)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        remove() {
            if (confirm('Are you sure?')) {
                this.manager.remove(this.file)
            }
        },
    },
}
</script>

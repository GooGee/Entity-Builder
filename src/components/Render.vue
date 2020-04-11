<template>
    <div>
        <div>
            <h1 class="inline mr4px">{{ layer }}</h1>
            <b-button-group v-if="file">
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="preview" variant="outline-primary"> Preview </b-button>
            </b-button-group>
            <b-button v-else @click="make" variant="outline-primary"> + </b-button>
        </div>

        <b-modal v-model="visible" :title="layer" size="xl" hide-footer id="CodeDialogue">
            <pre>{{ code }}</pre>
        </b-modal>
    </div>
</template>

<script>
import render from '../helpers/render.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Render',
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
            code: '',
            file: null,
            visible: false,
        }
    },
    created() {
        const found = this.manager.findByLayer(this.layer)
        if (found) {
            this.file = found
        }
    },
    methods: {
        preview() {
            try {
                this.code = render(builder.project, sidebar.item, this.file)
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
                this.file = this.manager.make(this.layer)
                this.manager.add(this.file)
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
                this.file = null
            }
        },
    },
}
</script>

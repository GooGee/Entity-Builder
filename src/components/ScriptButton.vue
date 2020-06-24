<template>
    <div class="inline">
        <b-button-group>
            <b-button @click="changeScript" variant="outline-primary"> {{ scriptName }} </b-button>
            <b-button @click="showScript" variant="outline-primary"> View </b-button>
            <b-button @click="runScript" variant="outline-primary"> Run </b-button>
        </b-button-group>
        
        <b-modal v-model="visible" :title="title" size="xl" hide-footer>
            <pre>{{ code }}</pre>
        </b-modal>
    </div>
</template>

<script>
import builder from '../states/builder.js'
import dialogue from '../states/listdialogue.js'

export default {
    name: 'ScriptButton',
    props: {
        item: {
            type: Object,
            required: true,
        },
        name: {
            type: String,
            required: true,
        },
        cb: {
            type: Function,
            required: false,
            default: null,
        },
    },
    data() {
        return {
            code: '',
            title: '',
            visible: false,
        }
    },
    computed: {
        scriptName() {
            return this.item[this.name]
        },
    },
    methods: {
        changeScript() {
            dialogue.show(builder.project.ScriptManager.list, 'name', 'Select a Script', ok => {
                try {
                    this.item[this.name] = dialogue.selected.name
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            })
        },
        runScript() {
            try {
                const script = builder.project.ScriptManager.find(this.scriptName)
                const fff = new Function('return ' + script.text)()
                if (this.cb) {
                    this.cb(fff)
                }
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        showScript() {
            const script = builder.project.ScriptManager.find(this.scriptName)
            if (script) {
                this.title = script.name
                this.code = script.text
                this.visible = true
                return
            }

            this.$bvToast.toast(this.scriptName + ' not found', {
                title: 'i',
                variant: 'danger',
                solid: true,
            })
        },
    },
}
</script>

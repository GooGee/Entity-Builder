<template>
    <table class="table">
        <caption>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="change" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>

            <b-modal v-model="visible" :title="title" size="xl" hide-footer>
                <pre>{{ code }}</pre>
            </b-modal>
        </caption>
        <tbody>
            <tr>
                <td class="text-right">path</td>
                <td>
                    <b-form-input v-model="sidebar.item.path"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-input v-model="sidebar.item.description"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">prefix</td>
                <td>
                    <b-button @click="change('prefix')" variant="outline-primary">
                        {{ plus(sidebar.item.prefix) }}
                    </b-button>
                </td>
            </tr>
            <tr>
                <td class="text-right">suffix</td>
                <td>
                    <b-button @click="change('suffix')" variant="outline-primary">
                        {{ plus(sidebar.item.suffix) }}
                    </b-button>
                </td>
            </tr>
            <tr>
                <td class="text-right">script</td>
                <td>
                    <b-button-group>
                        <b-button @click="changeScript" variant="outline-primary">
                            {{ sidebar.item.script }}
                        </b-button>
                        <b-button @click="showScript" variant="outline-primary"> View </b-button>
                    </b-button-group>
                </td>
            </tr>
            <tr>
                <td class="text-right">template</td>
                <td>
                    <b-button-group>
                        <b-button @click="changeTemplate" variant="outline-primary">
                            {{ sidebar.item.template }}
                        </b-button>
                        <b-button @click="showTemplate" variant="outline-primary"> View </b-button>
                    </b-button-group>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'
import dialogue from '../states/listdialogue.js'

export default {
    name: 'Layer',
    data() {
        return {
            builder,
            sidebar,
            code: '',
            title: '',
            visible: false,
        }
    },
    created() {
        sidebar.show('Layer', builder.project.LayerManager)
    },
    methods: {
        change(key) {
            const name = prompt('Please input the name', sidebar.item[key])
            if (name !== null) {
                try {
                    sidebar.item[key] = name
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
        plus(name) {
            if (name) {
                return name
            }
            return '+'
        },
        changeScript() {
            dialogue.show(builder.project.ScriptManager.list, 'name', 'Select a Script', ok => {
                try {
                    sidebar.item.script = dialogue.selected.name
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
        changeTemplate() {
            dialogue.show(builder.project.TemplateManager.list, 'name', 'Select a Template', ok => {
                try {
                    sidebar.item.template = dialogue.selected.name
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
        showScript() {
            const script = builder.project.ScriptManager.find(sidebar.item.script)
            this.title = script.name
            this.code = script.text
            this.visible = true
        },
        showTemplate() {
            const template = builder.project.TemplateManager.find(sidebar.item.template)
            this.title = template.name
            this.code = template.text
            this.visible = true
        },
    },
}
</script>

<template>
    <table class="table">
        <caption>
            <h1 class="inline mr11px">Layer</h1>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="change" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>
        </caption>
        <tbody>
            <tr>
                <td class="text-right">path</td>
                <td>
                    <b-form-input v-model="sidebar.item.path"></b-form-input>
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
                    <b-button @click="changeScript" variant="outline-primary">
                        {{ sidebar.item.script }}
                    </b-button>
                </td>
            </tr>
            <tr>
                <td class="text-right">template</td>
                <td>
                    <b-button @click="changeTemplate" variant="outline-primary">
                        {{ sidebar.item.template }}
                    </b-button>
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
    },
}
</script>

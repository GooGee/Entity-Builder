<template>
    <table class="table">
        <thead>
            <tr>
                <th style="width: 222px;"></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <b-button-group>
                        <b-button @click="change('name')" variant="outline-primary">
                            {{ sidebar.item.name }}
                        </b-button>
                        <b-button @click="remove" variant="outline-danger"> X </b-button>
                    </b-button-group>
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
            <tr>
                <td class="text-right">path</td>
                <td>
                    <b-button @click="change('path')" variant="outline-primary">
                        {{ plus(sidebar.item.path) }}
                    </b-button>
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
        </tbody>
    </table>
</template>

<script>
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Layer',
    data() {
        return {
            builder,
            sidebar,
        }
    },
    created() {
        sidebar.show('Layer', this.manager)
    },
    computed: {
        manager() {
            return builder.project.LayerManager
        },
    },
    methods: {
        change(key) {
            const name = prompt('Please input the name', sidebar.item[key])
            if (name) {
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
        changeScript() {},
        changeTemplate() {},
    },
}
</script>

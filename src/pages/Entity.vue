<template>
    <div>
        <h1>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="setName" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>
        </h1>

        <PropertyList :manager="sidebar.item.PropertyManager">
            <tr>
                <td></td>
                <td>name</td>
                <td>
                    <b-button @click="setName" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>table</td>
                <td>
                    <b-button @click="setTableName" variant="outline-primary"> {{ sidebar.item.tableName }} </b-button>
                </td>
            </tr>
        </PropertyList>

        <table class="table">
            <caption>
                <h3 class="inline mr11px">File</h3>
                <b-button @click="zip" variant="outline-success"> Zip </b-button>
            </caption>
            <thead>
                <tr>
                    <th></th>
                    <th>Layer</th>
                    <th>File Name</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="file in sidebar.item.FileManager.list" :key="file.name">
                    <td>
                        <b-button-group>
                            <b-button @click="preview(file)" variant="outline-primary"> Preview </b-button>
                            <b-button @click="download(file)" variant="outline-success"> Download </b-button>
                            <b-button @click="deploy(file)" v-if="request" variant="outline-success"> Deploy </b-button>
                        </b-button-group>
                    </td>
                    <td>{{ file.layer.name }}</td>
                    <td>{{ file.fileName }}</td>
                </tr>
            </tbody>
        </table>

        <b-modal v-model="visible" :title="title" size="xl" hide-footer>
            <pre>{{ code }}</pre>
        </b-modal>
    </div>
</template>

<script>
import PropertyList from '../components/PropertyList.vue'
import render from '../helpers/render.js'
import { deployFile, request } from '../helpers/request.js'
import * as zip from '../helpers/zip.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Entity',
    components: { PropertyList },
    data() {
        return {
            builder,
            sidebar,
            request,
            title: '',
            code: '',
            visible: false,
        }
    },
    created() {
        sidebar.show('Entity', builder.project.EntityManager)
    },
    methods: {
        setName() {
            const name = prompt('Please input the Main name', sidebar.item.name)
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
        setTableName() {
            const name = prompt('Please input the Table name', sidebar.item.tableName)
            if (name) {
                try {
                    sidebar.item.tableName = name
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
        preview(file) {
            try {
                this.title = file.fileName
                this.code = render(builder.project, sidebar.item, file)
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
        download(file) {
            try {
                const text = render(builder.project, sidebar.item, file)
                zip.download(file.fileName, text)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        deploy(file) {
            try {
                deployFile(file, sidebar.item, builder.project)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        zip() {
            try {
                zip.zipEntity(sidebar.item, builder.project)
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
                sidebar.remove(sidebar.item)
            }
        },
    },
}
</script>

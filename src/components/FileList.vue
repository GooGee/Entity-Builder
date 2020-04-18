<template>
    <ItemList :manager="manager">
        <template slot="caption">
            <h3 class="inline mr11px">File</h3>
            <b-button-group>
                <b-button @click="zip" variant="outline-success"> Zip </b-button>
                <b-button v-if="request" @click="deployEntity" variant="outline-success"> Deploy </b-button>
            </b-button-group>
        </template>

        <template slot="header">
            <tr>
                <th></th>
                <th>Layer Name</th>
                <th>Class Name</th>
                <th>File Name</th>
            </tr>
        </template>

        <template slot="body">
            <tr v-for="file in manager.list" :key="file.name">
                <td>
                    <b-button-group>
                        <b-button @click="preview(file)" variant="outline-primary"> Preview </b-button>
                        <b-button @click="download(file)" variant="outline-success"> Download </b-button>
                        <b-button v-if="request" @click="deploy(file)" variant="outline-success"> Deploy </b-button>
                    </b-button-group>
                </td>
                <td>{{ file.layerName }}</td>
                <td>{{ file.className }}</td>
                <td>{{ file.fileName }}</td>
            </tr>
        </template>

        <template slot="footer">
            <b-modal v-model="visible" :title="title" size="xl" hide-footer>
                <pre>{{ code }}</pre>
            </b-modal>
        </template>
    </ItemList>
</template>

<script>
import ItemList from './ItemList.vue'
import render from '../helpers/render.js'
import { deployFile, deployEntity, request } from '../helpers/request.js'
import * as zip from '../helpers/zip.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'FileList',
    components: { ItemList },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
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
    methods: {
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
                deployFile(builder.project, sidebar.item, file)
                this.$bvToast.toast(`${file.fileName} deployed`, {
                    title: 'OK',
                    variant: 'success',
                    solid: true,
                })
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        deployEntity() {
            try {
                deployEntity(builder.project, sidebar.item)
                this.$bvToast.toast(`${sidebar.item.name} deployed`, {
                    title: 'OK',
                    variant: 'success',
                    solid: true,
                })
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
    },
}
</script>

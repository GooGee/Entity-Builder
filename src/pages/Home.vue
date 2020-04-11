<template>
    <div>
        <div>
            <b-button-group>
                <b-button @click="create" variant="outline-primary"> New </b-button>
                <b-button @click="load" variant="outline-primary"> Load </b-button>
                <b-button @click="connect" variant="outline-primary"> Connect </b-button>
                <b-button @click="download" :disabled="!builder.project" variant="outline-success"> Download </b-button>
                <b-button @click="save" :disabled="!builder.project" variant="outline-success"> Save </b-button>
            </b-button-group>
        </div>
        <ul>
            <li v-for="item in builder.projectList" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import builder from '../states/builder.js'
import * as project from '../helpers/project.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Home',
    data() {
        return {
            builder,
            project,
            sidebar,
        }
    },
    created() {
        sidebar.show('', null)
    },
    methods: {
        connect() {},
        create() {
            sidebar.show('', null)
            try {
                const name = prompt('Please input the project name', 'Entity')
                if (name) {
                    builder.project = project.makeProject(name)
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
        open() {},
        load() {},
        download() {
            try {
                const name = builder.project.fileName
                const result = JSON.stringify(builder.project)
                const blob = new Blob([result], { type: 'text/plain;charset=utf-8' })
                FileSaver.saveAs(blob, name)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        save() {},
    },
}
</script>

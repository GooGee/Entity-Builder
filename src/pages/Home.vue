<template>
    <div>
        <div>
            <b-button-group>
                <b-button @click="create" variant="outline-primary"> New </b-button>
                <b-button @click="upload" variant="outline-primary"> Upload </b-button>
                <b-button @click="connect" variant="outline-primary"> Connect </b-button>
            </b-button-group>
        </div>
        <ul>
            <li v-for="item in builder.projectList" :key="item">{{ item }}</li>
        </ul>
    </div>
</template>

<script>
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
            try {
                const name = prompt('Please input the project name', 'Entity')
                if (name) {
                    builder.project = project.makeProject(name, builder.preset)
                    this.$router.push('/project')
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
        upload() {},
    },
}
</script>

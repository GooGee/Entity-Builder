<template>
    <div>
        <div>
            <b-button-group>
                <b-button @click="create" variant="outline-primary"> New </b-button>
                <b-button @click="load" variant="outline-primary"> Load </b-button>
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
import * as project from '../states/project.js'
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
    methods: {
        connect() {},
        create() {
            sidebar.show('', null)
            builder.project = project.makeProject('Entity')
        },
        open() {},
        load() {},
    },
}
</script>

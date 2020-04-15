<template>
    <div>
        <div>
            <b-button-group>
                <b-button @click="create" variant="outline-primary"> New </b-button>
                <b-button variant="outline-primary">
                    <label class="button-label">
                        Upload
                        <input @change="upload($event)" type="file" accept=".json" style="display: none;" />
                    </label>
                </b-button>
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
        upload(event) {
            const reader = new FileReader()
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result)
                    builder.project = project.loadProject(data)
                    this.$router.push('/project')
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
            reader.onerror = error => {
                alert(error)
            }
            reader.readAsText(event.target.files[0])
        },
    },
}
</script>

<template>
    <div class="col-sm-6">
        <div class="text-center" style="margin-top: 22%;">
            <div>
                <img src="logo.svg" alt="logo" style="width: 222px;">
            </div>
            <div style="margin-top: 33px;">
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
        </div>
    </div>
</template>

<script>
import { connect, convert, getDB } from '../helpers/request.js'
import builder from '../states/builder.js'
import { makeProject, loadProject } from '../helpers/project.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Home',
    data() {
        return {
            builder,
            sidebar,
            domain: 'http://localhost',
        }
    },
    created() {
        sidebar.show('', null)
    },
    methods: {
        connect() {
            this.domain = prompt('Please enter the domain', this.domain)
            if (this.domain) {
                connect(this.domain)
                    .then(response => {
                        if (builder.project) {
                            return
                        }
                        if (response.data) {
                            const data = JSON.parse(response.data)
                            builder.project = loadProject(data)
                            this.$router.push('/project')
                            return
                        }

                        if (confirm('Do you want to load tables from your database schema?')) {
                            this.convert()
                        }
                    })
                    .catch(error => {
                        console.error(error)
                        this.$bvToast.toast(error.message, {
                            title: 'i',
                            variant: 'danger',
                            solid: true,
                        })
                    })
            }
        },
        convert() {
            getDB()
                .then(response => {
                    if (response.data.tables.length) {
                        builder.project = makeProject('entity', builder.preset)
                        builder.project.convertDB(response.data)
                        this.$router.push('/project')
                        return
                    }

                    this.$bvToast.toast('No table found', {
                        title: 'OK',
                        variant: 'success',
                        solid: true,
                    })
                })
                .catch(error => {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
        create() {
            try {
                const name = prompt('Please input the project name', 'Entity')
                if (name) {
                    builder.project = makeProject(name, builder.preset)
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
        upload(event) {
            const reader = new FileReader()
            reader.onload = event => {
                try {
                    const data = JSON.parse(event.target.result)
                    builder.project = loadProject(data)
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

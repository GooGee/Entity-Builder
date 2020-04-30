<template>
    <div class="col-sm-6">
        <div class="text-center" style="margin-top: 22%;">
            <div>
                <img src="logo.svg" alt="logo" style="width: 222px;" />
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
import { convertDB, makeProject, loadPreset, loadProject } from '../helpers/project.js'
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
            const domain = prompt('Please enter the domain', this.domain)
            if (domain) {
                this.domain = domain
                connect(this.domain)
                    .then(response => {
                        if (builder.project) {
                            return
                        }
                        if (response.data) {
                            const data = JSON.parse(response.data)
                            this.load(data)
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
                        builder.project = convertDB(response.data, builder.preset)
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
                    builder.project = makeProject(name)
                    loadPreset(builder.project, builder.preset)
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
                    this.load(data)
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
        load(data) {
            if (data.version < 10) {
                if (!confirm('This is an old version project,\nold templates may not work properly.\nContinue?')) {
                    return
                }
            }
            builder.project = loadProject(data, builder.preset)
            this.$router.push('/project')
        },
    },
}
</script>

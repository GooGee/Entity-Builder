<template>
    <div>
        <div>
            <h1 class="inline mr11px">Project</h1>
            <b-button-group>
                <b-button @click="download" variant="outline-success"> Download </b-button>
                <b-button v-if="request" @click="save" variant="outline-success"> Save </b-button>
                <b-button @click="zip" variant="outline-success"> Zip </b-button>
            </b-button-group>
        </div>

        <PropertyList :manager="builder.project.PropertyManager">
            <tr>
                <td>project.name</td>
                <td>
                    <b-button @click="setName" variant="outline-primary"> {{ builder.project.name }} </b-button>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>project.NameSpace</td>
                <td>
                    <b-form-input v-model="builder.project.NameSpace"></b-form-input>
                </td>
                <td></td>
            </tr>
        </PropertyList>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import PropertyList from '../components/PropertyList.vue'
import { request, save } from '../helpers/request.js'
import * as zip from '../helpers/zip.js'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Project',
    components: { PropertyList },
    data() {
        return {
            builder,
            request,
        }
    },
    created() {
        sidebar.show('', null)
    },
    methods: {
        setName() {
            const name = prompt('Please input the name', builder.project.name)
            if (name) {
                try {
                    builder.project.name = name
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
        save() {
            save(builder.project)
                .then(response => {
                    this.$bvToast.toast('Project saved', {
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
        zip() {
            try {
                zip.zipAll(builder.project)
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

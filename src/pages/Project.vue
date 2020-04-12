<template>
    <div>
        <div>
            <h1 class="inline mr11px">Project</h1>
            <b-button-group>
                <b-button @click="download" variant="outline-success"> Download </b-button>
                <b-button @click="save" variant="outline-success"> Save </b-button>
                <b-button @click="deploy" v-if="request" variant="outline-success"> Deploy </b-button>
            </b-button-group>
        </div>

        <PropertyList :manager="builder.project.PropertyManager">
            <tr>
                <td></td>
                <td>name</td>
                <td>
                    <b-button @click="setName" variant="outline-primary"> {{ builder.project.name }} </b-button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>NameSpace</td>
                <td>
                    <b-form-input v-model="builder.project.NameSpace"></b-form-input>
                </td>
            </tr>
        </PropertyList>
    </div>
</template>

<script>
import FileSaver from 'file-saver'
import PropertyList from '../components/PropertyList.vue'
import { deployAll, request } from '../helpers/request.js'
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
        save() {},
        deploy() {
            try {
                deployAll(builder.project)
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

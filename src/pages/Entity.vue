<template>
    <div>
        <h1>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>
                <b-button @click="setName" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
            </b-button-group>
        </h1>

        <FileList :manager="sidebar.item.FileManager"></FileList>

        <PropertyList :manager="sidebar.item.PropertyManager">
            <tr>
                <td>entity.name</td>
                <td>
                    <b-button @click="setName" variant="outline-primary"> {{ sidebar.item.name }} </b-button>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>entity.tableName</td>
                <td>
                    <b-button @click="setTableName" variant="outline-primary"> {{ sidebar.item.tableName }} </b-button>
                </td>
                <td></td>
            </tr>
            <tr>
                <td>entity.description</td>
                <td>
                    <b-form-input v-model="sidebar.item.description"></b-form-input>
                </td>
                <td></td>
            </tr>
        </PropertyList>
    </div>
</template>

<script>
import FileList from '../components/FileList.vue'
import PropertyList from '../components/PropertyList.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Entity',
    components: {
        FileList,
        PropertyList,
    },
    data() {
        return {
            builder,
            sidebar,
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
        remove() {
            if (confirm('Are you sure?')) {
                sidebar.remove(sidebar.item)
            }
        },
    },
}
</script>

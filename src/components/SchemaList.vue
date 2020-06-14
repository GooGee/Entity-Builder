<template>
    <table class="table">
        <caption>
            <h3>DataBase Schema</h3>
        </caption>
        <tbody>
            <tr>
                <td>prefix {{ data.prefix }}</td>
            </tr>
            <tr v-for="table in data.tables" :key="table.name">
                <td>
                    <b-form-checkbox v-model="table.included"> {{ table.name }} </b-form-checkbox>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <b-form-checkbox v-model="all" class="inline mr11px"> All </b-form-checkbox>
                    <b-button-group>
                        <b-button @click="read" variant="outline-primary"> Read DataBase Schema </b-button>
                        <b-button @click="make" variant="outline-primary"> Import selected table </b-button>
                    </b-button-group>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import { convert, getDB } from '../helpers/request.js'
import { convertDB } from '../helpers/project.js'
import builder from '../states/builder.js'

export default {
    name: 'SchemaList',
    data() {
        return {
            loaded: false,
            all: true,
            data: {
                prefix: '',
                tables: [],
            },
        }
    },
    watch: {
        all(value) {
            this.change(this.data.tables)
        },
    },
    methods: {
        read() {
            getDB()
                .then(response => {
                    if (response.data.tables.length) {
                        this.change(response.data.tables)
                        this.data = response.data
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
        make() {
            if (this.data.tables.length) {
                try {
                    if (this.data.tables.length === 0) {
                        return
                    }
                    convertDB(this.data, builder.project, builder.preset)
                    this.$bvToast.toast('Table imported', {
                        title: 'i',
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
            }
        },
        change(list) {
            list.forEach(table => {
                table.included = this.all
            })
        },
    },
}
</script>

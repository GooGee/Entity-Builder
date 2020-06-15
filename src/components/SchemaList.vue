<template>
    <table class="table">
        <caption>
            <h3 class="inline mr11px">DataBase Schema</h3>
            <b-button @click="read" variant="outline-primary"> Read </b-button>
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
                    <b-button @click="make" variant="outline-primary" class="mr11px"> Import selected table </b-button>
                    <span>
                        <b-form-radio v-model="skip" :value="true" class="inline mr11px">Skip if exist</b-form-radio>
                        <b-form-radio v-model="skip" :value="false" class="inline">Replace if exist</b-form-radio>
                    </span>
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
            skip: false,
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
                    convertDB(this.data, builder.project, builder.preset, this.skip)
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

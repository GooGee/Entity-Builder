<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">DataBase Schema</h3>
            <b-button @click="read" variant="outline-success"> Read </b-button>
        </caption>
        <tbody>
            <tr v-for="table in data.tables" :key="table.name">
                <td>
                    <b-form-checkbox v-model="table.included"> {{ table.name }} </b-form-checkbox>
                </td>
            </tr>
        </tbody>
        <tfoot>
            <tr>
                <td>
                    <b-form-checkbox v-model="all" @change="select" switch> All </b-form-checkbox>
                </td>
            </tr>
            <tr>
                <td>
                    prefix <span class="red">{{ data.prefix }}</span>
                </td>
            </tr>
            <tr>
                <td>
                    <span class="mr11">if name exists</span>
                    <b-form-radio v-model="skip" :value="true" class="inline mr11">Skip</b-form-radio>
                    <b-form-radio v-model="skip" :value="false" class="inline">Replace</b-form-radio>
                </td>
            </tr>
            <tr>
                <td>
                    <b-button @click="convert" variant="outline-primary"> Import selected table </b-button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'TableList',
    data() {
        return {
            all: true,
            skip: false,
            data: {
                prefix: '',
                tables: [],
            },
        }
    },
    methods: {
        read() {
            try {
                const data = sss.bridge.readDB()
                if (data) {
                    this.data = data
                    return
                }
                this.$bvToast.toast('No table found', {
                    title: 'i',
                    variant: 'success',
                    solid: true,
                })
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        convert() {
            if (this.data.tables.length === 0) {
                return
            }

            try {
                sss.convert(this.data, this.skip)
                this.$bvToast.toast('Table imported', {
                    title: 'i',
                    variant: 'success',
                    solid: true,
                })
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        select(value) {
            this.data.tables.forEach(table => {
                table.included = value
            })
        },
    },
}
</script>

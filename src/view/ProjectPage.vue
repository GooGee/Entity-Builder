<template>
    <div class="row">
        <div class="col-9 offset-3">
            <div style="height: 71px;">
                <h1 class="inline mr11">Project</h1>
                <b-button @click="save" variant="outline-success"> Save </b-button>
            </div>

            <b-nav tabs>
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Script'" :active="tab === 'Script'"> Script </b-nav-item>
                <b-nav-item @click="tab = 'Schema'" :active="tab === 'Schema'"> DataBase </b-nav-item>
            </b-nav>

            <ProjectProperty v-if="tab === 'Property'" :item="sss.project"></ProjectProperty>

            <Script v-if="tab === 'Script'" :item="sss.project"></Script>

            <TableList v-if="tab === 'Schema'"></TableList>
        </div>
    </div>
</template>

<script>
import ProjectProperty from './schema/ProjectProperty.vue'
import Script from './schema/Script.vue'
import TableList from './schema/TableList.vue'
import sss from '../state.js'

export default {
    name: 'ProjectPage',
    components: {
        ProjectProperty,
        Script,
        TableList,
    },
    data() {
        return {
            sss,
            tab: 'Property',
        }
    },
    methods: {
        save() {
            try {
                sss.bridge.save(sss.project)
                this.$bvToast.toast('OK', {
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
    },
}
</script>

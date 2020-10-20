<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Layer"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <table class="table table-borderless">
                <tbody>
                    <tr style="height: 71px;">
                        <td style="width: 333px;">
                            <h2 v-if="sss.sidebar.item.original">{{ sss.sidebar.item.name }}</h2>
                            <b-button-group v-else>
                                <DeleteButton
                                    :manager="sss.sidebar.manager"
                                    :item="sss.sidebar.item"
                                    @deleted="sss.sidebar.item = null"
                                ></DeleteButton>
                                <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                            </b-button-group>
                        </td>
                        <td>
                            <b-form-input
                                v-model="sss.sidebar.item.description"
                                placeholder="description"
                                class="inline"
                            ></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <b-nav tabs>
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Script'" :active="tab === 'Script'"> Script </b-nav-item>
                <b-nav-item @click="tab = 'Template'" :active="tab === 'Template'"> Template </b-nav-item>
                <b-nav-item @click="tab = 'Data'" :active="tab === 'Data'"> Data </b-nav-item>
            </b-nav>

            <DataList v-if="tab === 'Data'" :manager="sss.sidebar.item.dataManager"></DataList>

            <LayerProperty v-if="tab === 'Property'" :item="sss.sidebar.item"></LayerProperty>

            <Script v-if="tab === 'Script'" :item="sss.sidebar.item"></Script>

            <Template v-if="tab === 'Template'" :item="sss.sidebar.item"></Template>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DataList from './schema/DataList.vue'
import DeleteButton from './button/DeleteButton.vue'
import LayerProperty from './schema/LayerProperty.vue'
import Script from './schema/Script.vue'
import SideBar from './part/SideBar.vue'
import Template from './schema/Template.vue'
import sss from '../state.js'

export default {
    name: 'LayerPage',
    components: {
        ChangeButton,
        DataList,
        DeleteButton,
        LayerProperty,
        Script,
        SideBar,
        Template,
    },
    data() {
        return {
            sss,
            tab: 'Property',
        }
    },
    created() {
        sss.showLayer()
    },
}
</script>

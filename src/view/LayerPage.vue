<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Layer"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <b-nav tabs class="mt11">
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Script'" :active="tab === 'Script'"> Script </b-nav-item>
                <b-nav-item @click="tab = 'Template'" :active="tab === 'Template'"> Template </b-nav-item>
                <b-nav-item @click="tab = 'Data'" :active="tab === 'Data'"> Data </b-nav-item>
            </b-nav>

            <DataList v-if="tab === 'Data'" :manager="sss.sidebar.item.dataManager"></DataList>

            <LayerProperty v-if="tab === 'Property'" :item="sss.sidebar.item">
                <tr>
                    <td class="text-right">name</td>
                    <td>
                        <span v-if="sss.sidebar.item.original">{{ sss.sidebar.item.name }}</span>
                        <b-button-group v-else>
                            <DeleteButton
                                :manager="sss.sidebar.manager"
                                :item="sss.sidebar.item"
                                @deleted="sss.sidebar.item = null"
                            ></DeleteButton>
                            <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                        </b-button-group>
                    </td>
                </tr>
            </LayerProperty>

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

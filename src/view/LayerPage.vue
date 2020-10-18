<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Layer"></SideBar>
        </div>

        <div v-if="sss.sidebar.item" class="col-9">
            <p>
                <b-button-group>
                    <DeleteButton
                        :manager="sss.sidebar.manager"
                        :item="sss.sidebar.item"
                        @deleted="sss.sidebar.item = null"
                    ></DeleteButton>
                    <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                </b-button-group>
            </p>

            <b-nav tabs>
                <b-nav-item @click="tab = 'Property'" :active="tab === 'Property'"> Property </b-nav-item>
                <b-nav-item @click="tab = 'Script'" :active="tab === 'Script'"> Script </b-nav-item>
                <b-nav-item @click="tab = 'Template'" :active="tab === 'Template'"> Template </b-nav-item>
            </b-nav>

            <LayerProperty v-if="tab === 'Property'" :item="sss.sidebar.item"></LayerProperty>
            <Script v-if="tab === 'Script'" :item="sss.sidebar.item"></Script>
            <Template v-if="tab === 'Template'" :item="sss.sidebar.item"></Template>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import LayerProperty from './schema/LayerProperty.vue'
import Script from './schema/Script.vue'
import Template from './schema/Template.vue'
import sss from '../state.js'

export default {
    name: 'LayerPage',
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
        LayerProperty,
        Script,
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

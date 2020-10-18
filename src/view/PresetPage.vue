<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Preset"></SideBar>
        </div>

        <div class="col-9">
            <PropertyList v-if="sss.sidebar.item" :manager="sss.sidebar.item.propertyManager">
                <h2 v-if="sss.sidebar.item.original">{{ sss.sidebar.item.name }}</h2>
                <b-button-group v-else class="mb11">
                    <DeleteButton
                        :manager="sss.sidebar.manager"
                        :item="sss.sidebar.item"
                        @deleted="sss.sidebar.item = null"
                    ></DeleteButton>
                    <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                </b-button-group>
                <b-form-input v-model="sss.sidebar.item.description" placeholder="description"></b-form-input>
            </PropertyList>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import PropertyList from './schema/PropertyList.vue'
import sss from '../state.js'

export default {
    name: 'PresetPage',
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
        PropertyList,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.showPreset()
    },
}
</script>

<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Preset"></SideBar>
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
                            ></b-form-input>
                        </td>
                    </tr>
                </tbody>
            </table>

            <PropertyList :manager="sss.sidebar.item.propertyManager"></PropertyList>
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

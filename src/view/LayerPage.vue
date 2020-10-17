<template>
    <div class="row">
        <div class="col-3">
            <SideBar :sidebar="sss.sidebar" title="Layer"></SideBar>
        </div>

        <div class="col-9">
            <table v-if="sss.sidebar.item" class="table b-table b-table-caption-top">
                <caption>
                    <h2 v-if="sss.sidebar.item.original">{{ sss.sidebar.item.name }}</h2>
                    <b-button-group v-else>
                        <DeleteButton :manager="sss.sidebar.manager" :item="sss.sidebar.item"></DeleteButton>
                        <ChangeButton :item="sss.sidebar.item" name="name"></ChangeButton>
                    </b-button-group>
                </caption>
                <thead>
                    <tr>
                        <th class="text-right" style="width: 111px;">name</th>
                        <th>value</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td class="text-right">single</td>
                        <td>
                            <b-form-checkbox v-model="sss.sidebar.item.single" switch></b-form-checkbox>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">description</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.description"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">class name</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.classPattern"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">file name</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.filePattern"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">namespace</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.nsPattern"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">path</td>
                        <td>
                            <b-form-input v-model="sss.sidebar.item.path"></b-form-input>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">template</td>
                        <td>
                            <b-form-textarea
                                v-model="sss.sidebar.item.template"
                                rows="11"
                                spellcheck="false"
                            ></b-form-textarea>
                        </td>
                    </tr>
                    <tr>
                        <td class="text-right">script</td>
                        <td>
                            <b-form-textarea
                                v-model="sss.sidebar.item.script"
                                rows="11"
                                spellcheck="false"
                            ></b-form-textarea>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import ChangeButton from './button/ChangeButton.vue'
import DeleteButton from './button/DeleteButton.vue'
import SideBar from './part/SideBar.vue'
import sss from '../state.js'

export default {
    name: 'LayerPage',
    components: {
        ChangeButton,
        DeleteButton,
        SideBar,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        sss.showLayer()
    },
}
</script>

<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3 class="inline mr11">Field</h3>
            <span>database table field</span>
        </caption>
        <thead>
            <tr>
                <th>Name</th>
                <th width="222px">Type</th>
                <th width="111px">Length</th>
                <th width="111px">Default</th>
                <th>Other</th>
            </tr>
        </thead>

        <draggable v-model="manager.list" group="field" handle=".drag-handle" tag="tbody">
            <tr v-for="field in manager.list" :key="field.name">
                <td>
                    <span class="drag-handle"> ✥ </span>
                    <b-button-group>
                        <DeleteButton :manager="manager" :item="field"></DeleteButton>
                        <ChangeButton :item="field" name="name"></ChangeButton>
                    </b-button-group>
                </td>
                <td>
                    <b-button @click="setType(field)" variant="outline-primary"> {{ field.type }} </b-button>
                </td>
                <td>
                    <b-form-input v-if="field.type === 'string' || field.type === 'char'" v-model="field.length" />
                </td>
                <td>
                    <b-form-input v-model="field.value"></b-form-input>
                </td>
                <td>
                    <FieldPanel :field="field" :hasParameter="false"></FieldPanel>
                </td>
            </tr>
        </draggable>

        <tfoot>
            <tr>
                <td>
                    <SelectButton :list="commonFieldManager.list" :callback="addCommon"></SelectButton>
                </td>
                <td>
                    <SelectButton :list="specialFieldManager.list" :callback="addSpecial"></SelectButton>
                </td>
                <td colspan="2">
                    <select v-model="selectedId" @change="add($event.target.value, 'integer')" class="form-control">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="entity in entityList" :value="entity.name" :key="entity.name">
                            {{ entity.tableName }}_id
                        </option>
                    </select>
                </td>
                <td>
                    <b-button @click="show" variant="outline-primary"> + </b-button>
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script>
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import draggable from 'vuedraggable'
import FieldPanel from './FieldPanel.vue'
import SelectButton from '../button/SelectButton.vue'
import sss from '@/state.js'

export default {
    name: 'FieldManager',
    components: {
        ChangeButton,
        DeleteButton,
        draggable,
        FieldPanel,
        SelectButton,
    },
    computed: {
        manager() {
            return sss.sidebar.item.fieldManager
        },
    },
    data() {
        return {
            entityList: sss.project.entityManager.list,
            fieldTypeList: sss.getPreset('FieldType').propertyManager.list,
            commonFieldManager: sss.getPreset('FieldName').propertyManager,
            specialFieldManager: sss.getPreset('FieldSpecial').propertyManager,
            selectedId: '',
        }
    },
    methods: {
        show() {
            sss.listDialogue.showList(this.fieldTypeList, 'Select a Type', () => {
                const selected = sss.listDialogue.selected
                this.add(selected.name, selected.name)
            })
        },
        setType(field) {
            sss.listDialogue.showList(this.fieldTypeList, 'Select a Type', () => {
                field.type = sss.listDialogue.selected.name
            })
        },
        add(name, type) {
            if (!name) {
                return
            }
            try {
                const field = this.manager.make(name, type)
                this.manager.add(field)
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
            this.selectedId = ''
        },
        addCommon(name) {
            if (!name) {
                return
            }
            const found = this.commonFieldManager.find(name)
            this.add(found.name, found.tag)
        },
        addSpecial(name) {
            if (!name) {
                return
            }
            const found = this.specialFieldManager.find(name)
            const fff = this.manager.make(found.name, found.tag)
            fff.value = found.value
            fff.load(found.data)
            this.manager.add(fff)
        },
    },
}
</script>

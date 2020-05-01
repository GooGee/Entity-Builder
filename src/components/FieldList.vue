<template>
    <ItemList :manager="manager">
        <template slot="caption">
            <h3>Field</h3>
        </template>

        <template slot="header">
            <tr>
                <th>Name</th>
                <th>Type</th>
                <th width="111px">Length</th>
                <th>Other</th>
            </tr>
        </template>

        <template slot="body">
            <tr v-for="field in manager.list" :key="field.name">
                <td>
                    <b-button-group>
                        <b-button @click="remove(field)" variant="outline-danger"> - </b-button>
                        <b-button @click="rename(field)" variant="outline-primary"> {{ field.name }} </b-button>
                    </b-button-group>
                </td>
                <td>
                    <b-button @click="setType(field)" variant="outline-primary"> {{ field.type }} </b-button>
                </td>
                <td>
                    <b-form-input v-if="hasLength(field.type)" v-model="field.length"></b-form-input>
                </td>
                <td>
                    <FieldPanel :field="field"></FieldPanel>
                </td>
            </tr>
        </template>

        <template slot="footer">
            <tr>
                <td>
                    <select @change="addItem($event.target.value)" class="form-control">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="field in CommonFieldList" :value="field.name" :key="field.name">
                            {{ field.name }}
                        </option>
                    </select>
                </td>
                <td>
                    <select @change="addField($event.target.value)" class="form-control">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="field in SpecialFieldList" :value="field.name" :key="field.name">
                            {{ field.name }}
                        </option>
                    </select>
                </td>
                <td>
                    <select @change="add($event.target.value, 'integer')" class="form-control">
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="entity in EntityList" :key="entity.name">{{ entity.tableName }}_id</option>
                    </select>
                </td>
                <td>
                    <select
                        v-model="selected"
                        @change="addType($event.target.value)"
                        class="form-control inline wa mr11px"
                    >
                        <option selected="true" disabled="disabled" value=""> ---- </option>
                        <option v-for="type in CommonTypeList" :key="type.name">{{ type.name }}</option>
                    </select>
                    <b-button @click="show" variant="outline-primary"> + </b-button>
                </td>
            </tr>
        </template>
    </ItemList>
</template>

<script>
import ItemList from './ItemList.vue'
import FieldPanel from './FieldPanel.vue'
import builder from '../states/builder.js'
import dialogue from '../states/listdialogue.js'

export default {
    name: 'FieldList',
    components: {
        ItemList,
        FieldPanel,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            EntityList: builder.project.EntityManager.list,
            FieldTypeWithLength: builder.project.PresetManager.find('FieldTypeWithLength').PropertyManager,
            FieldTypeList: builder.project.PresetManager.find('FieldType').PropertyManager.list,
            CommonTypeList: builder.project.PresetManager.find('FieldTypeCommon').PropertyManager.list,
            CommonFieldList: builder.project.PresetManager.find('FieldName').PropertyManager.list,
            SpecialFieldList: builder.project.PresetManager.find('FieldSpecial').PropertyManager.list,
            selected: '',
        }
    },
    methods: {
        show() {
            dialogue.show(this.FieldTypeList, 'name', 'Select a Type', ok => {
                this.addType(dialogue.selected.name)
            })
        },
        addType(type) {
            this.selected = ''
            this.add(type, type)
        },
        add(name, type) {
            try {
                const field = this.manager.make(name, type)
                this.manager.add(field)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        addField(name) {
            try {
                const found = this.SpecialFieldList.find(item => item.name === name)
                const fff = this.manager.make(found.name, found.tag)
                fff.load(found.data)
                this.manager.add(fff)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        addItem(name) {
            const found = this.CommonFieldList.find(item => item.name === name)
            this.add(found.name, found.tag)
        },
        remove(field) {
            if (confirm('Are you sure?')) {
                this.manager.remove(field)
            }
        },
        rename(field) {
            const name = prompt('Please input the name', field.name)
            if (name) {
                try {
                    field.name = name
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
        setType(field) {
            dialogue.show(this.FieldTypeList, 'name', 'Select a Type', ok => {
                field.type = dialogue.selected.name
            })
        },
        hasLength(type) {
            return this.FieldTypeWithLength.find(type)
        },
    },
}
</script>

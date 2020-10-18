<template>
    <div class="row">
        <div class="col-3">
            <div class="text-center mtb11">
                <h3 class="inline gray mr11">Data</h3>
                <AddButton :manager="manager"></AddButton>
            </div>

            <div
                v-for="one in manager.list"
                :key="one.name"
                @click="item = one"
                :class="Object.is(item, one) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ one.name }}
            </div>
        </div>

        <div class="col-9">
            <PropertyList v-if="item" :manager="item.propertyManager">
                <b-button-group class="mb11">
                    <DeleteButton :manager="manager" :item="item" @deleted="item = null"></DeleteButton>
                    <ChangeButton :item="item" name="name"></ChangeButton>
                </b-button-group>
                <b-form-input v-model="item.description" placeholder="description"></b-form-input>
            </PropertyList>
        </div>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import ChangeButton from '../button/ChangeButton.vue'
import DeleteButton from '../button/DeleteButton.vue'
import PropertyList from './PropertyList.vue'

export default {
    name: 'DataList',
    components: {
        AddButton,
        ChangeButton,
        DeleteButton,
        PropertyList,
    },
    data() {
        return {
            item: null,
        }
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
}
</script>

<template>
    <div>
        <div class="text-center mtb11">
            <h2 class="inline mr11">{{ title }}</h2>
            <AddButton :manager="sidebar.manager"></AddButton>
        </div>

        <div class="mb11">
            <b-form-input v-model="sidebar.keyword" placeholder="Search"></b-form-input>
        </div>

        <div v-if="sidebar.keyword">
            <div
                v-for="item in sidebar.list"
                :key="item.name"
                @click="sidebar.item = item"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.name }}
            </div>
        </div>

        <draggable v-else v-model="sidebar.manager.list" group="sidebar">
            <div
                v-for="item in sidebar.manager.list"
                :key="item.name"
                @click="sidebar.item = item"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                ✥ {{ item.name }}
            </div>
        </draggable>
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'
import draggable from 'vuedraggable'

export default {
    name: 'SideBar',
    components: {
        AddButton,
        draggable,
    },
    props: {
        sidebar: {
            type: Object,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
    },
}
</script>

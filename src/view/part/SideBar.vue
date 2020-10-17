<template>
    <div>
        <div class="text-center mtb11">
            <h2 class="inline mr11">{{ title }}</h2>
            <AddButton :manager="sidebar.manager"></AddButton>
        </div>

        <div class="mb11">
            <b-form-input v-model="sidebar.search" placeholder="Search"></b-form-input>
        </div>

        <div>
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
    </div>
</template>

<script>
import AddButton from '../button/AddButton.vue'

export default {
    name: 'SideBar',
    components: {
        AddButton,
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

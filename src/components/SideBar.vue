<template>
    <div>
        <h2 class="text-center">
            {{ sidebar.title }}
            <b-button v-if="sidebar.manager" @click="add" variant="outline-primary"> + </b-button>
        </h2>
        <div v-if="sidebar.manager" class="mb11px">
            <b-form-input v-model="sidebar.search" placeholder="Search"></b-form-input>
        </div>
        <draggable
            v-if="sidebar.manager"
            v-model="sidebar.list"
            group="SideBar"
            @start="drag = true"
            @end="drag = false"
            class="list-group"
        >
            <div
                v-for="item in sidebar.list"
                :key="item.name"
                @click="sidebar.item = item"
                :class="Object.is(sidebar.item, item) ? 'active' : ''"
                class="list-group-item list-group-item-action"
            >
                {{ item.name }}
            </div>
        </draggable>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import sidebar from '../states/sidebar.js'

export default {
    name: 'SideBar',
    components: { draggable },
    data() {
        return {
            sidebar,
            drag: false,
        }
    },
    methods: {
        add() {
            const name = prompt('Please input the name')
            if (name) {
                try {
                    sidebar.make(name)
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
    },
}
</script>

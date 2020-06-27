<template>
    <div>
        <template v-if="sidebar.manager">
            <h2 class="text-center">
                {{ sidebar.title }}
                <b-button @click="add" variant="outline-primary"> + </b-button>
            </h2>

            <div class="mb11px">
                <b-form-input v-model="sidebar.search" placeholder="Search"></b-form-input>
            </div>

            <div v-if="sidebar.search" class="list-group">
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
            <draggable
                v-else
                v-model="sidebar.manager.list"
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
        </template>
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

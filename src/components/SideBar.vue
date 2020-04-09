<template>
    <div>
        <h2 class="text-center">
            {{ sidebar.title }}
            <b-button v-if="sidebar.manager" @click="add" variant="outline-primary"> + </b-button>
        </h2>
        <b-list-group v-if="sidebar.manager">
            <b-list-group-item
                v-for="item in sidebar.manager.list"
                :key="item.name"
                @click="sidebar.item = item"
                :variant="Object.is(sidebar.item, item) ? 'primary' : ''"
                button
            >
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </div>
</template>

<script>
import sidebar from '../states/sidebar.js'

export default {
    name: 'SideBar',
    data() {
        return {
            sidebar,
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
                    alert(error)
                }
            }
        },
    },
}
</script>

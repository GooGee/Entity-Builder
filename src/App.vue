<template>
    <div id="app">
        <Bar></Bar>
        <div class="container-fluid">
            <div class="row">
                <SideBar class="col-3"></SideBar>
                <router-view class="col-9"></router-view>
            </div>
        </div>
        <ListDialogue></ListDialogue>
    </div>
</template>

<script>
import Bar from './components/Bar.vue'
import SideBar from './components/SideBar.vue'
import ListDialogue from './components/ListDialogue.vue'

export default {
    name: 'App',
    components: {
        Bar,
        SideBar,
        ListDialogue,
    },
}
</script>

<style>
.inline {
    display: inline-block;
}

.table caption {
    caption-side: top;
}

.mr4px {
    margin-right: 4px;
}
</style>

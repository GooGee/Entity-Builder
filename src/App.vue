<template>
    <div id="app">
        <Bar></Bar>
        <div class="container-fluid">
            <div class="row">
                <SideBar class="col-3"></SideBar>
                <router-view class="col-9"></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Bar from './components/Bar.vue'
import SideBar from './components/SideBar.vue'

export default {
    name: 'App',
    components: {
        Bar,
        SideBar,
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
</style>

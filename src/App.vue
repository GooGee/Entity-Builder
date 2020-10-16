<template>
    <div id="app">
        <div class="container-fluid">
            <router-view></router-view>
        </div>
        <Top></Top>
    </div>
</template>

<script>
import Top from './view/Top.vue'

export default {
    name: 'App',
    components: {
        Top,
    },
}
</script>

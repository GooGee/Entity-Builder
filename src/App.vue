<template>
    <div id="app" style="margin-bottom: 33px;">
        <Bar :ready="sss.ready"></Bar>
        <div class="container-fluid">
            <router-view></router-view>
        </div>
        <InputDialogue></InputDialogue>
        <ListDialogue></ListDialogue>
        <Top></Top>
    </div>
</template>

<script>
import Bar from './view/part/Bar.vue'
import InputDialogue from './view/part/InputDialogue.vue'
import ListDialogue from './view/part/ListDialogue.vue'
import Top from './view/part/Top.vue'
import sss from './state.js'

export default {
    name: 'App',
    components: {
        Bar,
        InputDialogue,
        ListDialogue,
        Top,
    },
    data() {
        return {
            sss,
        }
    },
    created() {
        window.addEventListener('beforeunload', e => {
            e.preventDefault()
            e.returnValue = ''
        })
        fetch('preset.json')
            .then(response => response.json())
            .then(json => {
                sss.preset = json
            })
            .catch(error => {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            })
    },
}
</script>

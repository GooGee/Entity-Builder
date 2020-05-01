<template>
    <Manager name="Script" :manager="builder.project.ScriptManager">
        <br />
        <textarea v-if="ready" v-model="sidebar.item.text" class="form-control" spellcheck="false" rows="22"></textarea>
    </Manager>
</template>

<script>
import Manager from '../components/Manager.vue'
import builder from '../states/builder.js'
import sidebar from '../states/sidebar.js'

export default {
    name: 'Script',
    components: { Manager },
    data() {
        return {
            builder,
            sidebar,
            ready: false,
        }
    },
    mounted() {
        this.ready = true
    },
}
</script>

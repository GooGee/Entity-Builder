<template>
    <b-modal v-model="dialogue.visible" :title="dialogue.title" :size="dialogue.size" hide-footer>
        <div class="mtb11">
            <b-form-input v-model="dialogue.keyword" placeholder="Search" autofocus></b-form-input>
        </div>

        <b-list-group>
            <b-list-group-item v-if="dialogue.showBlank" @click="select(null)" button> ---- </b-list-group-item>
            <b-list-group-item @click="select(item)" v-for="item in dialogue.list" :key="item.name" button>
                {{ item.name }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'ListDialogue',
    data() {
        return {
            dialogue: sss.listDialogue,
        }
    },
    methods: {
        select(item) {
            this.dialogue.hide()
            this.dialogue.select(item)
        },
    },
}
</script>

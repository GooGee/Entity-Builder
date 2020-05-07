<template>
    <b-modal v-model="dialogue.visible" :title="dialogue.title" :size="dialogue.size" hide-footer id="ListDialogue">
        <b-form-input v-model="dialogue.keyword" placeholder="Search" autofocus></b-form-input>
        <br />
        <b-list-group>
            <b-list-group-item v-if="dialogue.showBlank" @click="select(null)" button> ---- </b-list-group-item>
            <b-list-group-item @click="select(item)" v-for="item in dialogue.filtered" button>
                {{ dialogue.textKey ? item[dialogue.textKey] : item }}
            </b-list-group-item>
        </b-list-group>
    </b-modal>
</template>

<script>
import dialogue from '../states/listdialogue.js'

export default {
    name: 'ListDialogue',
    data() {
        return {
            dialogue,
        }
    },
    methods: {
        select(item) {
            dialogue.hide()
            dialogue.select(item)
            if (dialogue.callback) {
                dialogue.callback(true)
            }
        },
    },
}
</script>

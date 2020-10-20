<template>
    <b-modal
        v-model="dialogue.visible"
        :title="dialogue.title"
        :size="dialogue.size"
        @ok="close(true)"
        @cancel="close(false)"
    >
        <b-form-textarea v-model="dialogue.text" rows="16" spellcheck="false"></b-form-textarea>
    </b-modal>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'InputDialogue',
    data() {
        return {
            dialogue: sss.inputDialogue,
        }
    },
    methods: {
        close(ok) {
            if (this.dialogue.callback) {
                this.dialogue.callback(ok, this.dialogue.text)
            }
        },
    },
}
</script>

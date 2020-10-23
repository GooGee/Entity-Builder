<template>
    <b-button @click="render" variant="outline-primary"> ▶ </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'RenderButton',
    props: {
        layer: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: true,
        },
    },
    methods: {
        render() {
            try {
                const title = this.layer.getFilePath(sss.project, this.entity) ?? this.layer.name
                const text = sss.render(this.layer, this.entity)
                sss.inputDialogue.showText(title, text)
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

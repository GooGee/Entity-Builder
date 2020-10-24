<template>
    <b-button @click="render" variant="outline-success"> ▼ </b-button>
</template>

<script>
import sss from '@/state.js'

export default {
    name: 'WriteButton',
    props: {
        layer: {
            type: Object,
            required: true,
        },
        entity: {
            type: Object,
            required: false,
            default: null,
        },
    },
    methods: {
        render() {
            try {
                let entity = this.entity
                if (entity === null) {
                    const name = prompt('Please input the name')
                    if (!name) {
                        return
                    }
                    entity = sss.project.entityManager.make(name)
                }
                const file = this.layer.getFilePath(sss.project, entity)
                const text = sss.render(this.layer, entity)
                sss.bridge.make(file, text)
                this.$bvToast.toast('OK', {
                    title: 'i',
                    variant: 'success',
                    solid: true,
                })
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

<template>
    <b-button @click="render" variant="outline-primary"> ▼ </b-button>
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
                const file = this.layer.getFullPath(sss.project, entity)
                // const text = sss.render(this.layer, this.entity)
                console.log(file)
                // console.log(text)
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

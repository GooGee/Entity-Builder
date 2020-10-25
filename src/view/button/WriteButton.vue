<template>
    <b-button @click="render" variant="outline-success"> ▼ </b-button>
</template>

<script>
import { isConnected, deploy, download, getErrorMessage } from '@/request.js'
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
                const text = sss.render(this.layer, entity)
                if (isConnected()) {
                    const file = this.layer.getFilePath(sss.project, entity)
                    this.deploy(file, text)
                } else {
                    const file = this.layer.getFileName(entity)
                    download(file, text)
                }
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        deploy(file, text) {
            const data = {
                [file]: text,
            }
            deploy(data)
                .then(response => {
                    this.$bvToast.toast('File deployed', {
                        title: 'i',
                        variant: 'success',
                        solid: true,
                    })
                })
                .catch(error => {
                    const message = getErrorMessage(error)
                    this.$bvToast.toast(message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                })
        },
    },
}
</script>

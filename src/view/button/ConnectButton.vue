<template>
    <b-button @click="connect" variant="outline-success"> Connect </b-button>
</template>

<script>
import { connect, getErrorMessage } from '@/request.js'
import sss from '@/state.js'

export default {
    name: 'ConnectButton',
    data() {
        return {
            server: window.location.origin,
        }
    },
    methods: {
        connect() {
            const server = prompt('Please enter the server URL', this.server)
            if (server) {
                this.server = server
                connect(this.server)
                    .then(response => {
                        if (response.data) {
                            const data = JSON.parse(response.data)
                            this.$emit('connect', data)
                            return
                        }
                        this.$bvToast.toast('No saved data', {
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
            }
        },
    },
}
</script>

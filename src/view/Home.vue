<template>
    <div>
        <div class="text-center" style="margin-top: 11%;">
            <img v-if="loading" alt="loading" src="@/assets/loading.svg" />
            <img v-else alt="logo" src="@/assets/logo.svg" style="width: 222px;" />
            <h1 class="m11">Code Generator</h1>
            <b-button v-if="!loading" @click="load" variant="outline-success"> Reload </b-button>
        </div>
    </div>
</template>

<script>
import sss from '../state.js'

export default {
    name: 'Home',
    computed: {
        loading() {
            return sss.project === null
        },
    },
    methods: {
        load() {
            try {
                sss.bridge.load()
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

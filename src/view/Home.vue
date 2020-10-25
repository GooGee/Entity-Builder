<template>
    <div>
        <div class="text-center" style="margin-top: 11%;">
            <img v-if="loading" alt="loading" src="@/assets/loading.svg" />
            <img v-else alt="logo" src="@/assets/logo.svg" style="width: 222px;" />
            <h1 class="m11">Code Generator</h1>
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
}
</script>

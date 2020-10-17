<template>
    <div style="position: fixed; right: 11%; bottom: 3%;">
        <button class="btn btn-outline-primary rounded-pill" @click="window.scrollTo(0, 0)">
            Top
        </button>
    </div>
</template>

<script>
export default {
    name: 'Top',
    data() {
        return {
            window: window,
        }
    },
}
</script>

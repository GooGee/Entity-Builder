<template>
    <div>
        <h3 class="mtb11 gray">Script</h3>
        <b-form-textarea v-model="item.script" rows="22" spellcheck="false"></b-form-textarea>
    </div>
</template>

<script>
export default {
    name: 'Script',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

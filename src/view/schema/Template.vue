<template>
    <div>
        <h3 class="mtb11 gray">Template</h3>
        <b-form-textarea v-model="item.template" rows="22" spellcheck="false"></b-form-textarea>
    </div>
</template>

<script>
export default {
    name: 'Template',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

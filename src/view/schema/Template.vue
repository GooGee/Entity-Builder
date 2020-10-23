<template>
    <div>
        <div class="mtb11">
            <h3 class="inline gray mr11">Template</h3>
            <a href="https://mozilla.github.io/nunjucks/templating.html" target="_blank">Document</a>
        </div>
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

<template>
    <div>
        <div class="mtb11 gray">
            <h3 class="inline mr11">Script</h3>
            <span>JavaScript</span>
        </div>
        <ul class="gray">
            <li>function must be on the first line</li>
            <li>
                <a
                    href="https://googee.github.io/Entity-Builder/docs/model/interfaces/jsparameter.html"
                    target="_blank"
                >
                    parameter doc
                </a>
            </li>
            <li>do not change anything in data.project, data.layer, data.entity</li>
            <li>function will be called before render template</li>
            <li>properties of "data" will be available in template</li>
        </ul>
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

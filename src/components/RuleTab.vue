<template>
    <div>
        <ul @click="editing = true" class="rule">
            <li v-for="rule in manager.list" :key="rule.name">
                <Rule :rule="rule" :editing="editing" @remove="remove(rule)"></Rule>
            </li>
        </ul>

        <div v-if="editing">
            <b-button @click="editing = false" variant="outline-primary"> OK </b-button>
            <br />
            <b-tabs>
                <b-tab
                    v-for="kind in tabxx"
                    :key="kind"
                    :title="kind"
                    @click="tab = kind"
                    :class="{ active: kind == tab }"
                >
                    <ul>
                        <li v-for="rule in rulexx" :key="rule.name">
                            <b-button @click="add(rule)" variant="outline-primary"> + </b-button>
                            <a :href="link(rule)" target="_blank">{{ rule.name }}</a>
                        </li>
                    </ul>
                </b-tab>
            </b-tabs>
        </div>

        <div v-else class="none-rule">
            <p v-if="manager.list.length == 0" @click="editing = true">....</p>
        </div>
    </div>
</template>

<script>
import Rule from './Rule.vue'
import builder from '../states/builder.js'

export default {
    name: 'RuleTab',
    components: { Rule },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            tab: 'Content',
            tabxx: [],
            RuleList: builder.project.PresetManager.find('ValidationRule').DataManager.list,
            REList: builder.project.PresetManager.find('RegularExpression').DataManager.list,
        }
    },
    computed: {
        rulexx() {
            return this.RuleList.filter(rule => rule.tag == this.tab)
        },
    },
    created() {
        const sss = new Set()
        this.RuleList.forEach(rule => {
            sss.add(rule.tag)
        })
        this.tabxx = Array.from(sss.keys())
    },
    methods: {
        add(rule) {
            try {
                const rrr = this.manager.make(rule.name)
                this.manager.add(rrr)
            } catch (error) {
                console.error(error)
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        remove(rule) {
            if (confirm('Are you sure?')) {
                this.manager.remove(rule)
            }
        },
        link(rule) {
            const uri = 'https://laravel.com/docs/6.0/validation'
            if (rule.name === 'sometimes') {
                return uri + '#conditionally-adding-rules'
            }
            const name = rule.name.replace('_', '-')
            return `${uri}#rule-${name}`
        },
    },
}
</script>

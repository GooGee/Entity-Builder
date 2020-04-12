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
                    v-for="kind in KindList"
                    :key="kind.title"
                    :title="kind.title"
                    @click="tab = kind.title"
                    :class="{ active: kind.title == tab }"
                >
                    <ul v-for="kind in kindInTab" :key="kind.title" class="rule">
                        <li v-for="rule in kind.list" :key="rule.name">
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
import { KindList, REList } from '../presets/rule.js'
import Rule from './Rule.vue'

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
            REList,
            KindList,
            editing: false,
            tab: 'Content',
        }
    },
    computed: {
        kindInTab() {
            return this.KindList.filter(kind => kind.title == this.tab)
        },
    },
    methods: {
        add(rule) {
            try {
                const rrr = this.manager.make(rule.name, rule.isBoolean)
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

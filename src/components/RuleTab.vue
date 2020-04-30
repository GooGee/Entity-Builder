<template>
    <div>
        <template v-if="editing">
            <ItemList :manager="manager">
                <template slot="caption">
                    <b-button @click="editing = false" variant="outline-primary"> OK </b-button>
                </template>
                <template slot="body">
                    <Rule v-for="rule in manager.list" :key="rule.name" :rule="rule" :manager="manager"></Rule>
                </template>
            </ItemList>

            <b-card no-body>
                <b-tabs pills vertical>
                    <b-tab
                        v-for="kind in tabxx"
                        :key="kind"
                        :title="kind"
                        @click="tab = kind"
                        :class="{ active: kind == tab }"
                    >
                        <ul class="list-unstyled">
                            <li v-for="rule in rulexx" :key="rule.name" class="mt11px">
                                <b-button @click="add(rule)" variant="outline-primary" class="mr11px"> + </b-button>
                                <a :href="link(rule)" target="_blank">{{ rule.name }}</a>
                            </li>
                        </ul>
                    </b-tab>
                </b-tabs>
            </b-card>
        </template>

        <template v-else>
            <div v-if="manager.list.length == 0" @click="editing = true">....</div>

            <ul v-else @click="editing = true" class="list-unstyled">
                <li v-for="rule in manager.list" :key="rule.name">
                    {{ rule.value ? `${rule.name}:${rule.value}` : rule.name }}
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import ItemList from './ItemList.vue'
import Rule from './Rule.vue'
import builder from '../states/builder.js'

export default {
    name: 'RuleTab',
    components: {
        ItemList,
         Rule },
    props: {
        manager: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            tab: 'WWW',
            tabxx: [],
            RuleList: builder.project.PresetManager.find('ValidationRule').PropertyManager.list,
            REList: builder.project.PresetManager.find('RegularExpression').PropertyManager.list,
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

<template>
    <div>
        <template v-if="editing">
            <table class="table table-borderless">
                <caption>
                    <b-button @click="editing = false" variant="outline-primary"> OK </b-button>
                </caption>
                <thead>
                    <tr>
                        <th style="width: 244px;"></th>
                        <th></th>
                    </tr>
                </thead>
                <draggable v-model="manager.list" group="rule" tag="tbody">
                    <Rule
                        v-for="rule in manager.list"
                        :key="rule.name"
                        :rule="rule"
                        :rexx="rexx"
                        :manager="manager"
                    ></Rule>
                </draggable>
            </table>

            <b-card no-body>
                <b-tabs pills vertical>
                    <b-tab
                        v-for="kind in tabxx"
                        :key="kind"
                        :title="kind"
                        @click="tab = kind"
                        :class="{ active: kind === tab }"
                    >
                        <ul class="list-unstyled">
                            <li v-for="rule in list" :key="rule.name" class="mt11">
                                <b-button @click="add(rule)" variant="outline-primary" class="mr11"> + </b-button>
                                <a :href="link(rule)" target="_blank">{{ rule.name }}</a>
                            </li>
                        </ul>
                    </b-tab>
                </b-tabs>
            </b-card>
        </template>

        <template v-else>
            <div v-if="manager.list.length === 0" @click="editing = true" class="pointer">....</div>

            <ul v-else @click="editing = true" class="list-unstyled">
                <li v-for="rule in manager.list" :key="rule.name">
                    {{ rule.value ? `${rule.name}:${rule.value}` : rule.name }}
                </li>
            </ul>
        </template>
    </div>
</template>

<script>
import draggable from 'vuedraggable'
import Rule from './Rule.vue'

export default {
    name: 'RuleTab',
    components: {
        draggable,
        Rule,
    },
    props: {
        manager: {
            type: Object,
            required: true,
        },
        rexx: {
            type: Array,
            required: true,
        },
        rulexx: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            editing: false,
            tab: 'WWW',
            tabxx: [],
        }
    },
    computed: {
        list() {
            return this.rulexx.filter(rule => rule.tag === this.tab)
        },
    },
    created() {
        const sss = new Set()
        this.rulexx.forEach(rule => {
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

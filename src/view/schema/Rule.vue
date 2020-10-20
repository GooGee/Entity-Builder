<template>
    <tr>
        <td>
            <b-button-group>
                <b-button @click="remove" variant="outline-danger"> - </b-button>

                <b-dropdown v-if="isRE" :text="rule.name" variant="outline-primary">
                    <b-dropdown-item-button v-for="re in rexx" :key="re.name" @click="rule.value = re.value">
                        {{ re.name }}
                    </b-dropdown-item-button>
                </b-dropdown>

                <b-button v-else variant="outline-secondary"> ✥ {{ rule.name }} </b-button>
            </b-button-group>
        </td>
        <td>
            <b-form-input v-model="rule.value"></b-form-input>
        </td>
    </tr>
</template>

<script>
export default {
    name: 'Rule',
    props: {
        rule: {
            type: Object,
            required: true,
        },
        manager: {
            type: Object,
            required: true,
        },
        rexx: {
            type: Array,
            required: true,
        },
    },
    computed: {
        isRE() {
            return this.rule.name === 'regex' || this.rule.name === 'not_regex'
        },
    },
    methods: {
        remove() {
            this.manager.remove(this.rule)
        },
    },
}
</script>

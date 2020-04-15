<template>
    <span :class="{ editing: editing }">
        <template v-if="editing">
            <b-button @click="$emit('remove')" variant="outline-danger"> - {{ rule.name }} </b-button>

            <b-dropdown v-if="isRE" text="" variant="outline-primary">
                <b-dropdown-item-button v-for="re in REList" :key="re.name" @click="rule.value = re.value">
                    {{ re.name }}
                </b-dropdown-item-button>
            </b-dropdown>
            <b-form-input v-model="rule.value"></b-form-input>
        </template>

        <span v-else>{{ rule.value ? `${rule.name}:${rule.value}` : rule.name }}</span>
    </span>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Rule',
    props: {
        rule: {
            type: Object,
            required: true,
        },
        editing: {
            type: Boolean,
            required: true,
        },
    },
    data() {
        return {
            REList: builder.project.PresetManager.find('RegularExpression').DataManager.list,
        }
    },
    computed: {
        isRE() {
            return this.rule.name === 'regex' || this.rule.name === 'not_regex'
        },
    },
}
</script>

<template>
    <span :class="{ editing: editing }">
        <template v-if="editing">
            <b-button @click="$emit('remove')" variant="outline-danger"> - {{ rule.name }} </b-button>

            <template v-if="rule.isBoolean === false">
                <template v-if="isRE" class="input-group">
                    <b-dropdown text="" variant="outline-primary">
                        <b-dropdown-item-button
                            v-for="(re, index) in REList"
                            :key="index"
                            @click="rule.value = re.text"
                        >
                            {{ re.name }}
                        </b-dropdown-item-button>
                    </b-dropdown>
                    <input v-model="rule.value" class="form-control" type="text" />
                </template>

                <input v-else v-model="rule.value" class="form-control" type="text" />
            </template>
        </template>

        <template v-else>
            <span>{{ rule.name }}</span>
            <span v-if="rule.isBoolean === false"> {{ rule.value }}</span>
        </template>
    </span>
</template>

<script>
import { REList } from '../presets/rule.js'

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
            REList,
        }
    },
    computed: {
        isRE() {
            return this.rule.name === 'regex' || this.rule.name === 'not_regex'
        },
    },
}
</script>

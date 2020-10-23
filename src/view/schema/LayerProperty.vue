<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 111px;">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
            <tr>
                <td class="text-right">single</td>
                <td>
                    <b-form-checkbox v-model="item.single" switch class="mr11 wa inline"></b-form-checkbox>
                    <WriteButton v-if="item.single" :layer="item"></WriteButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">class name</td>
                <td>
                    <b-form-input v-model="item.classPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">file name</td>
                <td>
                    <b-form-input v-model="item.filePattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">name space</td>
                <td>
                    <b-form-input v-model="item.nsPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">pathPattern</td>
                <td>
                    <b-form-input v-model="item.pathPattern"></b-form-input>
                </td>
            </tr>
            <tr>
                <td class="text-right">description</td>
                <td>
                    <b-form-textarea v-model="item.description" rows="11"></b-form-textarea>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import WriteButton from '../button/WriteButton.vue'

export default {
    name: 'LayerProperty',
    components: {
        WriteButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

<template>
    <table class="table b-table b-table-caption-top">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th class="text-right" style="width: 222px;">name</th>
                <th>value</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="text-right">name</td>
                <td>
                    <ChangeButton :item="item" name="name"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">ns</td>
                <td>
                    <ChangeButton :item="item" name="ns"></ChangeButton>
                </td>
            </tr>
            <tr>
                <td class="text-right">dataVersion</td>
                <td>
                    <b-form-input v-model="item.dataVersion"></b-form-input>
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
import ChangeButton from '../button/ChangeButton.vue'

export default {
    name: 'ProjectProperty',
    components: {
        ChangeButton,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

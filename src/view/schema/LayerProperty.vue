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
            <tr>
                <td class="text-right">single</td>
                <td>
                    <b-form-checkbox v-model="item.single" switch></b-form-checkbox>
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
                <td class="text-right">path</td>
                <td>
                    <b-form-input v-model="item.pathPattern"></b-form-input>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'LayerProperty',
    props: {
        item: {
            type: Object,
            required: true,
        },
    },
}
</script>

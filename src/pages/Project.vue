<template>
    <div>
        <h1>Project</h1>
        <PropertyList :manager="builder.project.PropertyManager">
            <tr>
                <td></td>
                <td>name</td>
                <td>
                    <b-button @click="setName" variant="outline-primary"> {{ builder.project.name }} </b-button>
                </td>
            </tr>
            <tr>
                <td></td>
                <td>NameSpace</td>
                <td>
                    <b-form-input v-model="builder.project.NameSpace"></b-form-input>
                </td>
            </tr>
        </PropertyList>
    </div>
</template>

<script>
import PropertyList from '../components/PropertyList.vue'
import builder from '../states/builder.js'

export default {
    name: 'Project',
    components: { PropertyList },
    data() {
        return {
            builder,
        }
    },
    methods: {
        setName() {
            const name = prompt('Please input the name', builder.project.name)
            if (name) {
                try {
                    builder.project.name = name
                } catch (error) {
                    console.error(error)
                    this.$bvToast.toast(error.message, {
                        title: 'i',
                        variant: 'danger',
                        solid: true,
                    })
                }
            }
        },
    },
}
</script>

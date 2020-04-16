<template>
    <table class="table">
        <caption>
            <h3>Property</h3>
        </caption>
        <thead>
            <tr>
                <th width="130px"></th>
                <th>Name</th>
                <th>Value</th>
                <th>Tag</th>
            </tr>
        </thead>
        <tbody>
            <slot></slot>
            <tr v-for="property in manager.list" :key="property.name">
                <td class="button-cell">
                    <b-button-group>
                        <b-button @click="remove(property)" variant="outline-danger"> - </b-button>
                        <b-button @click="manager.moveUp(property)" variant="outline-primary"> ↑ </b-button>
                        <b-button @click="manager.moveDown(property)" variant="outline-primary"> ↓ </b-button>
                    </b-button-group>
                </td>
                <td>
                    <b-button @click="setName(property)" variant="outline-primary"> {{ property.name }} </b-button>
                </td>
                <td>
                    <b-form-input v-model="property.value"></b-form-input>
                </td>
                <td>
                    <b-form-input v-model="property.tag"></b-form-input>
                </td>
            </tr>
            <tr v-if="mutable">
                <td></td>
                <td>
                    <b-button @click="add" variant="outline-primary"> + </b-button>
                </td>
                <td></td>
                <td></td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    name: 'PropertyList',
    props: {
        manager: {
            type: Object,
            required: true,
        },
        mutable: {
            type: Boolean,
            required: false,
            default: true,
        },
    },
    methods: {
        add() {
            const name = prompt('Please input the name')
            if (name) {
                try {
                    const property = this.manager.make(name)
                    this.manager.add(property)
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
        remove(property) {
            if (confirm('Are you sure?')) {
                this.manager.remove(property)
            }
        },
        setName(property) {
            const name = prompt('Please input the name', property.name)
            if (name) {
                try {
                    property.name = name
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

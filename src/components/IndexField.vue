<template>
    <div>
        <div>
            <b-button @click="index.FieldManager.remove(field)" variant="outline-danger" size="sm"> {{ field.name }} </b-button>
        </div>
        <b-button-group>
            <b-button @click="index.FieldManager.moveUp(field)" variant="outline-primary" size="sm"> ← </b-button>
            <b-button @click="index.FieldManager.moveDown(field)" variant="outline-primary" size="sm"> → </b-button>
        </b-button-group>
    </div>
</template>

<script>

export default {
    name: 'IndexField',
    props: {
        index: {
            type: Object,
            required: true,
        },
        field: {
            type: Object,
            required: true,
        },
    },
}
</script>

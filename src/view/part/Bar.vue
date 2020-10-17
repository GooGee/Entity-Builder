<template>
    <b-navbar id="bar">
        <div class="container">
            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" exact active-class="active"> Home </b-nav-item>

                    <template v-if="ready">
                        <b-nav-item to="/project" active-class="active"> Project </b-nav-item>
                        <b-nav-item to="/entity" active-class="active"> Entity </b-nav-item>
                        <b-nav-item to="/layer" active-class="active"> Layer </b-nav-item>
                        <b-nav-item to="/preset" active-class="active"> Preset </b-nav-item>
                    </template>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>

export default {
    name: 'Bar',
    props: {
        ready: {
            type: Boolean,
            required: true,
        },
    },
}
</script>

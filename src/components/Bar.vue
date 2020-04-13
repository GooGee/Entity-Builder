<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <div class="container">
            <b-navbar-brand>Entity</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" exact active-class="active"> Home </b-nav-item>
                    <b-nav-item to="/builder" active-class="active"> Builder </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/project" active-class="active"> Project </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/preset" active-class="active"> Preset </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/script" active-class="active"> Script </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/template" active-class="active"> Template </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/layer" active-class="active"> Layer </b-nav-item>

                    <b-nav-item-dropdown v-if="builder.project" text="Entity">
                        <b-dropdown-item to="/entity"> Entity </b-dropdown-item>
                        <b-dropdown-item to="/table"> Table </b-dropdown-item>
                        <b-dropdown-item to="/model"> Model </b-dropdown-item>
                        <b-dropdown-item to="/factory"> Factory </b-dropdown-item>
                        <b-dropdown-item to="/file"> Other </b-dropdown-item>
                    </b-nav-item-dropdown>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <b-nav-item href="https://github.com/GooGee/Entity-Builder" target="_blank"> GitHub </b-nav-item>
                </b-navbar-nav>
            </b-collapse>
        </div>
    </b-navbar>
</template>

<script>
import builder from '../states/builder.js'

export default {
    name: 'Bar',
    data() {
        return {
            builder,
        }
    },
}
</script>

<template>
    <b-navbar toggleable="lg" type="dark" variant="primary">
        <div class="container">
            <b-navbar-brand>Entity</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" active-class="active"> Home </b-nav-item>
                    <b-nav-item to="/builder" active-class="active"> Builder </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/project" active-class="active"> Project </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/script" active-class="active"> Script </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/template" active-class="active"> Template </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/layer" active-class="active"> Layer </b-nav-item>
                    <b-nav-item v-if="builder.project" to="/entity" active-class="active"> Entity </b-nav-item>
                </b-navbar-nav>

                <!-- Right aligned nav items -->
                <b-navbar-nav class="ml-auto">
                    <li class="nav-item">
                        <a href="https://github.com/GooGee/Entity-Builder"> GitHub </a>
                    </li>
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

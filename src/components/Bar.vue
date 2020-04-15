<template>
    <b-navbar id="bar" toggleable="lg" type="dark" variant="primary">
        <div class="container">
            <b-navbar-brand>Entity</b-navbar-brand>

            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

            <b-collapse id="nav-collapse" is-nav>
                <b-navbar-nav>
                    <b-nav-item to="/" exact active-class="active"> Home </b-nav-item>

                    <template v-if="builder.project">
                        <b-nav-item to="/project" active-class="active"> Project </b-nav-item>
                        <b-nav-item to="/preset" active-class="active"> Preset </b-nav-item>
                        <b-nav-item to="/script" active-class="active"> Script </b-nav-item>
                        <b-nav-item to="/template" active-class="active"> Template </b-nav-item>
                        <b-nav-item to="/layer" active-class="active"> Layer </b-nav-item>

                        <b-nav-item to="/entity" active-class="active"> Entity </b-nav-item>
                        <b-nav-item to="/table" active-class="active"> Table </b-nav-item>
                        <b-nav-item to="/model" active-class="active"> Model </b-nav-item>
                        <b-nav-item to="/factory" active-class="active"> Factory </b-nav-item>
                        <b-nav-item to="/file" active-class="active"> File </b-nav-item>
                    </template>
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
import { getPreset } from '../helpers/request.js'
import builder from '../states/builder.js'

export default {
    name: 'Bar',
    data() {
        return {
            builder,
        }
    },
    created() {
        getPreset().then(response => {
            builder.preset = response.data
        })
    },
}
</script>

<style>
#bar.navbar {
    padding: 0;
}

#bar a.nav-link.active,
#bar a.nav-link:hover {
    color: white;
    font-weight: bolder;
    background-color: #08f;
    padding-left: 1rem;
    padding-right: 1rem;
}

#bar a.nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>

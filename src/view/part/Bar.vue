<template>
    <b-navbar id="bar" type="dark" variant="primary">
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

<style>
#bar.navbar {
    padding: 0;
}

#bar a.nav-link.active,
#bar a.nav-link:hover {
    color: white;
    background-color: #08f;
}

#bar a.nav-link.active {
    font-weight: bolder;
    padding-left: 1rem;
    padding-right: 1rem;
}

#bar a.nav-link {
    color: rgba(255, 255, 255, 0.8);
    padding-top: 1rem;
    padding-bottom: 1rem;
}
</style>

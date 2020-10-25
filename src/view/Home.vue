<template>
    <div class="text-center">
        <div style="margin-top: 11%">
            <img alt="logo" src="@/assets/logo.svg" style="width: 222px" />
        </div>

        <h1>{{ title }}</h1>
        <p>{{ version }}</p>
        <p><a href="../dist5">Use version 5</a></p>

        <div>
            <b-button-group>
                <b-button @click="create" variant="outline-primary"> New </b-button>
                <b-button variant="outline-primary">
                    <label class="m0 p0">
                        Upload
                        <input @change="upload($event)" type="file" accept=".json" style="display: none" />
                    </label>
                </b-button>
                <ConnectButton @connect="load"></ConnectButton>
            </b-button-group>
        </div>
    </div>
</template>

<script>
import ConnectButton from './button/ConnectButton.vue'
import sss from '../state.js'

export default {
    name: 'Home',
    components: {
        ConnectButton,
    },
    data() {
        return {
            title: process.env.VUE_APP_TITLE,
            version: process.env.VUE_APP_VERSION,
        }
    },
    methods: {
        create() {
            try {
                const name = prompt('Please input the project name', 'Entity')
                if (name) {
                    sss.create(name)
                    this.$router.push('/project')
                }
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
        upload() {
            const reader = new FileReader()
            reader.onload = event => {
                const data = JSON.parse(event.target.result)
                this.load(data)
            }
            reader.onerror = error => {
                alert(error.message)
            }
            reader.readAsText(event.target.files[0])
        },
        load(data) {
            if (data.version < 12) {
                alert('This data is not compatible.\nPlease use the v5 builder.')
                return
            }

            try {
                if (sss.project === null) {
                    sss.load(data)
                }
                this.$router.push('/project')
            } catch (error) {
                this.$bvToast.toast(error.message, {
                    title: 'i',
                    variant: 'danger',
                    solid: true,
                })
            }
        },
    },
}
</script>

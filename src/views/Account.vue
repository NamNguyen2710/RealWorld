<template lang="pug">
    div(v-if="profile")
        .jumbotron(class="jumbotron-fluid bg-light" style="padding-bottom: 40px")
            .container
                .row.justify-content-center
                    img(ref="ava" :src="profile.image" style="clip-path: circle()"
                        :style="checkSize? 'width: 100px' : 'height: 100px'")
                    h4.col-12(class="text-center font-weight-bold") {{profile.username}}
                    p.text-muted {{profile.bio}}
                .row.justify-content-end
                    router-link.btn(class="artcBtn follow" to="/settings" v-if="checkLogin()") Edit profile settings
        router-view
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import { authHeader } from '../authHeader.js';
    import axios from 'axios';
    import Cookies from 'js-cookie';

    export default {
        name: 'account',
        components: {
            topbar
        },
        data() {
            return {
                profile: {},
                id: this.$route.params.id,
                logCheck: Cookies.getJSON('user')
            }
        },
        mounted() {
            if (this.logCheck)
                axios({url: `http://localhost:3000/api/profiles/${this.id}`, method: 'get', headers: authHeader()})
                    .then(response => { 
                        this.profile = response.data.profile;
                        document.title = "@" + this.profile.username; 
                    })
                    .catch(e => { this.error.push(e) })
            else 
                axios.get(`http://localhost:3000/api/profiles/${this.id}`)
                    .then(response => { 
                        this.profile = response.data.profile;
                        document.title = "@" + this.profile.username; 
                    })
                    .catch(e => { this.error.push(e) })
        },
        methods: {
            checkLogin() {
                return (this.logCheck !== undefined && this.profile.username == this.logCheck.username)
            },
            follow() {
                if (authHeader())
                    if (this.profile.following)
                        axios({url: `http://localhost:3000/api/profiles/${this.profile.username}/follow`, method: 'delete', headers: authHeader()})
                            .then(response => { this.profile = response.data.profile })
                            .catch(e => console.log(e))
                    else
                        axios({url: `http://localhost:3000/api/profiles/${this.profile.username}/follow`, method: 'post', headers: authHeader()})
                            .then(response => { this.profile = response.data.profile })
                            .catch(e => console.log(e))
            }
        },
        computed: {
            checkSize() {
                let ava = new Image();
                ava.src = this.profile.image;
                return ava.width > ava.height
            }
        },
        watch: {
            '$route' (to, from) {
                axios.get(`http://localhost:3000/api/profiles/${to.params.id}`, { headers: authHeader()})
                    .then(response => { this.profile = response.data.profile })
                    .catch(e => { this.error.push(e) })
            }
        }
    }
</script>

<style scoped>
    /* .follow {
        padding: 5px; 
        border-radius:3px;
        size: 20px;
        position: absolute;
        left: 75%;
        border: 1px solid rgb(167, 167, 167);
        background: rgb(238, 238, 238); 
        color: rgb(167, 167, 167);
        font-size: 14px;
        font-family: Arial, Helvetica, sans-serif;
        text-decoration: none;
    }*/
    .follow:hover {
        background: rgb(201, 201, 201)
    } 

    .head {
        text-align: center; 
        background: rgb(238, 238, 238); 
        padding: 15px;
        margin: 25px -12.5%;
    }
</style>
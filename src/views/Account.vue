<template>
    <div>
        <topbar :page="6"></topbar>
        <div class="head">
            <img ref="ava" :src="profile.image" style="clip-path: circle()">
            <h2 style="font-family: tahoma; margin: 0">{{ profile.username }}</h2>
            <p style="font-size: 14px; color: rgb(238, 238, 238)">{{ profile.bio }}</p>
            <router-link to="/settings" class="follow" v-if="checkLogin()">Edit Profile Settings</router-link>
            <button class="follow" v-else @click="follow">
                    <span v-if="!profile.following">+ Following </span>
                    <span v-else>+ Unfollowing </span>
                    {{ profile.username }}
            </button>
            <br><br>
        </div>
        <router-view></router-view>
    </div>
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
                id: this.$route.params.id
            }
        },
        created() {
            axios({url: `http://localhost:3000/api/profiles/${this.id}`, method: 'get', headers: authHeader()})
                .then(response => { this.profile = response.data.profile })
                .catch(e => { this.error.push(e) })
        },
        methods: {
            checkLogin() {
                if (authHeader() && this.profile.username === JSON.parse(Cookies.get('user')).username)
                    return true
                else
                    return false
            },
            follow() {
                if (this.profile.following)
                    axios({url: `http://localhost:3000/api/profiles/${this.id}/follow`, method: 'delete', headers: authHeader()})
                        .then(response => { this.profile = response.data.profile})
                        .catch(e => console.log(e))
                else
                    axios({url: `http://localhost:3000/api/profiles/${this.id}/follow`, method: 'post', headers: authHeader()})
                        .then(response => { this.profile = response.data.profile})
                        .catch(e => console.log(e))
            }
        },
        mounted () {
            this.$nextTick(function () {
                if (this.$refs.ava.width >= this.$refs.ava.height)
                    this.$refs.ava.style.height = '100px'
                else
                    this.$refs.ava.style.width = '100px'
            })
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
    .follow {
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
    }
    .follow:hover {
        background: rgb(201, 201, 201)
    }

    .head {
        text-align: center; 
        background: rgb(238, 238, 238); 
        padding: 15px;
        margin-left: -13%;
        margin-right: -11.5%;
    }
</style>
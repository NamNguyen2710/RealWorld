<template>
    <div>
        <topbar :page="6"></topbar>
        <div class="head">
            <img ref="ava" :src="profile.image" style="clip-path: circle()">
            <h2 style="font-family: tahoma; margin: 0">{{ profile.username }}</h2>
            <p style="font-size: 14px; color: rgb(238, 238, 238)">{{ profile.bio }}</p>
            <button class="follow">+ Following {{ profile.username }}</button>
            <br><br>
        </div>
        <table style="width: 77%; float: left; margin: 30px">
            <tr>
                <td>
                    <router-link :to="`/account/${profile.username}`" class="feed inFeed">
                        My article</router-link>
                    <router-link :to="`/account/${profile.username}/favorites`" class="feed">Favorite articles</router-link>
                </td>
            </tr>
            <tr v-for="article in articles" :key="article.id">
                <td><artc :post="article"></artc></td>
            </tr>
        </table>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import artc from '../components/Artc.vue';
    import axios from 'axios';

    export default {
        name: 'account',
        components: {
            topbar,
            artc
        },
        data() {
            return {
                profile: {},
                articles: {},
                curPath: window.location.pathname,
                id: this.$route.params.id
            }
        },
        methods: {
            getArticles() {
                axios.get('http://localhost:3000/api/articles', { params: { author: this.id }})
                    .then(response => { this.articles = response.data.articles })
                    .catch(e => { this.error.push(e) })
            }
        },
        watch: {
            '$route' (to, from) {
                axios.get(`http://localhost:3000/api/profiles/${to.params.id}`)
                    .then(response => { this.profile = response.data.profile })
                    .catch(e => { this.error.push(e) }),
                axios.get('http://localhost:3000/api/articles', { params: { author: to.params.id }})
                        .then(response => { this.articles = response.data.articles })
                        .catch(e => { this.error.push(e) })
            }
        },
        created() {
            axios.get(`http://localhost:3000/api/profiles/${this.id}`)
                .then(response => { this.profile = response.data.profile })
                .catch(e => { this.error.push(e) }),
            this.getArticles()
        },
        mounted () {
            this.$nextTick(function () {
                if (this.$refs.ava.width >= this.$refs.ava.height)
                    this.$refs.ava.style.height = '100px'
                else
                    this.$refs.ava.style.width = '100px'
            })
        }
    }
</script>

<style scoped>
    .setWidth{
        width: 100px;
    }
    .setHeight {
        height: 100px;
    }

    .follow {
        padding: 5px; 
        border-radius:3px;
        size: 20px;
        position: absolute;
        left: 75%;
        border: 1px solid rgb(167, 167, 167);
        background: rgb(238, 238, 238); 
        color: rgb(167, 167, 167);
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

    td {
        border-bottom: 1px solid rgb(236, 236, 236);
        padding: 15px;
        padding-left: 0;
    }

    .feed {
        color: rgb(118, 201, 118); 
        background-color: white; 
        border: hidden; 
        text-decoration: none;
        padding: 15px; 
        margin: 0;
    }
    .inFeed {
        border-bottom: 1px solid rgb(118, 201, 118)
    }
</style>
<template>
    <table style="width: 77%; float: left; margin: 30px">
        <tr>
            <td style="padding-bottom: 0">
                <button @click="getArticles()" class="feed inFeed">My article</button>
                <router-link :to="`/account/${this.id}/favorites`" class="feed">Favorited articles</router-link>
            </td>
        </tr>
        <tr v-for="article in articles" :key="article.id">
            <td><artc :post="article"></artc></td>
        </tr>
    </table>
</template>

<script>
    import artc from '../components/Artc.vue';
    import axios from 'axios';

    export default {
        name: 'accountArtc',
        components: {
            artc
        },
        data() {
            return {
                articles: [],
                id: this.$route.params.id
            }
        },
        methods: {
            getArticles() {
                axios.get(`http://localhost:3000/api/articles`, { params: { author: this.id }})
                    .then(response => { this.articles = response.data.articles })
                    .catch(e => { this.error.push(e) })
            }
        },
        created() {
            this.getArticles()
        },
        watch: {
            '$route' (to, from) {
                axios.get('http://localhost:3000/api/articles', { params: { author: to.params.id }})
                        .then(response => { this.articles = response.data.articles })
                        .catch(e => { this.error.push(e) })
            }
        }
    }
</script>

<style scoped>
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
        border-bottom: 1px solid rgb(236, 236, 236);
        font-family: Arial, Helvetica, sans-serif;
        font-size: 14px;
    }
    .inFeed {
        border-bottom: 1px solid rgb(118, 201, 118)
    }
</style>
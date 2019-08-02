<template>
    <div>
        <topbar :page="1"></topbar>
		<h1 class="heading" style="font-size: 40px"><b>conduit</b></h1>
		<h3 id="top" class="heading">A place to share your knowledge</h3>
		<br>
		<table style="width: 77%; float: left; table-layout: fixed">
            <tr>
                <td style="padding: 0">
                    <button v-if="logCheck" :class="{'inFeed': curFeed == 1}" @click="curPage = 1; curFeed = 1; getArticles()">My Feed</button>
                    <button :class="{'inFeed':curFeed == 2}" @click="curPage = 1; curFeed = 2; getArticles()"> Global feed </button>
                    <button class="inFeed" v-if="curFeed == 3" @click="getArticles(tagName)">{{ tagName }}</button>
                </td>
            </tr>
            <tr v-for="article in articles" :key="article.id">
                <td><artc :artc="article" v-on:changeTag=createTag></artc></td>
            </tr>
            <tr v-if="articles.length === 0">
                <td>No article is here... yet</td>
            </tr>
            <tr v-else>
                <td class="margin-top: 10px">
                    <a href="#top" :class="{'inPage':(num + 1) === curPage}" class="page" 
                        v-for="num in pages" :key="num" @click="curPage = num + 1; getArticles()">
                        {{ num + 1 }}
                    </a>
                </td>
            </tr>
		</table>
		<favtags :tagsLs="favtagslist" v-on:changeTag=createTag></favtags>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import artc from '../components/Artc.vue';
    import favtags from '../components/FavTags.vue';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { authHeader} from '../authHeader.js';

    export default {
        data() {
            return {
                articles: [],
                favtagslist: [],
                curFeed: 2,
                tagName: '',
                curPage: 1,
                pages: [],
                logCheck: Cookies.get('user')
            }
        },
        name: 'home',
        components: {
            topbar,
            artc,
            favtags
        },
        methods: {
            getArticles(value){
                if (this.curFeed == 1)
                    axios({url: 'http://localhost:3000/api/articles/feed', method: 'get',
                        params: { limit: 10, offset: (this.curPage-1)*10},
                        headers: authHeader() })
                    .then(response => { 
                        this.articles = response.data.articles;
                        this.pages = [ ...Array(Math.ceil(response.data.articlesCount / 10)).keys() ];
                    })
                    .catch(e => { this.error.push(e) })
                else
                    if (this.logCheck)
                        axios({url: 'http://localhost:3000/api/articles', method: 'get',
                            params: { tag: value, limit: 10, offset: (this.curPage-1)*10},
                            headers: authHeader()})
                        .then(response => { 
                            this.articles = response.data.articles;
                            this.pages = [ ...Array(Math.ceil(response.data.articlesCount / 10)).keys() ];
                        })
                        .catch(e => { this.error.push(e) })
                    else
                        axios({url: 'http://localhost:3000/api/articles', method: 'get',
                            params: { tag: value, limit: 10, offset: (this.curPage-1)*10 }})
                        .then(response => { 
                            this.articles = response.data.articles;
                            this.pages = [ ...Array(Math.ceil(response.data.articlesCount / 10)).keys() ];
                        })
                        .catch(e => { this.error.push(e) })
            },
            createTag: function(value) {
                this.curFeed = 3;
                this.curPage = 1;
                this.tagName = '#' + value;
                this.getArticles(value);
            }
        },
        mounted() {
            this.getArticles(),
            axios.get('http://localhost:3000/api/tags')
                .then(response => { this.favtagslist = response.data.tags })
                .catch(e => { this.error.push(e) })
            document.title = "Home"
        }
    }
</script>

<style scoped>
    .heading {
        font-family:courier;
        text-align:center;
        background-color:rgb(118, 201, 118);
        color:white;
        margin: 0 -12.5%;
        padding-bottom: 15px;
        padding-top: 30px;
    }
    tr, td {
        border-bottom: 1px solid rgb(228, 228, 228);
        padding: 30px;
    }
    button {
        color: rgb(118, 201, 118); 
        background-color: white; 
        border: hidden; 
        padding: 20px; 
        margin: -2px;
    }
    button:focus {
        outline: none;
    }
    .inFeed {
        border-bottom: 1px solid rgb(118, 201, 118)
    }

    .page {
        border: 0.5px solid rgb(221, 221, 221);
        font-size: 12px;
        padding: 10px;
        text-decoration: none;
        background-color: white;
        color: rgb(118, 201, 118);
        margin-left: -2px;
    }
    .page:hover {
        background-color: rgb(221, 221, 221);
        color: rgb(57, 117, 57);
        text-decoration: underline;
    }
    .inPage {
        background: rgb(118, 201, 118) !important;
        color: white !important;
    }
</style>
<template>
    <div>
        <topbar :page="1"></topbar>
		<h1 class="heading" style="font-size: 40px"><b>conduit</b></h1>
		<h3 class="heading">A place to share your knowledge</h3>
		<br>
		<table style="width: 77%; float: left;">
            <tr>
                <td style="padding: 0">
                    <button :class="{'inFeed':tagOn === false}" @click="getArticles(); tagOn = false"> Global feed </button>
                    <button class="inFeed" v-if="tagOn === true">{{ tagName }}</button>
                </td>
            </tr>
            <tr v-for="article in articles" :key="article.id">
                <td><artc :post="article"></artc></td>
            </tr>
		</table>
		<favtags :tagsLs="favtagslist" v-on:changeTag=createTag></favtags>
        <p>{{authHeader()}}</p>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import artc from '../components/Artc.vue';
    import favtags from '../components/FavTags.vue';
    import axios from 'axios';
    import { authHeader} from '../authHeader.js';

    export default {
        data() {
            return {
                articles: [],
                favtagslist: [],
                tagOn: false,
                tagName: ''
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
                axios.get('http://localhost:3000/api/articles', { params: { tag: value }})
                .then(response => { this.articles = response.data.articles })
                .catch(e => { this.error.push(e) })
            },
            createTag: function(value) {
                this.tagOn = true;
                this.tagName = '#' + value;
                this.getArticles(value);
            },
            authHeader() {
                return authHeader();
            }
        },
        created() {
            this.getArticles(),
            axios.get('http://localhost:3000/api/tags')
                .then(response => { this.favtagslist = response.data.tags })
                .catch(e => { this.error.push(e) })
        }
    }
</script>

<style scoped>
    .heading {
        font-family:courier;
        text-align:center;
        background-color:rgb(118, 201, 118);
        color:white;
        margin:0;
        padding: 15px;
        margin-left: -13%;
        margin-right: -11.9%;
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
</style>
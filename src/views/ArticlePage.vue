<template>
    <div>
        <topbar :page="0"></topbar>
        <div class="head">
            <h1 style="color: white; font-family: sans-serif">{{ post.title }}</h1>
            <ufa :page="true" :post="post"></ufa>
        </div>
        <p style="padding: 20px; font-size: 18px">{{ post.body }}</p><br>
        <tags v-for="tag in post.tagList" :tagName="tag" :key="tag.id" style="float: none"></tags>
        <hr>
        <ufa :page="false" :post="post" style="margin: 0 auto"></ufa>
        <div style="width: 40%; margin: 10px auto">
            <addcomm :id="id" v-on:addComment=getComm></addcomm>
            <comment v-for="comm in comments" :comm="comm" :key="comm.id" :id="id" v-on:updComm=getComm></comment>
        </div>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import ufa from '../components/UserForArtc.vue';
    import comment from '../components/Comments.vue';
    import addcomm from '../components/AddComment.vue';
    import axios from 'axios';
    import tags from '../components/Tags.vue';
    import { authHeader } from '../authHeader.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'artcPage',
        data() {
            return {
                id: this.$route.params.id,
                post: {},
                comments: [],
                logCheck: Cookies.get('user')
            }
        },
        components: {
            topbar,
            ufa,
            comment,
            addcomm,
            tags
        },
        methods: {
            getComm() {
                axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
                    .then(response => { this.comments = response.data.comments })
                    .catch(e => this.error.push(e))
            },
            getArticle() {
                if (this.logCheck)
                    axios({url: `http://localhost:3000/api/articles/${this.id}`, method: 'get', headers: authHeader()})
                        .then(response => { this.post = response.data.article })
                        .catch(e => this.error.push(e))
                else
                    axios.get(`http://localhost:3000/api/articles/${this.id}`)
                        .then(response => { this.post = response.data.article })
                        .catch(e => this.error.push(e))
            }
        },
        created() {
            this.getArticle()
            this.getComm()
        }
    }
</script>

<style scoped>
    .head {
        background: rgb(53, 53, 53); 
        padding: 15px;
        margin-left: -13%;
        padding-left: 16%;
        margin-right: -11.5%;
    }

    hr { 
        display: block;
        height: 1px;
        border: 0; 
        border-top: 1px solid rgb(201, 201, 201);
        margin: 1em 0;
        padding: 0; 
    }
</style>

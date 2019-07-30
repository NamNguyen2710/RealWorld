<template>
    <div>
        <topbar :page="0"></topbar>
        <div class="head">
            <h1 style="color: white; font-family: sans-serif">{{ post.title }}</h1>
            <table>
                <tr>
                    <td rowspan="2" style="min-width: 150px">
                        <ufa :post="post" :page="true"></ufa>
                    </td>
                </tr>
                <tr>
                    <td>
                        <span v-if="checkLogin()">
                            <button class="follow" @click="updArtc">Edit article</button>
                            <button class="delete" @click="deleteArtc">Delete article</button>
                        </span>
                        <span v-else >
                            <button class="follow" @click="follow">
                                <span v-if="!post.author.following">+ Following </span>
                                <span v-else>+ Unfollowing </span>
                                {{ post.author.username }}
                            </button>
                            <like :numb="post.favoritesCount" :favored="post.favorited" :optText="'Favorited Article '" 
                                style="float: none" v-on:favorited=updArtc></like>
                        </span>
                    </td>
                </tr>
            </table>
        </div>
        <p style="padding: 20px; font-size: 18px">{{ post.body }}</p><br>
        <tags v-for="tag in post.tagList" :tagName="tag" :key="tag.id" style="float: none"></tags>
        <hr>
        <table align="center">
            <tr>
                <td rowspan="2" style="min-width: 150px">
                    <ufa :post="post" :page="false"></ufa>
                </td>
            </tr>
            <tr>
                <td>
                    <span v-if="checkLogin()">
                        <button class="follow" @click="updArtc">Edit article</button>
                        <button class="delete" @click="deleteArtc">Delete article</button>
                    </span>
                    <span v-else >
                        <button class="follow" @click="follow">
                            <span v-if="!post.author.following">+ Following </span>
                            <span v-else>+ Unfollowing </span>
                            {{ post.author.username }}
                        </button>
                        <like :numb="post.favoritesCount" :favored="post.favorited" :optText="'Favorited Article '" 
                            style="float: none" v-on:favorited=updArtc></like>
                    </span>
                </td>
            </tr>
        </table>
        <div style="width: 40%; margin: 10px auto">
            <addcomm :id="id" v-on:addComment=getComm></addcomm>
            <comment v-for="comm in comments" :comm="comm" :key="comm.id" :id="id" v-on:updComm=getComm></comment>
        </div>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import like from '../components/Like.vue';
    import ufa from '../components/UserForArtc.vue';
    import comment from '../components/Comments.vue';
    import addcomm from '../components/AddComment.vue';
    import axios from 'axios';
    import router from '../router.js';
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
            like,
            ufa,
            comment,
            addcomm,
            tags
        },
        methods: {
            updArtc() {
                router.push(`/editor/${this.id}`)
            },
            deleteArtc() {
                axios({url: `http://localhost:3000/api/articles/${this.id}`, method: 'delete', headers: authHeader()})
                    .then( router.push('/') )
                    .catch(e => console.log(e))
            },
            checkLogin() {
                if (this.logCheck && (this.post.author.username == JSON.parse(this.logCheck).username))
                    return true
                else
                    return false
            },
            getComm() {
                axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
                    .then(response => { this.comments = response.data.comments })
                    .catch(e => this.error.push(e))
            },
            follow() {
                if (this.post.author.following)
                    axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'delete', headers: authHeader()})
                        .then(response => { this.getArticle() })
                        .catch(e => console.log(JSON.stringify(e)))
                else
                    axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'post', headers: authHeader()})
                        .then(response => { this.getArticle() })
                        .catch(e => console.log(e))
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
            },
            updArtc(value) {
				if (value)
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'delete', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(e))
				else
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'post', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(JSON.stringify(e)))
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

    .follow {
        padding: 4px; 
        border-radius:3px;
        border: 1px solid rgb(167, 167, 167);
        background: none;
        color: rgb(167, 167, 167);
        margin-left: 20px;
        margin-right: 7px;
    }
    .follow:hover {
        background: rgb(167, 167, 167);
        color: white;
    }

    hr { 
        display: block;
        height: 1px;
        border: 0; 
        border-top: 1px solid rgb(201, 201, 201);
        margin: 1em 0;
        padding: 0; 
    }

    .delete {
        padding: 4px;
        background: none;
        color: rgb(179, 91, 91); 
        border-radius: 3px; 
        border: 1px solid rgb(179, 91, 91);
    }
    .delete:hover {
        background-color: rgb(179, 91, 91);
        color: white;
    }
</style>

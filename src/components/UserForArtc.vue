<template>
    <table>
        <tr>
            <td rowspan="2" style="min-width: 150px">
                <utag :author="post.author" :date="post.createdAt" :page="page"></utag>
            </td>
            <td><span v-if="checkLogin()">
                    <router-link class="follow" :to="`/editor/${post.slug}`">Edit article</router-link>
                    <button class="delete" @click="deleteArtc">Delete article</button>
                </span>
                <span v-else >
                    <button class="follow" @click="follow">
                        <span v-if="!post.author.following">+ Following </span>
                        <span v-else>+ Unfollowing </span>
                        {{ post.author.username }}
                    </button>
                    <like :numb="post.favoritesCount" :favored="post.favorited" :optText="'Favorited Article '" 
                        style="float: none" v-on:favorited=favArtc></like>
            </span></td>
        </tr>
    </table>
</template>

<script>
    import like from '../components/Like.vue';
    import utag from '../components/UserTag.vue';
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'ufa',
        props: {
            page: Boolean,
            post: {}
        },
        components: {
            like,
            utag
        },
        data() {
            return {
                logCheck: Cookies.get('user')
            }
        },
        methods: {
            checkLogin() {
                if (this.logCheck && (this.post.author.username == JSON.parse(this.logCheck).username))
                    return true
                else
                    return false
            },
            deleteArtc() {
                axios({url: `http://localhost:3000/api/articles/${this.post.slug}`, method: 'delete', headers: authHeader()})
                    .then( router.push('/') )
                    .catch(e => console.log(e))
            },
            favArtc(value) {
				if (value)
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'delete', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(e))
				else
					axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'post', headers: authHeader()})
						.then(response => {this.post = response.data.article})
						.catch(e => console.log(JSON.stringify(e)))
			},
            follow() {
                if (this.post.author.following)
                    axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'delete', headers: authHeader()})
                        .then(response => { this.post.author.following = false })
                        .catch(e => console.log(JSON.stringify(e)))
                else
                    axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'post', headers: authHeader()})
                        .then(response => { this.post.author.following = true })
                        .catch(e => console.log(e))
            },
        }
    }
</script>

<style scoped>
    .follow {
        padding: 4px; 
        border-radius:3px;
        border: 1px solid rgb(167, 167, 167);
        background: none;
        color: rgb(167, 167, 167);
        margin-left: 20px;
        margin-right: 7px;
        font: 14px Arial;
        text-decoration: none;
    }
    .follow:hover {
        background: rgb(167, 167, 167);
        color: white;
    }

    .delete {
        padding: 4px;
        background: none;
        color: rgb(179, 91, 91); 
        border-radius: 3px; 
        border: 1px solid rgb(179, 91, 91);
        font-size: 14px;
    }
    .delete:hover {
        background-color: rgb(179, 91, 91);
        color: white;
    }
</style>
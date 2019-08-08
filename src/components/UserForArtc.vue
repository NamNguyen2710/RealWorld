<template lang="pug">
    .row(v-if="post !== undefined" :class="page? 'justify-content-lg-start' : ''"
        class="justify-content-center mt-4" )
        .col-auto
            router-link(:to="`/account/${post.author.username}`" class="avatar")
                img(ref ="ava" :src="post.author.image" style="clip-path: circle()"
                    :style="checkSize? 'width: 35px' : 'height: 35px'")
            router-link(:class="page? 'text-white' : 'text-success'"
                :to="`/account/${post.author.username}`" 
                style="font-size: 20px"
            ) {{post.author.username}}
            p(style="white-space: nowrap; margin-bottom: 0; font-size: 13px" :class="page? 'text-white-50' : 'text-black-50'" ) {{getDate(post.createdAt)}}
        .col-auto(class="my-auto")
            template(v-if="checkLogin()")
                router-link.btn(class="artcBtn follow" :to="`/editor/${post.slug}`") Edit article
                button.btn(class="artcBtn logout" to="/" @click="deleteArtc") Delete article
            template(v-else)
                button.btn(
                    class="artcBtn" @click="follow"
                    :class="post.author.following? 'followed' : 'follow'"
                ) 
                    span(v-if="!post.author.following") + Following 
                    span(v-else) + Unfollowing 
                    span {{post.author.username}}
                like(:numb="post.favoritesCount" :favored="post.favorited" 
                    :optText="post.favorited? 'Favorite Article ' : 'Favorited Article '"
                    v-on:favorited="favArtc")
</template>


<script>
    import like from '../components/Like.vue';
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
            like
        },
        data() {
            return {
                logCheck: Cookies.getJSON('user')
            }
        },
        methods: {
            checkLogin() {
                if (this.logCheck && (this.post.author.username == this.logCheck.username))
                    return true
                else
                    return false
            },
            deleteArtc() {
                if (authHeader())
                    axios({url: `http://localhost:3000/api/articles/${this.post.slug}`, method: 'delete', headers: authHeader()})
                        .then( router.push("/") )
                        .catch(e => console.log(e))
            },
            favArtc(value) {
                if (authHeader())
                    if (value)
                        axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'delete', headers: authHeader()})
                            .then( this.post.favorited = false, this.post.favoritesCount-- )
                            .catch(e => console.log(e))
                    else
                        axios({url: `http://localhost:3000/api/articles/${this.post.slug}/favorite`, method: 'post', headers: authHeader()})
                            .then( this.post.favorited = true, this.post.favoritesCount++ )
                            .catch(e => console.log(JSON.stringify(e)))
			},
            follow() {
                if (authHeader())
                    if (this.post.author.following)
                        axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'delete', headers: authHeader()})
                            .then( this.post.author.following = false )
                            .catch(e => console.log(JSON.stringify(e)))
                    else
                        axios({url: `http://localhost:3000/api/profiles/${this.post.author.username}/follow`, method: 'post', headers: authHeader()})
                            .then( this.post.author.following = true )
                            .catch(e => console.log(JSON.stringify(e)))
            },
            getDate(date) {
				return new Date(date).toDateString()
            }
        },
        computed: {
            checkSize() {
                let ava = new Image();
                ava.src = this.post.author.image;
                return ava.width > ava.height
            }
        }
    }
</script>
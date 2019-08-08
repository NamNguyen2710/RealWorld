<template lang="pug">
    div(v-if="post.author")
        .jumbotron(class="jumbotron-fluid bg-dark" style="padding-bottom: 40px")
            .container
                .row
                    h1.col-12(class="text-white text-center text-lg-left") {{post.title}}
                .row
                    h5.col-12(class="text-light text-center text-lg-left") {{post.description}}
                ufa(ref="utag1" :post="post" :page="true")  
        .container
            .row
                p.col-12 {{post.body}}
                .col-12(style="margin-top: 20px")
                    .badge(
                        v-for="tag in post.tagList" :key="tag"
                        class="badge-pill badge-secondary" @click="returnTag(tag)"
                    ) {{tag}}
                hr.col-10(style="border-top-width: 2px")
                .col-12
                    ufa(ref="utag2" :post="post" :page="false")
            .row(class="justify-content-center" style="margin: 30px 0")
                .col-lg-8(class="col-sm-12")
                    textarea.addComm(placeholder="Write a comment..." v-model="comm")
                    div.addComm
                        button.addComm(class="btn btn-success" @click="postComm") Post comment
                .col-lg-8(class="col-sm-12" v-for="comment in comments")
                    .media(style="margin: 8px; border-left: 5px solid green; border-bottom: 1px solid rgb(206, 206, 206)")
                        router-link(:to="`/account/${comment.author.username}`" class="avatar")
                            img(ref="ava" :src="comment.author.image" style="clip-path: circle()"
                                :style="checkSize? 'width: 35px' : 'height: 35px'")
                        .media-body
                            router-link.text-success(
                                :to="`/account/${comment.author.username}`" 
                                style="font-size: 20px"
                            ) {{comment.author.username}}   
                            span.text-black-50(style="white-space: nowrap; margin-bottom: 0; font-size: 13px") {{getDate(post.createdAt)}}
                            button.none(v-if="checkLogin(comment.author.username)" @click="deleteComm")
                                i.far.fa-trash-alt
                            p {{comment.body}}
</template>

<script>
    import ufa from '../components/UserForArtc.vue';
    import axios from 'axios';
    import { authHeader } from '../authHeader.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'artcPage',
        data() {
            return {
                id: this.$route.params.id,
                post: {},
                comments: [],
                comm: "",
                logCheck: Cookies.getJSON('user')
            }
        },
        components: { ufa },
        methods: {
            checkLogin(value) {
                return (this.logCheck !== undefined && value == this.logCheck.username)
            },
            deleteComm() {
                axios({url: `http://localhost:3000/api/articles/${this.id}/comments/${this.comm.id}`, method: 'delete', headers: authHeader()})
                    .then( async () => { this.comments = await this.getComm()})
                    .catch(e => console.log(e))
            },
            getComm() {
                return axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
                    .then(response => { return response.data.comments })
                    .catch(e => this.error.push(e))
            },
            postComm() {
                if ( authHeader() && this.comm) {
                    axios({url: `http://localhost:3000/api/articles/${this.id}/comments`, method: 'post',
                            headers: authHeader(), data: { "comment": {"body": this.comm} }})
                        .then(async () => { 
                            this.comments = await this.getComm()
                            this.comm = "" 
                        })
                        .catch(e => console.log(JSON.stringify(e)))
                }
            },
            getArticle() {
                if (this.logCheck !== undefined){
                    return axios({url: `http://localhost:3000/api/articles/${this.id}`, method: 'get', headers: authHeader()})
                        .then(response => { return response.data.article })
                        .catch(e => console.error(e))
                } else {
                    return axios.get(`http://localhost:3000/api/articles/${this.id}`)
                        .then(response => { 
                            return response.data.article;
                        })
                        .catch(e => console.error(e))
                }
            },
            getDate(date) {
				return new Date(date).toDateString()
            },
        },
        async mounted() {
            this.post = await this.getArticle()
            this.comments = await this.getComm()
            document.title = this.post.title
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
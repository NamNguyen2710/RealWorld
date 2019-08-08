<template lang="pug">
    .container
            .row
                .col-lg-9(class="col-sm-12" id="top")
                    ul.nav(class="nav-tabs")
                        li.nav-item
                            button.nav-link(class="active feed" @click="curPage=1; getArticles()") My Article
                        li.nav-item
                            router-link.nav-link(class="feed" :to="`/account/${this.id}/favorites`") Favorited Articles
                    artc(v-for="article in articles" :artc="article" :key="article.id")
                    .article(v-if="articles.length == 0") No article is here... yet
                    nav.article(aria-label="Page navigation")
                        ul.pagination
                            li.page-item( :class="{'disabled': curPage == 1}" )
                                router-link.page-link(
                                    to="/#top" aria-lable="Previous"
                                    @click.native="scrollTo('#top'); curPage--; getArticles()"
                                ) &laquo;
                            li.page-item(
                                v-for="num in pages" :key="num" class=""
                                :class="{'active': (num+1) == curPage}" 
                            )
                                router-link.page-link(
                                    to="/#top" @click.native="scrollTo('#top'); curPage=num+1; getArticles()"
                                ) {{num+1}}
                            li.page-item( :class="{'disabled': curPage == pages.length}" )
                                router-link.page-link(
                                    to="/#top" aria-lable="Next"
                                    @click.native="scrollTo('#top'); curPage++; getArticles()"
                                ) &raquo;
</template>

<script>
    import artc from '../components/Artc.vue';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { authHeader } from '../authHeader.js';

    export default {
        name: 'accountArtc',
        components: {
            artc
        },
        data() {
            return {
                articles: [],
                id: this.$route.params.id,
                pages: [],
                curPage: 1,
                logCheck: Cookies.getJSON('user')
            }
        },
        methods: {
            getArticles() {
                if (this.logCheck != undefined)
                    axios({url: 'http://localhost:3000/api/articles', method: 'get',
                        params: { author: this.id, limit: 10, offset: (this.curPage-1)*10},
                        headers: authHeader()})
                    .then(response => { 
                        this.articles = response.data.articles;
                        this.pages = [ ...Array(Math.ceil(response.data.articlesCount / 10)).keys() ];
                    })
                    .catch(e => { this.error.push(e) })
                else
                    axios({url: 'http://localhost:3000/api/articles', method: 'get',
                        params: { author: this.id, limit: 10, offset: (this.curPage-1)*10 }})
                    .then(response => { 
                        this.articles = response.data.articles;
                        this.pages = [ ...Array(Math.ceil(response.data.articlesCount / 10)).keys() ];
                    })
                    .catch(e => { this.error.push(e) })
            }
        },
        mounted() {
            this.getArticles()
        },
        watch: {
            '$route' () {
                this.getArticles()
            }
        }
    }
</script>
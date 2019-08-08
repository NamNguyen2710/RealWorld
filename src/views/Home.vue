<template lang="pug">
    div
        .jumbotron(class="jumbotron-fluid bg-success header")
            .container
                h1 conduit
                h4 A place to share your knowledge
        .container
            .row
                .col-lg-9(class="col-sm-12" id="top")
                    ul.nav(class="nav-tabs")
                        li.nav-item
                            button.nav-link(
                                v-if="logCheck" class="feed"
                                :class="{'active': curFeed == 1}"
                                @click="curPage=1; curFeed=1; getArticles()"
                            ) My Feed
                        li.nav-item
                            button.nav-link( 
                                :class="{'active': curFeed == 2}" class="feed"
                                @click="curPage=1; curFeed=2; getArticles()"
                            ) Global Feed
                        li.nav-item
                            button.nav-link(
                                v-if="curFeed == 3" class="feed"
                                :class="{'active': curFeed == 3}"
                                @click="getArticles(tagName)"
                            ) {{tagName}}
                    artc(v-for="article in articles" :artc="article" :key="article.id" v-on:changeTag="createTag")
                    .article(v-if="articles.length == 0") No article is here... yet
                    nav.article(aria-label="Page navigation")
                        ul.pagination
                            li.page-item( :class="{'disabled': curPage == 1}" )
                                router-link.page-link(
                                    to="/#top" aria-lable="Previous"
                                    @click.native="scrollTo('#top'); curPage--; getArticles()"
                                ) &laquo;
                            li.page-item(
                                v-for="num in pages" :key="num"
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
                .col-lg-3(class="col-sm-12 order-first order-lg-2")
                    .favbox
                        p(style="margin-bottom: 10px") Popular tags:
                        button.badge(
                            class="badge-pill badge-secondary"
                            v-for="tag in tagLs" :key="tag" @click="createTag(tag)"
                        ) {{tag}}
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import artc from '../components/Artc.vue';
    import axios from 'axios';
    import Cookies from 'js-cookie';
    import { authHeader} from '../authHeader.js';

    export default {
        data() {
            return {
                articles: [],
                tagLs: [],
                tagName: '',
                curFeed: 2,
                curPage: 1,
                pages: [],
                logCheck: Cookies.get('user'),
            }
        },
        name: 'home',
        components: { topbar, artc },
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
            },
            scrollTo: function (hashtag) {
                setTimeout(() => { location.href = hashtag }, 1)    
            }
        },
        mounted() {
            this.getArticles(),
            axios.get('http://localhost:3000/api/tags')
                .then(response => { this.tagLs = response.data.tags })
                .catch(e => { this.error.push(e) })
            document.title = "Home"
        }
    }
</script>
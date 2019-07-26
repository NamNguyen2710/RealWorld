<template>
    <div>
        <topbar :page="0"></topbar>
        <div class="head">
            <h1 style="color: white; font-family: sans-serif">{{ post.title }}</h1>
            <ufa :post="post" :page="true"></ufa>
            <button class="follow">+ Follow {{ post.author.username }}</button>
            <like :numb="post.favoritesCount" :favored="post.favorited" :optText="'Favorited Article '" style="float: none"></like>
        </div>
        <p style="padding: 20px; font-size: 18px">{{ post.body }}</p><br><br>
        <hr>
        <div style="position: relative; left: 33%; width: 500px; padding: 10px">
            <ufa :post="post" :page="false"></ufa>
            <button class="follow">+ Follow {{ post.author.username }}</button>
            <like :numb="post.favoritesCount" :favored="post.favorited" :optText="'Favorited Article '" style="float: none"></like>
        </div>
        <addcomm></addcomm>
        <comment v-for="comm in comments" :comm="comm" :key="comm.id"></comment>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import like from '../components/Like.vue';
    import ufa from '../components/UserForArtc.vue';
    import comment from '../components/Comments.vue';
    import addcomm from '../components/AddComment.vue';
    import axios from 'axios';

    export default {
        name: 'artcPage',
        data() {
            return {
                id: this.$route.params.id,
                post: {},
                comments: {}
            }
        },
        components: {
            topbar,
            like,
            ufa,
            comment,
            addcomm
        },
        methods: {
            getComment() {
                axios.get(`http://localhost:3000/api/articles/${this.id}/comments`)
                    .then(response => { this.comments = response.data.comments })
                    .catch(e => this.error.push(e))
            }
        },
        created() {
            axios.get(`http://localhost:3000/api/articles/${this.id}`)
                .then(response => { this.post = response.data.article })
                .catch(e => this.error.push(e))
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
</style>

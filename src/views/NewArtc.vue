<template>
    <div>
        <topbar :page="4"></topbar>
        <form style="margin-top: 40px">
            <input type="text" class="inputbox" style="height: 30px" placeholder="Article Title" v-model="title">
            <input type="text" class="inputbox" placeholder="What's this article about?" v-model="descript">
            <textarea class="inputbox" style="height: 100px" placeholder="Write your article (in markdown)" v-model="content"></textarea>
            <input type="text" class="inputbox" placeholder="Enter tags">
            <button @click="postArticle()">Publish Article</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader';

    export default {
        name: 'newartc',
        components: {
            topbar
        },
        data() {
            return {
                title: '',
                descript: '',
                content: '',
                taglist: []
            }
        },
        methods: {
            postArticle() {
                axios({method: 'post', url: 'http://localhost:3000/api/articles', headers: authHeader(),
                    data: {
                        "article": {
                            "title": this.title,
                            "description": this.descript,
                            "body": this.content,
                            "tagList": this.taglist
                        }
                    }
                })
                .then(response => { router.push(`/article/${response.data.slug}`) })
                .catch(e => console.log(JSON.stringify(e)));   
            }
        }
    }
</script>

<style scoped>
    .inputbox {
        width: 60%;
        margin: 8px;
        padding: 10px;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 4px;
        display: block;
        position: relative;
        left: 20%;
        font-family: arial; 
    }
    .inputbox:focus {
        outline-width: 0;
    }

    button { 
        padding: 15px; 
        position: relative; 
        left: 74%; 
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
    }
</style>
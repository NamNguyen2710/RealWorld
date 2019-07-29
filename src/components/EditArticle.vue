<template>
    <div>
        <form style="margin: 40px auto; width: 60%" v-on:submit.prevent>
            <input type="text" class="inputbox" style="height: 30px" placeholder="Article Title" v-model="title">
            <input type="text" class="inputbox" placeholder="What's this article about?" v-model="descript">
            <textarea class="inputbox" style="height: 100px" placeholder="Write your article (in markdown)" v-model="content"></textarea>
            <input type="text" class="inputbox" placeholder="Enter tags" v-model="tag" v-on:keyup.enter="addTag()">
            <div style="width: 100%; margin: 0 auto">
                <tags v-for="t in taglist" :key="t.id" :tagName="t" style="float:left"></tags>
            </div>
        </form>
        <div style="margin: 0 auto; width: 60%">
            <button @click="updArtc()">Publish Article</button>
        </div>
    </div>
</template>

<script>
    import tags from '../components/Tags.vue';
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader';

    export default {
        name: 'editArtc',
        components: {
            tags
        },
        data() {
            return {
                title: '',
                descript: '',
                content: '',
                taglist: [],
                tag: '',
                id: this.$route.params.id
            }
        },
        methods: {
            updArtc() {
                axios({url: `http://localhost:3000/api/articles/${this.id}`, method: 'put', headers: authHeader(),
                    data: {
                        "article": {
                            "title": this.title,
                            "description": this.descript,
                            "body": this.content
                        }
                    }
                })
                .then(response => { 
                    if (response.data)
                        router.push(`/article/${response.data.article.slug}`) 
                })
                .catch(e => console.log(JSON.stringify(e)))
            }
        },
        created() {
            axios.get(`http://localhost:3000/api/articles/${this.id}`)
                .then(response => { 
                    this.title = response.data.article.title;
                    this.descript =  response.data.article.description;
                    this.content = response.data.article.body;
                    this.taglist = response.data.article.tagList;
                })
                .catch(e => this.error.push(e));
        }
    }
</script>

<style scoped>
    .inputbox {
        width: 100%;
        margin: 8px 0;
        padding: 10px;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 4px;
        display: block;
        font-family: arial; 
    }

    button { 
        padding: 15px; 
        float:right;
        left: 10%;
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
    }
    button:hover {
        background: rgb(62, 158, 79);
    }
</style>

<template>
    <div>
        <ul class="error">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <form style="margin: 0 auto; width: 60%; margin-top: 40px" v-on:submit.prevent>
            <input ref="first" type="text" class="inputbox" style="height: 30px" placeholder="Article Title" v-model="title">
            <input type="text" class="inputbox" placeholder="What's this article about?" v-model="descript">
            <textarea class="inputbox" style="height: 100px" placeholder="Write your article (in markdown)" v-model="content"></textarea>
            <input type="text" class="inputbox" placeholder="Enter tags" v-model="tag" v-on:keyup.enter="addTag()">
        </form>
        <div style="width: 60%; margin: 0 auto" :key="upd">
            <tags v-for="t in taglist" :key="t.id" :tagName="t" style="float: none" v-on:changeTag=deleteTag></tags>
        </div>
        <div style="margin: 0 auto; width: 60%">
            <button @click="postArticle()">Publish Article</button>
        </div>
    </div>
</template>

<script>
    import tags from '../components/Tags.vue';
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader';

    export default {
        name: 'newartc',
        components: {
            tags
        },
        data() {
            return {
                title: '',
                descript: '',
                content: '',
                taglist: new Set,
                tag: '',
                errors: [],
                upd: 1
            }
        },
        methods: {
            postArticle() {
                if (this.title && this.descript && this.content)
                    axios({method: 'post', url: 'http://localhost:3000/api/articles', headers: authHeader(),
                        data: {
                            "article": {
                                "title": this.title,
                                "description": this.descript,
                                "body": this.content,
                                "tagList": Array.from(this.taglist)
                            }
                        }
                    })
                    .then(response => { 
                        if (response.data)
                            router.push(`/article/${response.data.article.slug}`) 
                    })
                    .catch(e => console.log(JSON.stringify(e)))
                else {
                    this.errors = []
                    if (!this.title) { this.errors.push("Title cannot be empty") }
                    if (!this.descript) { this.errors.push("Description cannot be empty") }
                    if (!this.body) { this.errors.push("Body cannot be empty")}
                }
            },
            addTag() {
                this.taglist.add(this.tag);
                this.upd = -this.upd;
                this.tag = "";
            },
            deleteTag(value) {
                this.taglist.delete(value);
                this.upd = -this.upd;
            }
        },
        mounted() {    
            this.$refs.first.focus()
        }
    }
</script>

<style scoped>
    .inputbox {
        width: calc(100% - 20px);
        margin: 8px 0;
        padding: 10px;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 4px;
        display: block;
        font-family: arial; 
    }

    button { 
        padding: 15px;
        float: right;
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
    }
    button:hover {
        background: rgb(62, 158, 79);
    }
</style>
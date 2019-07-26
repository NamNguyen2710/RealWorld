<template>
    <div>
        <topbar :page="4"></topbar>
        <form style="margin: 40px auto; width: 60%" v-on:submit.prevent>
            <input type="text" class="inputbox" style="height: 30px" placeholder="Article Title" v-model="title">
            <input type="text" class="inputbox" placeholder="What's this article about?" v-model="descript">
            <textarea class="inputbox" style="height: 100px" placeholder="Write your article (in markdown)" v-model="content"></textarea>
            <input type="text" class="inputbox" placeholder="Enter tags" v-model="tag" v-on:keyup.enter="addTag()">
            <div style="width: 100%; margin: 0 auto">
                <tags v-for="t in taglist" :key="t.id" :tagName="t" style="display:inline-block; float:left"></tags>
            </div>
            <br>
            <button @click="postArticle()">Publish Article</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import tags from '../components/Tags.vue';
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader';

    export default {
        name: 'newartc',
        components: {
            topbar,
            tags
        },
        data() {
            return {
                title: '',
                descript: '',
                content: '',
                taglist: new Set(),
                tag: ''
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
                                "tagList": this.taglist
                            }
                        }
                    })
                    .then(response => { 
                        if (response.data)
                            router.push(`/article/${response.data.slug}`) 
                    })
                    .catch(e => console.log(JSON.stringify(e)));   
            },
            addTag() {
                this.taglist.add(this.tag);
                this.tag = "";
            }
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
    .inputbox:focus {
        outline-width: 0;
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
    button:focus {
        outline-width: 0;
    }
</style>
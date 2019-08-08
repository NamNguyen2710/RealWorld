<template lang="pug">
    .container(style="margin-top:40px")
        .row
            .col-lg-8(class="col-sm-12 offset-lg-2")
                ul.text-danger
                    li(v-for="error in errors" :key="error") {{error}}
                form(method="post" @submit.prevent)
                    .form-group
                        input.form-control(
                            type="text" class="form-control-lg" 
                            placeholder="Article Title" v-model="title")
                    .form-group
                        input.form-control(
                            type="text" class="form-control-lg" 
                            placeholder="What's this article about?" v-model="descript")
                    .form-group
                        textarea.form-control(
                            type="text" class="form-control-lg" style="min-height: 180px"
                            placeholder="Write your article (in markdown)" v-model="content")
                    .form-group
                        input.form-control(
                            type="text" placeholder="Enter for tags" 
                            v-model="tag" v-on:keyup.enter="addTag")
                div(:key="upd")
                    button.badge(
                        class="badge-pill badge-secondary"
                        v-for="tag in taglist" :key="tag" @click="deleteTag(tag)"
                    ) {{tag}} 
                        i.fas(class="fa-times")
                button.btn(type="submit" class="btn-success float-right" @click="postArticle") Publish Article
</template>

<script>
    import axios from 'axios';
    import router from '../router.js';
    import { authHeader } from '../authHeader';

    export default {
        name: 'newartc',
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
            // this.$refs.first.focus()
        }
    }
</script>
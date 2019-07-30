<template>
    <table>
        <tr style="padding: 0">
            <td style="padding: 0; height: 100px">
                <textarea placeholder="Write a comment..." v-model="comment"></textarea>
            </td>
        </tr>
        <tr>
            <td class="author">
                <button @click="postArticle()">Post comment</button>
            </td>
        </tr>
    </table>
</template>

<script>
    import axios from 'axios';
    import { authHeader } from '../authHeader.js';

    export default {
        name: 'addcomm',
        props: {
            id: ""
        },
        data() {
            return {
                comment: ""
            }
        },
        methods: {
            postArticle() {
                if (this.comment)
                    axios({url: `http://localhost:3000/api/articles/${this.id}/comments`, method: 'post',
                            headers: authHeader(), data: { "comment": {"body": this.comment} }})
                        .then(response => { 
                            this.$emit('addComment');
                            this.comment = "";
                        })
                        .catch(e => console.log(JSON.stringify(e)))
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%;
        border: 1px solid rgb(206, 206, 206);
        border-radius: 3px;
        padding: 0;
        margin: 0 auto;
        margin-top: 30px;
    }
    .author {
        border-top: 1px solid rgb(206, 206, 206); 
        padding: 10px; 
        background: rgb(236, 236, 236);
    }

    button {
        border: none;
        background: rgb(118, 201, 118);
        color: white;
        float: right;
        padding: 5px;
        border-radius: 3px;
    }
    button:hover {
        background: rgb(120, 185, 120);
    }

    textarea {
        width: calc(100% - 20px);
        min-height: 100px;
        border: none;
        margin: 0;
        padding: 10px;
        position: relative;
        top: 4px;
        resize: vertical;
    }
</style>

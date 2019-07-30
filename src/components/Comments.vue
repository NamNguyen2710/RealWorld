<template>
    <table align="center">
        <tr>
            <td style="padding: 25px">
                {{ comm.body }}
            </td>
        </tr>
        <tr>
            <td class="author">
                <utag :post="comm" :page="false" ></utag>
                <button v-if="checkLogin()" @click="deleteComm()">X</button>
            </td>
        </tr>
    </table>
</template>

<script>
    import utag from '../components/UserTag.vue';
    import axios from 'axios';
    import { authHeader } from '../authHeader.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'comment',
        props: {
            comm: {},
            id: {},
            logCheck: Cookies.get('user')
        },
        components: {
            utag
        },
        methods: {
            checkLogin() {
                if (this.logCheck && this.comm.author.username == JSON.parse(this.logCheck).username)
                    return true
                else
                    return false
            },
            deleteComm() {
                axios({url: `http://localhost:3000/api/articles/${this.id}/comments/${this.comm.id}`, method: 'delete', headers: authHeader()})
                    .then( resposnse => { this.$emit('updComm') })
                    .catch(e => console.log(e))
            }
        }
    }
</script>

<style scoped>
    table {
        width: 100%; 
        border: 1px solid rgb(206, 206, 206);
        border-radius: 3px;
        margin: 5px auto;
    }
    .author {
        border-top: 1px solid rgb(206, 206, 206); 
        padding: 10px 10px 0 10px; 
        background: rgb(236, 236, 236);
    }

    button {
        border: 0;
        background: none;
        font-weight: bold;
        color: gray;
        float: right;
    }
    button:hover {
        color: black;
    }
</style>
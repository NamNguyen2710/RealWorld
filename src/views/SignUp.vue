<template>
    <div>
        <topbar :page="3"></topbar>
        <p class="heading">Sign up</p>
        <router-link to="/signin" class="link">Have an account?</router-link>
        <form style="text-align: center" v-on:submit.prevent>
            <input type="text" class="inputbox" placeholder="Username" v-model="user"><br>
            <input type="email" class="inputbox" placeholder="Email" v-model="email"><br>
            <input type="text" class="inputbox" placeholder="Password" v-model="pass"><br>
            <button @click="signUp()">Sign up</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import router from '../router.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'signup',
        components: {
            topbar
        },
        data() {
            return {
                user:'',
                email: '',
                pass: ''
            }
        },
        methods: {
            signUp() {
                axios.post('http://localhost:3000/api/users', { 
                    "user":{
                        "username": this.user,
                        "email": this.email,
                        "password": this.pass
                    }
                })
                .then(response => { 
                    Cookies.set('user', response.data.user);
                    router.push('/'); 
                })
                .catch(e => { console.log(JSON.stringify(e)) });
            }
        }
    }
</script>

<style scoped>
    .heading {
        font-size: 40px;
        font-family: tahoma; 
        text-align: center; 
        margin: 20px;
    }

    .link { 
        color:rgb(118, 201, 118);
        text-decoration: none;
        display: block;
        text-align: center;
        font-family: tahoma;
    }
    .link:hover {
        text-decoration: underline; 
        color: rgb(100, 170, 100);
    }

    .inputbox {
        width: 400px;
        height: 25px;
        margin: 8px;
        padding: 10px;
        border-radius: 7px;
        border: 1px solid rgb(196, 196, 196);
    }

    button {
        width: 100px; 
        padding: 10px; 
        position: relative; 
        left: 160px; 
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
    }
    button:hover {
        background-color: rgb(83, 168, 83);
    }
</style>

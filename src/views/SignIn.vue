<template>
    <div>
        <topbar :page="2"></topbar>
        <p class="heading">Sign in</p>
        <router-link to="/signup" class="link">Need an account?</router-link>
        <ul class="error">
            <li v-for="error in errors" :key="error"> {{error}} </li>
        </ul>
        <form style="text-align: center" v-on:submit.prevent>
           <input ref="first" type="email" class="inputbox" placeholder="Email" v-model="user"><br>
           <input type="password" class="inputbox" placeholder="Password" v-model="pass" v-on:keyup.enter="login()"><br>
           <button @click="login()">Sign in</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import router from '../router.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'signin',
        components: {
            topbar
        },
        data() {
            return {
                user: '',
                pass: '',
                errors: []
            }
        },
        methods: {
            login() {
                this.errors = []
                if (this.user && this.pass)
                    axios({url: `http://localhost:3000/api/users/login`, method: 'post', data: {
                        "user": {
                            "email": this.user,
                            "password": this.pass
                        }
                    }})
                    .then(response => {
                        Cookies.set('user', response.data.user);
                        router.push('/');
                    })
                    .catch(e => console.log((e)))
                else {
                    if (!this.user) this.errors.push("Email cannot be empty")
                    if (!this.pass) this.errors.push("Password cannot be empty")
                }
            }
        },
        mounted() {    
            this.$refs.first.focus()
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

    .error {
        width: 300px;
        color: rgb(180, 20, 20);
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: 0 auto;
        margin-top: 10px;
    }

    .inputbox {
        width: 400px;
        height: 25px;
        margin: 15px;
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
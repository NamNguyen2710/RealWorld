<template>
    <div>
        <topbar :page="5"></topbar>
        <h1 class="heading">Your Settings</h1>
        <ul class="error">
            <li v-for="error in errors" :key="error">{{ error }}</li>
        </ul>
        <form style="margin: 30px auto; width: 40%" v-on:submit.prevent v-on:keyup.enter="updCurUser()">
            <input ref="first" type="text" class="inputbox" style="height: 30px" placeholder="URL of profile picture" v-model="image">
            <input type="text" class="inputbox" placeholder="Username" v-model="username">
            <textarea class="inputbox" style="height: 100px" placeholder="Short bio about you" v-model="bio"></textarea>
            <input type="email" class="inputbox" placeholder="Email" v-model="email">
            <input type="password" class="inputbox" placeholder="New Password" v-model="pass">
            <button class="submit" @click="updCurUser()">Update Settings</button>
            <hr style="clear: both; width: 80%; margin: 0 auto">
            <button class="logout" @click="logout()">Or click here to log out</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import { authHeader } from '../authHeader';
    import Cookies from 'js-cookie';
    import router from '../router.js';

    export default {
        name: 'setting',
        components: {
            topbar
        },
        data() {
            return {
                email: "",
                pass: "",
                username: "",
                bio: "",
                image: "",
                errors: []
            }
        },
        methods: {
            updCurUser() {
                if (!(this.email && this.username && (this.username.length <= 20))) {
                    this.errors = []
                    if (!this.email) { this.errors.push("Email cannot be empty") }
                    if (this.username.length > 20) { this.errors.push("Username cannot be over 20 characters") }
                    if (!this.username) { this.errors.push("Username cannot be empty") }
                }
                else {
                    const updData = {'bio': this.bio, 
                                    'image': this.image,
                                    'email': this.email,
                                    'username': this.username};
                    if (this.pass) { updData['password'] = this.pass }
                    axios({url: 'http://localhost:3000/api/user', method: 'put', headers: authHeader(), data: { "user": updData }})
                        .then(response => {
                            Cookies.set('user', response.data.user);
                            router.push(`/account/${response.data.user.username}`); 
                        })
                        .catch(e => console.log(e))
                }
            },
            logout() {
                Cookies.remove('user');
                router.push('/');
            }
        },
        created() {
            axios({url: 'http://localhost:3000/api/user', method: 'get', headers: authHeader()})
                .then(response => { 
                    const user = response.data.user;
                    this.email = user.email;
                    this.username = user.username;
                    this.bio = user.bio;
                    this.image = user.image;
                })
                .catch(e => console.log(JSON.stringify(e)))
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
        font-weight: normal;
    }

    .error {
        color: rgb(167, 45, 45);
        font-family: Verdana, Geneva, Tahoma, sans-serif;
        margin: 10px auto;
        width: 400px;
    }

    .inputbox {
        width: 95%;
        margin: 8px;
        padding: 10px;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 4px;
        display: block;
        position: relative;
        font-family: arial; 
    }
    .inputbox:focus {
        outline-width: 10px;
    }

    .submit { 
        padding: 15px;
        float: right;
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
        margin-bottom: 10px;
    }
    .submit:hover {
        background-color: rgb(83, 168, 83);
    }

    .logout {
        padding: 7px 10px;
        background: none;
        color: rgb(179, 91, 91); 
        border-radius: 7px; 
        border: 1px solid rgb(179, 91, 91);
        margin: 20px;
    }
    .logout:hover {
        background-color: rgb(179, 91, 91);
        color: white;
    }
</style>
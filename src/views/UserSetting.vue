<template>
    <div>
        <topbar :page="5"></topbar>
        <h1 class="heading">Your Settings</h1>
        <form style="margin: 40px auto; width: 40%" v-on:submit.prevent v-on:keyup.enter="updCurUser()">
            <input type="text" class="inputbox" style="height: 30px" placeholder="URL of profile picture" v-model="image">
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
                image: ""
            }
        },
        methods: {
            updCurUser() {
                const updData = {'bio': this.bio, 'image': this.image};
                if (this.email) { updData['email'] = this.email }
                if (this.pass) { updData['password'] = this.pass }
                if (this.username) { updData['username'] = this.username }

                axios({url: 'http://localhost:3000/api/user', method: 'put', headers: authHeader(), data: { "user": updData }})
                    .then(response => {
                        Cookies.set('user', response.data.user);
                        router.push(`/account/${response.data.user.username}`); 
                    })
                    .catch(e => console.log(e));
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
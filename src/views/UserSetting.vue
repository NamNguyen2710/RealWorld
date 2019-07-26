<template>
    <div>
        <topbar :page="5"></topbar> 
        <p>{{ authHeader() }}</p>
        <h1 class="heading">Your Settings</h1>
        <form style="margin: 0 auto; margin-top: 40px">
            <input type="text" class="inputbox" style="height: 30px" placeholder="URL of profile picture" v-model="image">
            <input type="text" class="inputbox" placeholder="Username" v-model="username">
            <textarea class="inputbox" style="height: 100px" placeholder="Short bio about you" v-model="bio"></textarea>
            <input type="email" class="inputbox" placeholder="Email">
            <input type="text" class="inputbox" placeholder="New Password">
            <button class="submit" @click="updCurUser()">Update Settings</button>
            <button class="" @click="logout()">Or click here to log out</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import { authHeader } from '../authHeader';

    export default {
        name: 'setting',
        components: {
            topbar
        },
        data() {
            return {
                user: {
                    "email": "",
                    "token": "",
                    "username": "",
                    "bio": "",
                    "image": ""
                }
            }
        },
        methods: {
            updCurUser() {
                axios({url: 'http://localhost:3000/api/user', method: 'put', header: authHeader(), data: { user: this.user } })
                    .then(response => { 
                        const parsed = JSON.stringify(response.data.user);
                        localStorage.setItem('user', this.parsed);
                        router.push(`/account/${response.data.user.username}`); 
                    })
                    .catch(e => console.log(e));
            },
            logout() {
                localStorage.removeItem('user');
            },
            authHeader() { authHeader()}
        },
        created() {
            axios({url: 'http://localhost:3000/api/user', method: 'get', headers: authHeader()})
                .then(response => { this.user = response.data.user })
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
    }

    .inputbox {
        width: 60%;
        margin: 8px;
        padding: 10px;
        border: 1px solid rgb(189, 188, 188);
        border-radius: 4px;
        display: block;
        position: relative;
        left: 20%;
        font-family: arial; 
    }
    .inputbox:focus {
        outline-width: 0;
    }

    .submit { 
        padding: 15px; 
        position: relative; 
        left: 74%; 
        background: rgb(118, 201, 118);
        color: white; 
        border-radius: 7px; 
        border: hidden;
    }
</style>
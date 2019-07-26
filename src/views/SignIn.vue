<template>
    <div>
        <topbar :page="2"></topbar>
        <p class="heading">Sign in</p>
        <router-link to="/signup" class="link">Need an account?</router-link>
        <form style="text-align: center">
           <input type="email" class="inputbox" placeholder="Email" v-model="user"><br>
           <input type="text" class="inputbox" placeholder="Password" v-model="pass"><br>
           <button @click="login()">Sign in</button>
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';
    import axios from 'axios';
    import router from '../router.js';

    export default {
        name: 'signin',
        components: {
            topbar
        },
        data() {
            return {
                user: '',
                pass: ''
            }
        },
        methods: {
            login() {
                axios.post(`http://localhost:3000/api/users/login`, {
                    "user": {
                        "email": this.user,
                        "password": this.pass
                    }
                })
                .then(response => { 
                    const parsed = JSON.stringify(response.data.user);
                    localStorage.setItem('user', this.parsed);
                    router.push('/');
                })
                .catch(e => this.error.push(e));
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
        margin: 15px;
        padding: 10px;
        border-radius: 7px;
    }
    .inputbox:focus {
        outline-width: 0;
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
</style>
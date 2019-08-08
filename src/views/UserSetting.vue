<template lang="pug">
    .container
        .col-md-6(class="col-sm-12 offset-md-3" style="text-align:center")
            h1 Your settings
            ul.text-danger(style="text-align: left; margin: 5px")
                li(v-for="error in errors" :key="error") {{error}}
            form(
                method="post" @submit.prevent="updCurUser" 
                style="margin: 30px 0; border-bottom: 1px solid rgb(201, 201, 201)"
            )
                .form-group
                    input.form-control(
                        type="text" placeholder="URL of profile picture" 
                        v-model="image")
                .form-group
                    input.form-control(
                        type="text" class="form-control-lg" 
                        placeholder="Username" v-model="username")
                .form-group
                    textarea.form-control(
                        type="password" class="form-control-lg"
                        placeholder="Short bio about you" v-model="bio")
                .form-group
                    input.form-control(
                        type="email" class="form-control-lg" 
                        placeholder="Email" v-model="email")            
                .form-group
                    input.form-control(
                        type="password" class="form-control-lg" 
                        placeholder="Password" v-model="pass")
                button.btn(
                    type="submit" class="btn-success float-right" 
                    style="margin-bottom: 15px"
                ) Update settings
                div(style="clear: both")
            button.btn(class="logout float-left" @click="logout") Or click here to log out
</template>

<script>
    import axios from 'axios';
    import { authHeader } from '../authHeader';
    import Cookies from 'js-cookie';
    import router from '../router.js';

    export default {
        name: 'setting',
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
        mounted() {
            axios({url: 'http://localhost:3000/api/user', method: 'get', headers: authHeader()})
                .then(response => { 
                    const user = response.data.user;
                    this.email = user.email;
                    this.username = user.username;
                    this.bio = user.bio;
                    this.image = user.image;
                })
                .catch(e => console.log(JSON.stringify(e)))
            document.title = "Settings"
            // this.$refs.first.focus()
        }
    }
</script>
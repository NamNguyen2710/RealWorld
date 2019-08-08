<template lang="pug">
    .container
        .col-md-4(class="col-sm-12 offset-md-4" style="text-align:center")
            h1 Sign in
            router-link.text-success(to="/signup") Need and account?
            ul.text-danger(style="text-align: left; margin: 5px")
                li(v-for="error in errors" :key="error") {{error}}
            form(method="post" @submit.prevent="login" style="margin-top: 15px")
                .form-group
                    input.form-control(
                        type="email" class="form-control-lg" 
                        placeholder="Email" v-model="user")
                .form-group
                    input.form-control(
                        type="password" class="form-control-lg" 
                        placeholder="Password" v-model="pass")
                button.btn(type="submit" class="btn-success") Sign in
</template>

<script>
    import axios from 'axios';
    import router from '../router.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'signin',
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
            // this.$refs.first.focus()
            document.title = "Sign In"
        }
    }
</script>
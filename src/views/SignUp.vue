<template lang="pug">
    .container
        .col-md-4(class="col-sm-12 offset-md-4" style="text-align:center")
            h1 Sign up
            router-link.text-success(to="/signin") Have an account?
            ul.text-danger(style="text-align: left; margin: 5px")
                li(v-for="error in errors" :key="error") {{error}}
            form(method="post" @submit.prevent="signUp" style="margin-top: 15px")
                .form-group
                    input.form-control(
                        type="text" class="form-control-lg" 
                        placeholder="Username" v-model="user")
                .form-group
                    input.form-control(
                        type="email" class="form-control-lg" 
                        placeholder="Email" v-model="email")
                .form-group
                    input.form-control(
                        type="password" class="form-control-lg" 
                        placeholder="Password" v-model="pass")
                button.btn(type="submit" class="btn-success") Sign up
</template>

<script>
    import axios from 'axios';
    import router from '../router.js';
    import Cookies from 'js-cookie';

    export default {
        name: 'signup',
        data() {
            return {
                user:'',
                email: '',
                pass: '',
                errors: []
            }
        },
        methods: {
            signUp() {
                this.errors = []
                if (this.user && this.email && this.pass && (this.user.length <= 20))
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
                    .catch(e => { console.log(JSON.stringify(e)) })
                else {
                    if (!this.user) this.errors.push("Username cannot be empty")
                    if (!this.email) this.errors.push("Email cannot be empty")
                    if (!this.pass) this.errors.push("Password cannot be empty")
                    if (this.user.length > 20) this.errors.push("Username cannot be over 20 characters")
                }
            }
        },
        mounted() {    
            // this.$refs.first.focus()
            document.title = "Sign Up"
        }
    }
</script>
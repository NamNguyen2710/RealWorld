<template>
    <nav>
        <ul class="component" style="background-color: white; list-style-type: none; overflow: hidden; margin: 0">
            <li style="float: left">
                <router-link to="/" style="color: rgb(118, 201, 118); ">
                    <b>conduit</b></router-link>
            </li>
            <!-- <template v-if="authHeader()"> -->
                <!-- <li><router-link :to="`/account/${user.username}`" :class="{'black':page === 6}">{{ user.username }}</router-link></li>
                <li><router-link to="/settings" :class="{'black':page === 5}">Settings</router-link></li>
                <li><router-link to="/editor" :class="{'black':page === 4}">New Article</router-link></li>
            </template> -->
            <template v-if="authHeader()">
                <li><router-link to="/signup" :class="{'black':page === 3}">Sign up</router-link></li>
                <li><router-link to="/signin" :class="{'black':page === 2}">Sign in</router-link></li>
                <li><router-link to="/" :class="{'black':page === 1}">Home</router-link></li>
            </template>
        </ul>
    </nav>
</template>

<script>
    import { authHeader } from '../authHeader.js';

    export default {
        name: 'topbar',
        props: {
            page: Number
        },
        data() {
            return {
                user: JSON.parse(localStorage.getItem('user'))
            }
        },
        methods: {
            authHeader() {
                return authHeader();
            }
        }
    }
</script>
    
<style scoped>
    li { float: right }
    li a {
        color: rgb(200, 200, 200);
        text-align: center;
        padding: 10px;
        display: block;
        text-decoration: none;
        font-family: tahoma;
    }
    .black { color: black }
</style>

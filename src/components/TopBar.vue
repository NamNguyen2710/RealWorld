<template>
    <nav style="background-color: white; position: fixed; width: 100%; left: 0; top: 0; z-index: 10">
        <ul class="component" style="list-style-type: none; margin: 0 auto; width: 80%">
            <li style="float: left">
                <a href="/" style="color: rgb(118, 201, 118); ">
                    <b>conduit</b></a>
            </li>
            <template v-if="user">
                <li><a href="/" @click="logout">Log out</a></li>
                <li><a :href="`/account/${JSON.parse(user).username}`" :class="{'black':page === 6}">{{ JSON.parse(user).username }}</a></li>
                <li><a href="/settings" :class="{'black':page === 5}">Settings</a></li>
                <li><a href="/editor" :class="{'black':page === 4}">New Article</a></li>
            </template>
            <template v-else>
                <li><a href="/signup" :class="{'black':page === 3}">Sign up</a></li>
                <li><a href="/signin" :class="{'black':page === 2}">Sign in</a></li>
            </template>
            <li><a href="/" :class="{'black':page === 1}">Home</a></li>
        </ul>
    </nav>
</template>

<script>
    import Cookies from 'js-cookie';

    export default {
        name: 'topbar',
        props: {
            page: Number
        },
        data() {
            return {
                user: Cookies.get('user')
            }
        },
        methods: {
            logout(){
                Cookies.remove('user')
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
        font-weight:500;
    }
    .black { color: black }
</style>

<template>
    <nav>
        <ul class="component" style="background-color: white; list-style-type: none; overflow: hidden;">
            <li style="float: left">
                <router-link to="/" style="color: rgb(118, 201, 118); ">
                    <b>conduit</b></router-link>
            </li>
            <li><router-link to="/signup" :class="{'black':page === 3}">Sign up</router-link></li>
            <li><router-link to="/signin" :class="{'black':page === 2}">Sign in</router-link></li>
            <li><router-link to="/" :class="{'black':page === 1}">Home</router-link></li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: 'topbar',
        props: {
            page: Number
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

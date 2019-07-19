<template>
    <ul class="component" style="background-color: white; list-style-type: none; overflow: hidden;">
		<li style="float: left">
            <a href="index.html" style="color: rgb(118, 201, 118); ">
                <b>conduit</b>
            </a>
        </li>
		<li><a href="signup.html" :class="{'black':page === 3}">Sign up</a></li>
		<li><a href="signin.html" :class="{'black':page === 2}">Sign in</a></li>
		<li><a href="index.html" :class="{'black':page === 1}">Home</a></li>
	</ul>
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

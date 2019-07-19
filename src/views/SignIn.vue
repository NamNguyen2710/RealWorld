<template>
    <div>
        <topbar :page="2"></topbar>
        <p class="heading">Sign in</p>
        <router-link to="/signup" class="link">Need an account?</router-link>
        <form style="text-align: center">
           <input type="email" class="inputbox" name="email" placeholder="Email"><br>
           <input type="text" class="inputbox" name="pass" placeholder="Password"><br>
           <input type="submit" class="button" value="Sign in">
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar.vue';

    export default {
        name: 'signin',
        components: {
            topbar
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
</style>
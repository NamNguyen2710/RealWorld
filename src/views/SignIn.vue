<template>
    <div>
        <topbar :page="2"></topbar>
        <p class="heading">Sign in</p>
        <a href="signup.html" class="link">Need an account?</a>
        <form style="text-align: center">
           <input type="email" class="inputbox" name="email" placeholder="Email"><br>
           <input type="text" class="inputbox" name="pass" placeholder="Password"><br>
           <input type="submit" class="button" value="Sign in">
        </form>
    </div>
</template>

<script>
    import topbar from '../components/TopBar'

    export default {
        name: 'signin',
    }
</script>

<style scoped>
    .heading {
        font-size: 40px;
        font-family: tahoma; 
        text-align: center; 
        margin: 20px;
    }
</style>
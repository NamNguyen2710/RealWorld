<template lang="pug">
    nav.navbar(class="navbar-expand-md navbar-light bg-white fixed-top")
        .container
            router-link.navbar-brand(to="/") conduit
            button.navbar-toggler(type="button" data-toggle="collapse" data-target="#menu" aria-controls="menu" aria-expended="false")
                span.navbar-toggler-icon
            .collapse(class="navbar-collapse" id="menu" :key="user")
                ul.nav(v-if="user" class="navbar-nav")
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/" exact) Home
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/editor" exact) 
                            i.fas(class="fa-edit")
                            span  New article
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/settings" exact) 
                            i.fas(class="fa-cog")
                            span  Setting
                    li.nav-item
                        router-link.nav-link(active-class="active" :to="`/account/${JSON.parse(user).username}`") {{JSON.parse(user).username}}
                ul.nav(v-else class="navbar-nav")
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/" exact) Home
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/signin" exact) Sign in
                    li.nav-item
                        router-link.nav-link(active-class="active" to="/signup" exact) Sign up
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
        },
        watch: {
            '$route' () {
                this.user = Cookies.get('user')
            }
        }
    }
</script>
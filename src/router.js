import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/SignIn.vue'
import Signup from './views/SignUp.vue'
import artcPage from './views/ArticlePage.vue'
import account from './views/Account.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/article/:id', component: artcPage },
    { path: '/account/:id', component: account }
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/SignIn.vue'
import Signup from './views/SignUp.vue'
import artcPage from './views/ArticlePage.vue'
import account from './views/Account.vue'
import accFav from './views/AccountFav.vue'
import newArtc from './views/NewArtc.vue'
import userSet from './views/UserSetting.vue'

Vue.use(Router)

export default new Router({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/signin', component: Signin, name: 'signin' },
    { path: '/signup', component: Signup, name: 'signup' },
    { path: '/article/:id', component: artcPage },
    { path: '/account/:id', component: account },
    { path: '/account/:id/favorites', component: accFav },
    { path: '/editor', component: newArtc},
    { path: '/settings', component: userSet}
  ]
})

import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Signin from './views/SignIn.vue'
import Signup from './views/SignUp.vue'
import artcPage from './views/ArticlePage.vue'
import account from './views/Account.vue'
import accArtc from './components/AccountArticle.vue'
import accFav from './components/AccountFav.vue'
import editor from './views/Editor.vue'
import newArtc from './components/NewArtc.vue'
import editArtc from './components/EditArticle.vue'
import userSet from './views/UserSetting.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Home },
    { path: '/signin', component: Signin },
    { path: '/signup', component: Signup },
    { path: '/article/:id', component: artcPage },
    { path: '/account/:id', component: account,
      children: [
        { path: '', component: accArtc},
        { path: 'favorites', component: accFav}
      ]
    },
    { path: '/editor', component: editor,
      children: [
        { path: '', component: newArtc },
        { path: ':id', component: editArtc}
      ]
    },
    { path: '/settings', component: userSet}
  ]
})

import Cookies from 'js-cookie'
import router from './router.js'

export function authHeader() {
    let user = Cookies.getJSON('user');

    if (user == "undefined") {
        router.push('/signin')
    }
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    }
}
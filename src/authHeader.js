import Cookies from 'js-cookie'
import router from './router.js'

export function authHeader() {
    let parsed = Cookies.get('user');
    let user = {};

    if (parsed && parsed != "undefined")
        user = JSON.parse(parsed)
    else router.push('/signin');
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return null;
    }
}
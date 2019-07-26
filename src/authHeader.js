import Cookies from 'js-cookie'

export function authHeader() {
    let parsed = Cookies.get('user');
    let user = {};

    if (parsed && parsed != "undefined")
        user = JSON.parse(parsed)
    else user = {};
    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return null;
    }
}
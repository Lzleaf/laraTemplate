
export const TOKEN_KEY = 'login_access_token'

export const setToken = (token_name, token) => {
    window.localStorage.setItem(token_name,token);
}

export const getToken = (token_name) => {
    return window.localStorage.getItem(token_name)
}

export const removeToken = (token_name) => {
    console.log(token_name)
    window.localStorage.removeItem(token_name)
}
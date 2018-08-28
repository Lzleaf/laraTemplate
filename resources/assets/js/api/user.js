import axios from './../libs/api.request'

export const login = ({ userName, password }) => {
    const data = {
        email: userName,
        password: password
    }

    return axios.request({
        url: 'login',
        data,
        method: 'post',
    })
}

export const getUserInfo = (token) => {
    return axios.request({
        url: 'user_info',
        method: 'get'
    })
}

export const logout = (token) => {
    return axios.request({
        url: 'logout',
        method: 'post'
    })
}

export const refresh = () => {
    return axios.request({
        url: 'refresh',
        method: 'post'
    })
}

import {login, logout, getUserInfo} from './../../api/user'
import {setToken, getToken, removeToken} from './../../libs/ls'

export const ACCESS_TOKEN_KEY = 'login_access_token'

export default {
    state: {
        access_token: getToken(ACCESS_TOKEN_KEY),
        user: {
            avatar: '',
            userName: '',
            userId: '',
            access: ''
        }
    },

    mutations: {
        setToken(state, {name, token}) {
            state.$name = token
            setToken(name, token)
        },
        removeToken(name) {
            removeToken(name)
        },
        setUser(state, user) {
            state.user = user
        }
    },

    actions: {
        //用户登录
        handleLogin({commit}, {userName, password}) {
            userName = userName.trim()

            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    const data = res.data
                    commit('setToken', {name: ACCESS_TOKEN_KEY, token: data.access_token})
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout(state.access_token).then(() => {
                    commit('setToken', {name: ACCESS_TOKEN_KEY, token: ''})
                    state.user.access = ''
                    commit('setUser', state.user)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
                // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
                // commit('setToken', '')
                // commit('setAccess', [])
                // resolve()
            })
        },
        //获取用户信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.access_token).then(res => {
                    const data = res.data
                    commit('setUser', data.user)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
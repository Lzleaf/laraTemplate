import {login, logout, getUserInfo, refresh} from './../../api/user'
import {setToken, getToken, removeToken} from './../../libs/ls'

export const ACCESS_TOKEN_KEY = 'login_access_token'

export default {
    state: {
        access_token: getToken(ACCESS_TOKEN_KEY),
        user: {
            avatar: 'https://file.iviewui.com/dist/a0e88e83800f138b94d2414621bd9704.png',
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
                    if(res){
                        this.dispatch('loginSuccess', res)
                    }
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        loginSuccess({commit}, res) {
            const data = res.data
            commit('setToken', {name: ACCESS_TOKEN_KEY, token: data.access_token})
        },

        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout(state.access_token).then(() => {
                    this.dispatch('logoutSuccess')
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },

        logoutSuccess({state, commit}) {
            commit('setToken', {name: ACCESS_TOKEN_KEY, token: ''})
            state.user.access = ''
            commit('setUser', state.user)
        },

        //获取用户信息
        getUserInfo({state, commit}) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.access_token).then(res => {
                    const data = res.data
                    commit('setUser', data)
                    resolve(data)
                }).catch(err => {
                    console.log(err)
                    reject(err)
                })
            })
        },

        handleRefresh({state, commit}) {
            return new Promise((resolve, reject) => {
                refresh().then(res => {
                    this.dispatch('loginSuccess', res)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }

    }
}
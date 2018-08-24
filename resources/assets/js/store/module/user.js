import {login, logout, getUserInfo} from './../../api/user'
import {setToken, getToken} from './../../libs/util'

export default {
    state: {
        token: getToken(),
        user: {
            avatar: '',
            userName: '',
            userId: '',
            access: ''
        }
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setUser(state, user) {
            state.user = user
        }
    },

    actions: {
        //用户登录
        handleLogin({commit}, {userName, password}) {
            userName = userName.trim()
            console.log(userName)
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    const data = res.data
                    commit('setToken', data.token)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        },
        // 退出登录
        handleLogOut({state, commit}) {
            return new Promise((resolve, reject) => {
                logout(state.token).then(() => {
                    commit('setToken', '')
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
            console.log(123)
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
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
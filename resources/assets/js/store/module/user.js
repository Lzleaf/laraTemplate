import { login, logout, getUserInfo } from './../../api/user'
import { setToken, getToken} from './../../libs/util'

export default {
    state: {
        token: getToken(),
        user: {
            avatar: '',
            userName: '',
            userId: '',
            access: ''
        },
    },

    mutations: {
        setToken (state, token) {
            state.token = token
            setToken(token)
        },
        setUser (state, user) {
            state.user = user
        }
    },

    actions: {
        //用户登录
        handleLogin({ commit }, {userName, password}) {
            userName = userName.trim()
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

        //获取用户信息
        getUserInfo({ state, commit }) {
            return new Promise((resolve, reject) => {
                getUserInfo(state.token).then(res => {
                    const data = res.data
                    commit('setUser',data.user)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
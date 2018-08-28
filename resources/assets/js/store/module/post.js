import { posts, posts_show } from './../../api/post'

export default {
    state: {
        page: ''
    },

    mutations: {

    },

    actions: {
        handlePosts({ state, commit }, page) {
            return new Promise((resolve, reject) => {
                posts(page).then(res => {
                    const data = res.data
                    console.log(data)
                    resolve(data)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}
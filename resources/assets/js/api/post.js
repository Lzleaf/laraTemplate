import axios from './../libs/api.request'

export const posts = (page) => {
    return axios.request({
        url: 'posts',
        params: {
            page
        },
        method: 'get'
    })
}

export const posts_show = (post_id) => {
    return axios.request({
        url: 'posts/show',
        params: {
            post_id
        },
        method: 'get'
    })
}

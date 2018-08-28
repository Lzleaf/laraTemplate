import Axios from 'axios'
import baseURL from './../config/url'
import {Message} from 'iview'
import store from './../store'
import router from './../router'

import {getToken,TOKEN_KEY} from "./ls";

class httpRequest {
    constructor() {
        this.options = {
            method: '',
            url: ''
        }
        // 存储请求队列
        this.queue = {}
    }

    // 销毁请求实例
    destroy(url) {
        delete this.queue[url]
        const queue = Object.keys(this.queue)
        return queue.length
    }

    // 请求拦截
    interceptors(instance, url) {
        // 添加请求拦截器
        instance.interceptors.request.use(config => {
            let token = getToken(TOKEN_KEY)
            // if (!config.url.includes('/users')) {
            //     config.headers['x-access-token'] = token
            // }
            if(token) {
                config.headers['Authorization'] = 'Bearer ' + token
            }

            // Spin.show()
            // 在发送请求之前做些什么
            return config
        }, error => {
            // 对请求错误做些什么
            return Promise.reject(error)
        })

        // 添加响应拦截器
        instance.interceptors.response.use((res) => {
            let {data} = res
            const is = this.destroy(url)
            if (!is) {
                setTimeout(() => {
                    // Spin.hide()
                }, 500)
            }
            if (data.code !== 200) {
                // 后端服务在个别情况下回报201，待确认
                if (data.code === 401) {
                    return Promise.reject("401...")
                } else {
                    if (data.msg) Message.error(data.msg)
                }

                return false
            }
            return data
        }, (error) => {
            console.log(error)
            Message.error('服务内部错误')
            // 对响应错误做点什么
            return Promise.reject(error)
        })
    }

    // 创建实例
    create(is_api) {
        var request_url = ''
        if (!is_api) {
            request_url = 'http://homestead.test'
        } else {
            request_url = baseURL
        }
        console.log(request_url)
        let conf = {
            baseURL: request_url,
            // timeout: 2000,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'X-URL-PATH': location.pathname
            }
        }
        return Axios.create(conf)
    }

    // 合并请求实例
    mergeReqest(instances = []) {
        //
    }

    // 请求实例
    request(options) {
        var is_api = options.is_api ? false : true
        var instance = this.create(is_api)
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        this.queue[options.url] = instance
        return instance(options)
    }
}

export default httpRequest
